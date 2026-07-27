---
title: 'One slot, two numbers: designing a lock-free queue'
description: >-
  jacques is a lock-free MPMC queue that packs your data and its sequence number
  into a single 128-bit atomic. A walk through the design, and why the entire
  correctness argument comes down to one even-or-odd bit.
pubDate: 2026-06-22
tags: ['rust', 'concurrency']
---

Every concurrent system I have ever worked on eventually grows a queue in the
middle of it. It's almost a law. Some threads put work in, other threads take
work out, and for a while everybody is happy. The first version is always a
`Vec` behind a `Mutex`, and honestly? That's fine. It's fine right up until the
moment it very much isn't, which is the moment you notice that every producer
and every consumer is now elbowing each other over one lock, and your shiny
64-core machine is spending its life in the kernel arbitrating who gets to
touch memory next.

I hit that wall, got annoyed about it, and `jacques` is what came out the other
side: a lock-free, multi-producer multi-consumer (MPMC) queue in Rust where no
thread ever waits on another to make progress. No mutex, no allocation on the
hot path, north of 100M ops/sec.

But the throughput isn't really why I want to tell you about it. I want to tell
you about it because the design is genuinely *pretty*, and the entire
correctness argument — the whole thing, the reason it works at all — comes down
to whether a single integer is even or odd.

## What's actually wrong with a lock

A mutex-guarded queue serialises everything, including the things that didn't
need serialising. Two producers can't push at the same time even when they'd be
writing to completely different slots, because the lock has no idea their
writes don't conflict and wouldn't care if it did. You've taken a problem that
is *embarrassingly* parallel — independent slots in a ring buffer! — and forced
the whole thing through a single-lane toll booth.

The lock-free approach flips the question around. Instead of "acquire exclusive
access, then mutate," each thread optimistically prepares its change and then
commits it with one atomic compare-and-swap. If somebody else got there first,
your CAS fails, you re-read, you try again. Nobody blocks anybody, ever.

The trick — and this is where it gets fun — is making that single CAS carry
*enough information* to actually be safe.

## One slot, two numbers

Here's the whole idea, and it's small enough to fit in a sentence. Each slot in
the ring buffer isn't just your data. It's your data **and** a sequence number,
glued together into one 128-bit atomic:

```rust title="src/owned.rs" showLineNumbers {2}
enum Storage<const N: usize> {
    Static([CachePadded<AtomicU128>; N]),        // [!code highlight]
    Dynamic(Box<[CachePadded<AtomicU128>]>),
}
```

The upper bits hold your value of type `T`, the lower bits hold a sequence
number of type `I`. And because they live inside the same `AtomicU128`, one CAS
updates *both of them at once*. You can never, ever observe a slot carrying new
data but a stale sequence number, or the reverse. That impossibility is the
foundation the entire queue is built on. Pack them like so:

$$
\text{slot} = \underbrace{(\text{value} \ll s)}_{\text{data}} \;\;|\;\; \underbrace{\text{seq}}_{\text{lower } s \text{ bits}}
$$

where $s$ is the width of the sequence type in bits. The one hard constraint
that falls out of this is that everything has to actually fit:

$$
\text{sizeof}(T) + \text{sizeof}(I) \le 16 \text{ bytes}
$$

and the constructor enforces exactly that, with a real error rather than a
silent truncation you get to discover in production at 3am (cough cough,
definitely didn't happen to me):

```rust title="src/owned.rs"
if data_size + index_size > 16 {
    return Err(QueueError::TypeSizeExceeded { size: data_size });
}
```

## The even/odd protocol

Okay. Now the good bit. The sequence number in each slot doesn't just encode
ordering — it encodes *state*, and it does it with its lowest bit:

- **even** sequence → the slot is empty, waiting to be filled
- **odd** sequence → the slot is full, waiting to be drained

That's it. That's the protocol.

A producer looking at slot `idx` works out the sequence it *expects* to see if
that slot were ready for it: `expected = write_index << 1`, which is always
even. If the slot's actual sequence matches, the slot is free, and the producer
tries to flip it to `expected | 1` — odd — with the value packed in alongside.
One CAS performs the write and announces "this is full now" simultaneously,
which is the part I find delightful:

```rust title="src/owned.rs" showLineNumbers {6,9-16}
let wr = self.write_index.load(Ordering::Acquire);
let idx = wr & self.mask;
let packed = self.storage.load(idx, Ordering::Acquire);
let (seq, _) = unpack_entry::<T, I>(packed, self.seq_shift, self.data_size);

let expected_seq = (wr as u128) << 1;         // even == "empty, your turn"

if seq == expected_seq {
    let new_seq = expected_seq | 1u128;        // odd == "full now"
    let new_packed = pack_entry::<T, I>(new_seq, value, self.seq_shift);

    if self.storage
        .compare_exchange(idx, packed, new_packed, Ordering::AcqRel, Ordering::Acquire)
        .is_ok()
    {
        // committed. now help move the write index forward.
    }
}
```

A consumer runs the exact mirror image. It expects the slot's sequence to be
`(read_index << 1) | 1` — odd, i.e. full — and on success flips it forward to
an even sequence one lap ahead, which marks the slot empty *and* reserves it
for the next time the ring wraps around to it. Two jobs, one operation.

So the value sitting at each slot is quite literally advertising whose turn it
is. There's no lock anywhere, because there's nothing left for a lock to say.

## Nobody is the boss of the index

The genuinely subtle part of any MPMC ring is the shared read/write cursors,
and this is where I lost a weekend. If advancing `write_index` were a separate
step from claiming the slot, then two producers could claim different slots and
then race each other to bump the cursor, and now your ordering is soup.

`jacques` sidesteps the whole problem with what I think of as **cooperative
advancement**: whoever happens to notice the cursor is lagging just helps move
it along. It isn't any one thread's job.

```rust title="src/owned.rs"
// I found a slot already marked full at this cursor — someone claimed it
// but hasn't advanced the index yet. I'll do it for them and move on.
} else if seq == (expected_seq | 1u128) {
    let _ = self.write_index.compare_exchange_weak(
        wr, wr + 1,
        Ordering::AcqRel, Ordering::Acquire,
    );
}
```

That `compare_exchange_weak` is deliberate, by the way. If it spuriously fails,
or if some other thread already advanced the cursor out from under us, that's
completely *fine* — the loop just re-reads and re-evaluates. No single thread
is ever on the hook for making progress, which is precisely what "lock-free"
means: the system as a whole keeps moving even if any individual thread gets
paused at the worst imaginable moment.

Full and empty detection fall out of the same arithmetic almost for free. The
queue is full exactly when the slot a full lap behind you is still marked full:

```rust title="src/owned.rs"
} else if seq.wrapping_add((self.capacity as u128) << 1) == (expected_seq | 1u128) {
    if !retry { return Err(QueueError::Full); }  // [!code warning]
    std::hint::spin_loop();
}
```

## False sharing, or: the performance bug you cannot see

There's a detail in that `Storage` enum that is very easy to skim straight
past. Every slot is a `CachePadded<AtomicU128>`, not a bare `AtomicU128`. That
padding is doing real work.

Modern CPUs move memory around in cache lines, typically 64 bytes at a time. So
if two of your atomics happen to share a line, a write to one *invalidates the
other* in every core's cache — even though logically nothing whatsoever about
the second one changed. Two threads hammering two adjacent slots will quietly
serialise on the cache coherency protocol. It is, functionally, the hardware
reinventing the lock you just spent a weekend removing.

This is called false sharing, and the reason it's so nasty is that it never
shows up in a correctness test. Everything passes. It shows up as a throughput
number that is inexplicably 5× worse than your back-of-the-envelope said it
should be, and then you spend two days convinced you've misunderstood atomics.

Padding each slot out to its own cache line trades a bit of memory for the
absence of that particular ghost. Worth it. Every time.

## Two allocation strategies, one type

Something I'm quietly proud of: that storage enum lets the *same* queue type be
either heap-allocated or entirely static, picked with a const generic.

```rust
// N = 0  →  heap-allocated Box<[_]>, capacity chosen at runtime
let (tx, rx) = queue::<u64>().capacity(1024).channels()?;  // [!code --]

// N > 0  →  fixed array baked into the type, zero heap allocation
let (tx, rx) = queue::<u64>().capacity(1024)               // [!code ++]
    .channels_static::<1024>()?;                           // [!code ++]
```

So the embedded and `no_std`-adjacent crowd get a queue with *no* dynamic
allocation anywhere in it, and everybody else gets the ergonomic runtime-sized
version. The compiler collapses the enum dispatch away in both cases. Same
code, same guarantees, and you only pay for the allocator if you actually asked
for one.

## A quick tour of the API

The core is deliberately tiny — `push` and `pop`, each with a non-blocking
`try_` cousin. But because every slot is already carrying a sequence number
around, you get some nice things essentially for free.

Push, and read back the sequence the item landed at:

```rust title="ordering across producers"
let seq = producer.push_with_seq(12)?;
let (value, pop_seq) = consumer.pop_with_seq()?;
assert_eq!(value, 12);
```

Pop only if the head satisfies some predicate — and note that the check and the
removal are a single atomic operation, so nobody can slip an item past you in
between the two:

```rust title="conditional consume"
producer.push(2)?;
producer.push(1)?;
producer.push(3)?;

// take the head only if it's even
let even = consumer.pop_if(|&value, _seq| value % 2 == 0)?; 
assert_eq!(even, 2);
```

Or drain in bulk and stop on your own terms:

```rust title="bulk drain"
let count = consumer.consume(|value, _seq| {
    sum += value;
    value >= 3          // return true to stop; false to keep draining
});
```

And when one queue's contention ceiling still isn't enough, a `QueuePack`
shards across several independent queues and scans between them, so producers
and consumers spread out instead of all piling onto the same cursors:

```rust title="horizontal scaling"
// 4 independent queues, rebalance the scan every 16 operations
let (producer, consumer) = queue_pack::<u64, 4, 16>().queue_capacity(256).channels()?;
producer.push(100)?;
assert_eq!(consumer.pop()?, 100);
```

## But does it actually work??

Correctness for a lock-free structure is emphatically not something you eyeball
and then feel good about. The test suite throws 4 producers and 4 consumers at
400,000 items through a 1024-slot queue and asserts that every single value
comes out **exactly once** — nothing lost, nothing duplicated:

```console
$ cargo test --release -- --nocapture mpmc_stress
running 2 tests
DYNAMIC test: producers=4 consumers=4 items/producer=100000 capacity=1024 => total=400000 throughput=118052631 ops/sec
STATIC  test: producers=4 consumers=4 items/producer=100000 capacity=1024 => total=400000 throughput=121400000 ops/sec
test result: ok. 2 passed; 0 failed
```

A `HashSet` catches any duplicate the instant it appears, which is the exact
failure mode you lie awake fearing with cooperative index advancement — two
consumers both convinced they drained the same slot. They don't, and they
can't, because the CAS on the slot is the single source of truth. The index is
only ever a hint.

## Why "jacques"?

Because it's a *queue*, and if you've spent any time at all in Montréal you
know that the most reliable queue in the entire city forms outside a certain
bakery on Rue Fairmount, in the snow, at eight in the morning, for bagels.
Naming things is the second hard problem in computer science and I took the
easy way out.

## So what's the actual lesson here?

The whole design rests on one move: fuse the data and its state into a single
atomic word, then let an even-or-odd bit narrate whose turn it is. Everything
else in the library — cooperative cursors, cache padding, static-versus-dynamic
storage — is either in service of that one idea or in service of not
accidentally throwing away the performance it buys you.

There's no lock in `jacques` because there's nothing left for a lock to
protect. The slot protects itself. And that's the bit I keep coming back to,
because it generalises well past queues: the fastest synchronization is always
going to be the synchronization you managed to design out of existence
entirely.
