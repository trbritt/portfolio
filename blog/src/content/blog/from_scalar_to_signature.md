---
title: 'From scalar to signature: a tour of Sylow'
description: >-
  sylow is a from-scratch BN254 library in Rust, built because the existing ones
  made me angry. A walk through what actually happens between a byte string and
  a verified threshold signature.
pubDate: 2026-06-18
tags: ['cryptography', 'rust']
---

When I finished my doctorate and started working closer to finance, the thing
that kept coming up was pairings. And everybody talked about them the same way
you'd talk about the basement of a house you just bought: yes, it works, no,
you probably shouldn't go down there, please stop asking what the humming is.
The received wisdom is that pairing-based cryptography is esoteric black magic.
Having now spent a considerable amount of time down there, I can report that
this is roughly correct.

The trouble is that it's *load-bearing* black magic. It's underneath BLS
signatures, it's underneath zk-SNARKs, and it's underneath a solid half of what
Ethereum's consensus layer does every twelve seconds. So at some point somebody
has to go into the basement with a flashlight and actually implement the thing
— carefully, in constant time, and ideally without shipping a subtle soundness
hole that nobody notices for three years.

And if you look at the state of cryptography in Rust, you find a lot of
abandonware quietly holding up critical infrastructure (the relevant
[xkcd](https://xkcd.com/2347/) has never stopped being funny, which is itself
the problem). Best case, the code underneath you has been audited and blessed
for production. But Reth — Reth! — leans on an unaudited, side-channel
vulnerable BN254 implementation called
[substrate-bn](https://docs.rs/substrate-bn/latest/substrate_bn/). I found that
genuinely upsetting, in the specific way that makes you open an editor at 11pm.

So `sylow` is my attempt to do better: a BN254 elliptic-curve library written
from scratch in Rust. What follows is a whirlwind tour of what happens between
a byte string and a verified signature, and — more interestingly to me — all
the places along the way where the whole thing can quietly fall over.

## Why this curve, of all the curves

BN254 is a Barreto–Naehrig curve, $y^2 = x^3 + 3$ over a 254-bit prime field.
The lovely thing about the BN family is that everything is parameterised by a
single generator $z$, and the field order, group order, and Frobenius trace all
just fall out as polynomials in it:

$$
p(z) = 36z^4 + 36z^3 + 24z^2 + 6z + 1, \qquad
r(z) = 36z^4 + 36z^3 + 18z^2 + 6z + 1
$$

Now, I want to be upfront: we didn't pick this curve because it's good. It
isn't! Its nominal ~128-bit security has been chipped down to something closer
to 100 over the years. We picked it because it's the only pairing-friendly
curve with an EVM precompile sitting at `0x08`, and when you need your
signatures verified on-chain, aesthetics lose to reality every single time.
(`BLS12-381` is the obvious upgrade the moment the execution layer grows the
precompiles for it. It's already used in consensus. I'm waiting.)

## Climbing the tower

Here's the first real problem. Almost everything we want to do on this curve —
evaluating a pairing, say, which lands you in $\mathbb{F}_{p^{12}}$ — is
absolutely unruly to deal with directly. Even serious tooling like
[sagemath](https://www.sagemath.org/) starts to creak doing basic arithmetic on
fields and groups this large, and nobody in their right mind wants to
multiply two elements of a degree-12 extension by hand.

So you don't. The standard move is to build the big elements out of small ones,
climbing from the base field up to that dodectic extension one little quadratic
or cubic step at a time:

$$
\mathbb{F}_{p^2} = \mathbb{F}_p[u]/(u^2 + 1), \quad
\mathbb{F}_{p^6} = \mathbb{F}_{p^2}[v]/(v^3 - \xi), \quad
\mathbb{F}_{p^{12}} = \mathbb{F}_{p^6}[w]/(w^2 - v)
$$

with $\xi = 9 + u$. And the part I'm still a little smug about: in the library,
that entire climb — from the humble scalar all the way to the dizzying heights
of the dodectic extension — is three type aliases.

```rust title="src/fields/extension.rs"
pub type Fp2  = FieldExtension<2, 2, Fp>;    // p  →  p²
pub type Fp6  = FieldExtension<6, 3, Fp2>;   // three Fp2 coefficients
pub type Fp12 = FieldExtension<12, 2, Fp6>;  // [!code focus]
```

Why bother with all the ceremony? Because towering it this way makes Frobenius
cheap. An element of $\mathbb{F}_{p^{12}}$ is just $g + hw$ with $g, h \in
\mathbb{F}_{p^6}$, so raising it to the $p^6$ is $g - hw$. A sign flip. Free.
That "free" turns up over and over in the final exponentiation later, and it's
the whole reason the ceremony pays for itself.

## Two groups, one pairing, one landmine

The main business of a curve like this is evaluating pairings. (I'm not going
to go into the motivations here — if you know, you know?) But pairings are
difficult to compute, expensive to run, and deeply technical to implement
correctly, which is a fun combination of properties.

A pairing is a bilinear map $e: \mathbb{G}_1 \times \mathbb{G}_2 \to
\mathbb{G}_T$, and the bilinear part is the entire point:

$$
e([a]P, [b]Q) = e(P, Q)^{ab}
$$

$\mathbb{G}_1$ lives over the base field $\mathbb{F}_p$ and is cheap and
well-behaved. For BN254 it's a happy accident: the curve order *is* $r$, so the
$r$-torsion is the whole curve, and checking membership is just asking "is this
point on the curve." Nothing else to verify. Lovely.

$\mathbb{G}_2$ is the evil twin. It lives over $\mathbb{F}_{p^2}$ via a sextic
twist $y'^2 = x'^3 + 3/(9+u)$, and that twist has a *fat* cofactor. Which means
being on the curve no longer means being in the subgroup — and this is the
first place implementations quietly go wrong. You can naively check $[r]Q =
\mathcal{O}$, sure, but with 254 bits of $r$ that's a full scalar
multiplication and it is far too slow to put on a hot path. The right move is
the untwist-Frobenius-twist endomorphism $\psi$ of Galbraith–Scott, which
collapses membership down to a cheap relation:

$$
[x+1]Q + \psi([x]Q) + \psi^2([x]Q) = \psi^3([2x]Q)
$$

If a library deserialises a $\mathbb{G}_2$ point and only checks the curve
equation, a malicious prover can hand it a point in a small-order coset and
walk straight through a soundness proof that assumed that could never happen.
On-curve is necessary and nowhere near sufficient.

What frustrates me here is that these curves have been the beneficiaries of a
lot of good recent research, and libraries mostly just... don't pick it up.
Which I understand! These are laborious implementations and painful migrations,
and every one of them means another audit. The formula above isn't the commonly
implemented one, purely because it wasn't the first one chronologically. That's
another reason I wanted to have a go at the BN254 landscape.

## The optimal ate pairing

There are plenty of bilinear pairings we could implement. The Weil pairing
needs two Miller loops. The Tate pairing needs a truly brutal final
exponentiation. The *optimal ate* pairing hits the theoretical minimum loop
length for the embedding degree, which is why every serious BN library reaches
for it. The definition is a thing of beauty and/or abject terror:

$$
e(X, Y) = \left( f_{6z+2,\,Y}(X)\;
\ell_{[6z+2]\Psi(Y),\,\phi_p(\Psi(Y))}(X)\;
\ell_{[6z+2]\Psi(Y)+\phi_p(\Psi(Y)),\,-\phi_p(\Psi(Y))}(X) \right)^{\frac{p^{12}-1}{r}}
$$

Say that five times fast. And then, having stared at it long enough to feel
slightly unwell, watch it collapse in code into something almost
disappointingly tidy — a Miller loop feeding a final exponentiation:

```rust title="src/pairing.rs" showLineNumbers {11,16}
pub fn pairing(p: &G1Projective, q: &G2Projective) -> Gt {
    let p = &G1Affine::from(p);
    let q = &G2Affine::from(q);

    // Point-at-infinity guards: swap in the generator, remember we did.
    let either_zero = Choice::from((p.is_zero() | q.is_zero()) as u8);
    let p = G1Affine::conditional_select(p, &G1Affine::generator(), either_zero);
    let q = G2Affine::conditional_select(q, &G2Affine::generator(), either_zero);

    // The cheap part: one Miller loop over 87 precomputed line coefficients.
    let tmp = q.precompute().miller_loop(&p).0;

    let tmp = MillerLoopResult(Fp12::conditional_select(&tmp, &Fp12::one(), either_zero));

    // The expensive part — and the one people skip at their peril.
    tmp.final_exponentiation()
}
```

Why 87 constants, of all numbers? The loop runs 64 iterations through the NAF
representation of $6z+2$, each one a doubling, plus 9 additions for the $+1$
digits, 12 for the $-1$ digits, and 2 final steps. $64 + 9 + 12 + 2 = 87$.
Precompute them once per $\mathbb{G}_2$ point and you can then hammer pairing
after pairing against changing $\mathbb{G}_1$ inputs, which turns out to matter
enormously later.

Now, the thing I want to grab you by the lapels about: **the final
exponentiation is not optional.** A Miller loop on its own gives you an element
of $\mathbb{F}_{p^{12}}^*$ that's only defined up to $r$-th powers. Raising it
by $(p^{12}-1)/r$ is what actually maps it into the roots of unity and makes
the result canonical. Skip it, and every test you write from honestly-generated
proofs still passes — which is precisely why that bug lives long enough to
reach production. We split the monster exponent into an easy half and a hard
half:

$$
\frac{p^{12}-1}{r} =
\underbrace{(p^6-1)(p^2+1)}_{\text{easy}} \cdot
\underbrace{\frac{p^4-p^2+1}{r}}_{\text{hard}}
$$

The easy part is one conjugation, one inversion, and a handful of
multiplications — the conjugation being that free sign-flip we bought ourselves
back in the tower. The hard part is a vector-addition chain of squarings and
multiplies, the same flattening trick you'll recognise from reducing
constraints in R1CS systems. Voilà.

## The trick that makes it actually fast

Right, here's my favourite part. You want to check $e(\sigma, g_2) = e(H(m),
P)$. The naive reading of that is "compute both pairings, compare them." But
rearrange it:

$$
e(\sigma, g_2)\, e(H(m), -P) = 1
\;\Longrightarrow\;
\left( f_{[6z+2],\sigma}(g_2)\, f_{[6z+2],H(m)}(-P) \right)^{\frac{p^{12}-1}{r}} = 1
$$

and suddenly it's *one* Miller loop and *one* final exponentiation. During the
recursion you only ever track the product of the line evaluations, which saves
you an $\mathbb{F}_{12}$ multiply every single iteration:

```rust
// Two Miller loops, two final exponentiations. Correct, wasteful.
let ok = pairing(&sig, &g2_gen) == pairing(&hashed, &pubkey);            // [!code --]

// One glued Miller loop, one final exponentiation.
let precomp = [g2_gen.precompute(), pubkey.precompute()];               // [!code ++]
let ok = glued_miller_loop(&precomp, &[sig.into(), (-hashed).into()])   // [!code ++]
    .final_exponentiation() == Gt::identity();                         // [!code ++]
```

And the savings compound when you're aggregating lots of partial signatures,
because the whole thing generalises to a single product over all the signers.
That's the difference between "verify one signature" and "verify an entire
committee for the price of one," which is not a small difference.

## BLS, in four honest lines

With all that machinery finally in place, signing is embarrassingly small. Hash
the message onto the curve, multiply by the secret key, go home:

```rust title="src/bls.rs"
pub fn sign(k: &Fp, msg: &[u8]) -> Result<G1Projective, GroupError> {
    let expander = XMDExpander::<Keccak256>::new(DST, SECURITY_BITS);
    // hash_to_curve is where all the real difficulty is hiding.
    match G1Projective::hash_to_curve(&expander, msg) {  
        Ok(hashed) => Ok(hashed * *k),
        _ => Err(GroupError::CannotHashToGroup),
    }
}
```

Except that `hash_to_curve` is doing an enormous amount of quiet work, and it's
the second classic place to cut a corner you will absolutely regret. Every
barebones BN254 repo you'll find implements it with the toy version,
try-and-increment:

```rust title="the tempting version — do not ship this"
// Loop until the hash lands below the modulus.
loop {
    let z = hash(msg, ctr);
    if z < n { return z; }  // [!code error]
    ctr += 1;               // variable iteration count → timing side-channel // [!code warning]
}
```

Look at that loop count. It depends on the secret input, so it leaks straight
out through timing. The RFC 9380 answer is `expand_message_xmd` for the bit
expansion, and the Shallue–van de Woestijne map to land on the curve in
constant time. It's more code and considerably less charming, but it's the
difference between a demo and something that survives an audit. (My favourite
bit of trivia from this whole project: running the full SvdW constant search
for BN254 just spits out $Z = 1$. All that machinery, and out pops the
loneliest integer.)

## The actual point: threshold signatures

Single signers are single points of failure, and the real reason to build any
of this is $(t, n)$-threshold signing. Any $t$ of $n$ participants can jointly
produce a signature, nobody ever holds the whole key at any point, and the
network shrugs off nodes falling over.

The secret is a polynomial $q(x)$ of degree $t-1$ with the key hiding down at
$q(0) = a_0$. Each participant $i$ gets a share $s_i = q(i)$, signs with it,
and the entire leverage of the scheme comes down to one elliptic-curve
multiply:

```rust title="src/dkg.rs" showLineNumbers {8-11}
fn partial_sign(&self, id: usize, message: &[u8]) -> G1Projective {
    let participant = self.participants.iter()
        .find(|p| p.id == id)
        .expect("Participant not found");

    let expander = XMDExpander::<Keccak256>::new(DST, SECURITY_BITS);
    let hashed = G1Projective::hash_to_curve(&expander, message)
        .expect("Failed to hash message to curve");

    // The entire distributed-key-generation payoff is this one line.
    hashed * Fr::into(participant.secret_key)
}
```

Recovery is Lagrange interpolation at $x = 0$, the aggregate signature is
$\sigma = \sum_i \lambda_i \sigma_i$, and final verification is that glued
product turning up again:

$$
\left( \prod_i f_{[6z+2],\sigma_i}(g_2)\, f_{[6z+2],H(m)}(-P(i)) \right)^{\frac{p^{12}-1}{r}} = 1
$$

Getting the shares out *without* a trusted dealer is the whole distributed
key-generation story — Feldman and Pedersen VSS glued together into a DKG where
every participant is simultaneously a dealer, complaints are public, and liars
get verifiably kicked out (you're fired). It turns out Feldman VSS is secure
enough for both stages when you're feeding a thresholding scheme, which is why
Cloudflare uses it and spares themselves implementing two entirely different
VSS protocols. Sensible people.

## Dropping into the EVM

Because the whole thing is generic over the base field, you can lift `sylow`
straight into `revm` and swap out the stock BN128 precompiles at `0x06`,
`0x07`, `0x08`. Add it and go:

```bash
cargo add sylow
```

And the numbers, on a single core at the time of writing:

```console
$ cargo bench --bench pairing
pairing/optimal_ate     time:   [8.06 ms 8.18 ms 8.31 ms]
$ cargo bench --bench sign
sign/hash_and_multiply  time:   [947 µs 954 µs 961 µs]
```

An 8.2 ms pairing and a sub-millisecond sign, both constant-time, both
resistant to timing, invalid-curve, and small-subgroup attacks. Could we have
shaved the pairing down further? Probably. But every one of those attacks is a
corner you don't get to cut twice, and I'd rather have the milliseconds than
the incident report.

## So what's the actual lesson here?

None of the security lives in the four-line verifier. None of it! It lives at
deserialisation — is this point really in the subgroup? It lives inside the
pairing engine — did the final exponentiation actually run? And it lives in
`hash_to_curve` — is this constant-time, or is it leaking the secret out
through a loop counter? The equation everybody stares at is the least
interesting part of the whole business. Where the group elements came from is
the entire story.

And as the dark-forest ecosystems keep evolving, so will `sylow` — multi-curve
support, Groth16, a real prover. Shine a light into even the darkest corners.
Verily.
