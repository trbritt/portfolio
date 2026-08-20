---
title: 'From crystals to market making: an overview of legendre - part 2'
description: >-
  Part 1 claimed a dendrite solver and a market maker are the same program.
  This is the proof in the pudding, talking about market making, implicit solves,
  and the fact that the quickest code is no code at all.
pubDate: 2026-08-20
tags: ['rust', 'numerics', 'finance']
---

At the end of [part 1](/posts/i_like_crystals-part-1/), I said `legendre` wasn't a dendrite solver, it was a framework that
happened to have a dendrite solver as a client, and that the same engine could run something
that looks nothing like a crystal. So let's see what I meant. 

After finishing my doctorate, I ended up working much closer to
cryptography and decentralized finance (DeFi), and the thing I kept bumping into was a class of problem that *felt* structurally
identical to the physics on which I had focused extensively for years, while nearly every protocol developer that was knowledgable 
on the subject felt that the overlap was minimal due to the drastically
different phenomena each field aimed to describe.

The problem we're going to talk about is **optimal market making under stochastic volatility**, and my favourite part is that 
this is really a lot of "standard" physics hiding like pigs 
in a trenchcoat.

## What does a market maker actually do?

If you already know, skip a section. If not: a market maker is someone who stands in a market
and continuously offers to both buy and sell the same thing. They post a *bid* ("I'll buy at
this price") and an *ask* ("I'll sell at this price"). The simple invariant here is that the ask is a bit higher than the bid, otherwise someone will definitely take you up on your offer to buy what you're selling at an undervalued price.

That gap is the spread, and it is how market makers get paid. Somebody who wants to sell right now hits
your bid, somebody who wants to buy right now lifts your ask, and if those two things happen
in roughly equal numbers you pocket the difference for providing the service of always being
there.

But life is not that easy, and the entire problem is that they don't happen in equal numbers. If
you only get hit on the bid for twenty minutes, you are now sitting on a pile of _something_ that you may not want to actually own. The entire time you own that asset, the price is free to change which could make or break you as a trader. That pile is your
**inventory**, and inventory is risk. So the real question isn't "what spread do I quote",
it's:

> Given how much I'm already holding, how nervous the market is right now, and how long I
> have left to trade, how far from the midprice should I put each of my two quotes?

If you quote too tight, you will get filled constantly and accumulate inventory you do not want, or otherwise cannot offload.
If you quote too wide, nobody trades with you and you earn nothing (earning here both in terms of profit from the bid-ask spread but also from exchange-provided maker rebate incentive programmes).

And crucially the answer is
*asymmetric*: if you're already long, you want to shade both quotes down, making your ask more
attractive so someone takes the position off your hands and your bid less attractive so you
don't get any deeper in.

The classic treatment of this is Cartea, Jaimungal & Penalva, *Algorithmic and High-Frequency
Trading* (Cambridge University Press, 2015) which is one of the classic works on market making theory. The big difference from that theory and what I worked with in this project is that in the textbook version, the volatility is a constant, and in real life it very
much is not. Markets get calm and markets
get frantic, and the whole *point* of an inventory penalty is that it should tighten when
things get scary, which unfortunately means more math.

## Nervousness _is_ physics

The variance $\nu$ of the midprice follows a [CIR process](https://en.wikipedia.org/wiki/Cox%E2%80%93Ingersoll%E2%80%93Ross_model),
which is the standard "mean-reverting and never negative" process, and the midprice $S$
diffuses at whatever volatility the variance currently says:

$$
d\nu = k(\theta - \nu)\,dt + \sigma\sqrt{\nu}\,dW_1
$$

$$
dS = \mu\,dt + \sqrt{\nu}\,dW_2
$$

with $dW_i$ standard Wiener processes. So $\nu$ is pulled back toward a long-run level $\theta$ at speed $k$, and gets kicked around
by its own noise with vol-of-vol $\sigma$. The $\sqrt{\nu}$ in front of that noise is secretly hiding a lot of physics, since as $\nu$ approaches zero, the noise term switches itself off, which is supposed to guarantee that we stay positive semidefinite always. This does hold in continuous time, but is a fat lie in
discrete time, where a single Euler step with a large enough kick will absolutely put us at
$\nu = -0.003$, and then ask us for $\sqrt{-0.003}$. For now, we'll put a pin in that.

## The math

This is obviously not a rigorous derivation, but more an argument that should let you convince yourself why the mathematics look reasonable, and hopefully interest you to read the OG paper.

The quantity we're trying to understand is the value function $u$, which is roughly "how much money do I expect to end up with, playing optimally" as a function of the time remaining in my trading session $\tau = T - t$, with $T$ the terminal time, or "time horizon", and "optimally" here meaning that I make the most mathematically correct steps at each decision point.

Then you
apply the [Hamilton–Jacobi–Bellman](https://en.wikipedia.org/wiki/Hamilton%E2%80%93Jacobi%E2%80%93Bellman_equation)
machinery, which says the optimal thing to do right now is the thing that maximises: (i) your immediate reward, and (ii) value of where it lands you. A rough analogy would be selling lemonade at a lemonade stand both has an immediate reward of exchanging lemons and sugar for cold hard cash, while there's an implicit value of selling lemonade to a local lemonade tycoon who could later buy your business.

With exponentially-decaying fill
probabilities, the maximisation over quote depths has a closed form:

$$
\frac{\partial u}{\partial \tau} = \underbrace{\mu q - \psi\sigma^2\nu q^2}_{\text{drift and inventory penalty}}
+ \underbrace{k(\theta-\nu)\,\partial_\nu u + \tfrac{1}{2}\sigma^2\nu\,\partial_{\nu\nu}u}_{\text{advection-diffusion in }\nu}
+ H^s + H^b
$$

with the two fill terms, one per side,

$$
H^s = \lambda^s\!\left(q\varepsilon^s + \frac{e^{-\kappa^s\left(\varepsilon^s + \alpha(1-2q) - u(q-1) + u(q)\right)}}{\kappa^s}\right)
$$

$$
H^b = \lambda^b\!\left(-q\varepsilon^b + \frac{e^{-\kappa^b\left(\varepsilon^b + \alpha(1+2q) - u(q+1) + u(q)\right)}}{\kappa^b}\right)
$$

with the $s$ ($b$) superscript denoting selling (buying) fill rates. Finally, we impose a terminal condition $u(\tau = 0) = 0$, which just enforces that when time's up, the game
is over and there's nothing left to earn.

When I first saw this, this was the thing that tickled my brain. If you look at the second term in that equation, **it's an
advection–diffusion operator.** $k(\theta-\nu)$ is a velocity field pushing $u$ along the
$\nu$ axis toward $\theta$, and $\tfrac{1}{2}\sigma^2\nu$ is a diffusivity.

__It is the heat
equation with a drift__, sitting inside a finance paper, hiding in plain sight. It really is the same form as something like regulated heat diffusion in a metal rod.

The $H^s$ and
$H^b$ terms are pointwise nonlinear reactions; they read $u$ at neighbouring inventory
levels but no spatial derivatives at all, which makes them *exactly* the same shape as the
$\varphi - \varphi^3 - \lambda u(1-\varphi^2)^2$ reaction sitting in the middle of the crystallisation model from [part 1](/posts/i_like_crystals-part-1/).

So after all this, this is a reaction–diffusion system, one of the classic PDE examples that this framework was built to handle no problem.

The other thing that falls out of the same maximisation, and the thing we actually *want*,
is the optimal quotes themselves:

$$
\delta^b = \frac{1}{\kappa^b} + \varepsilon^b + \alpha(1+2q) - u(q+1) + u(q)
$$

$$
\delta^s = \frac{1}{\kappa^s} + \varepsilon^s + \alpha(1-2q) - u(q-1) + u(q)
$$

Two lines of arithmetic on the value surface and its inventory neighbours. All the work is in
getting $u$.

## Trickery is afoot

Here's the thing I sat with for a while. The value function $u(\tau, \nu, q)$ has three
arguments, so the obvious move is a 3D grid. But $q$ isn't like the other two. Inventory is
**discrete** — you hold −5 or −4 or 4 units, never 4.3 — and it's *bounded*, because no sane
risk desk lets you accumulate forever. And look at how $q$ actually enters the equation: only
ever as $u(q-1)$ and $u(q+1)$. Never a derivative. Just reads of the neighbouring levels.

Which is unfortunately not a third dimension. That's **one field per inventory level**, on a 1D grid in
$\nu$, and the $q$-coupling is ordinary cross-field reads:

```rust title="src/physics/market_making.rs — the entire spatial structure"
fn register_fields(&mut self, builder: &mut StateBuilder<f64>) {
    // One field per inventory level. Field names are `&'static str`, so
    // the runtime-sized set leaks its (tiny, setup-time-only) names.
    self.handles = (self.params.q_min..=self.params.q_max)
        .map(|q| {
            let name: &'static str = Box::leak(format!("u_q{q}").into_boxed_str());
            builder.register(name, 1)
        })
        .collect();
}
```

Model C is two coupled fields, $\varphi$ and $u$, on a 2D grid. This is eleven coupled fields
on a 1D grid. The framework does not care. `register_fields`, `fill_ghosts`,
`vector_field_block` — the same three methods, the same slab layout, the same scheduler
handing out disjoint blocks. I did not have to teach it anything about finance to get here.

Reading the neighbours is exactly as boring as it should be:

```rust title="reading u(q±1) is just... reading another field" showLineNumbers {5,6}
for (qi, &h) in self.handles.iter().enumerate() {
    let q = p.q_min + qi as isize;
    let u  = state.view(grid, block, h);
    // At the bounds there is no neighbour, and that `None` is load-bearing.
    let up = (q < p.q_max).then(|| state.view(grid, block, self.handles[qi + 1])); // [!code highlight]
    let dn = (q > p.q_min).then(|| state.view(grid, block, self.handles[qi - 1])); // [!code highlight]
    let mut du = out.view_mut(grid, block, h);
    // ... the HJB right-hand side, per ν cell
}
```
This is another nicety of the Rust type system (say less!) with those `Option`s. At $q = q_{\max}$, there is no
$u(q+1)$ to read, because buying more is forbidden, so the buy side is *withdrawn*, the
fill term degenerates, and $\delta^b = \infty$. The inventory bound isn't a clamp I wrote
anywhere. It's `None`. We'll come back to that nugget.

## What the framework was actually missing

So that's the physics mapped. But mapping it honestly meant admitting the framework couldn't
yet express a few things which we need to add. Fortunately since these issues arise from a physics-in-a-finance-paper form, these additions are still generally required of a broad-sweeping PDE framework.

### A hook for "this quantity is not allowed to be negative"

Remember the $\sqrt{\nu}$ problem. Full truncation — using $\nu^+ = \max(\nu, 0)$ inside the
coefficients — handles the square root itself, but the state can still *store* a small
negative excursion, and it'll sit there poisoning the mean.

The clean fix is a projection step after each update, so I added `Model::project`:

```rust title="the CIR positivity constraint, in full"
/// CIR positivity: reflect any noise-induced excursion `ν < 0` back to 0.
fn project<S: StorageBackend<f64>>(&self, grid: &CartesianGrid<1>, state: &mut State<f64, S>) {
    for b in 0..grid.num_blocks() {
        let block = BlockId(b as u32);
        let mut v = state.view_mut(grid, block, self.nu());
        for_each_interior(grid.block_cells(), |idx| v.set(idx, v.get(idx).max(0.0)));
    }
}
```

It defaults to a no-op, so every existing model is untouched. The part I care about is *when*
it runs: once per step, after the integrator has fully advanced, before any observer looks at
the state, and critically on the synchronized state, so a subcycled AMR run never
projects a half-finished substage.

### Jumps, and one event moving several things at once

This was the real gap. A fill is not diffusion. It's an *event*: at some random moment
somebody takes your quote, and when they do, three things happen simultaneously — your
inventory moves by exactly ±1, your cash moves by the price, and nothing at all happens in
between events.

That's a point process, and `legendre` only knew about Wiener drivers. So `Driver::Jump(j)`
joined the enum, and here's the design decision I'm happiest with: **the model never sees
`dt`, so the model never converts a rate into a probability.** In part 1 the same rule bought
us immunity to the classic $\sqrt{dt}$ bug. It buys the same thing here. A model writes the
per-cell firing intensity $\lambda$ and the increments; the kernel owns the thinning:

```rust title="src/core/driver.rs — the kernel owns rate → probability" {12,13}
Self::Jump(_) => {
    let rate = rate.expect("a jump driver must be given an intensity slab");
    let block_key = rng::mix_key(seed, &[salt, self.stream(), block.index() as u64]);
    for f in fields {
        for (i, (x, v)) in f.state.iter_mut().zip(f.amp).enumerate() {
            let Some(cell) = grid.cell_key(block, f.ghost, i) else { continue };
            let lambda = rate[cell as usize].to_f64();
            if lambda <= 0.0 { continue; }
            // One fire per (cell, driver, step), shared across every field
            // the driver moves: the event fires once and applies each
            // field's increment together.
            let key = rng::splitmix64(block_key ^ cell);
            let p = -(-lambda * dt).exp_m1();
            if rng::unit_open(key) < p { *x += *v; }
        }
    }
}
```

Two details worth pulling out. `1 - e^{-\lambda dt}` is written `-(-lambda * dt).exp_m1()`,
because `exp_m1` is accurate for tiny arguments where `1.0 - x.exp()` would cancel itself
into gravel, and tiny arguments are the normal case, since $\lambda\,dt$ is a per-step fill
probability.

And the draw is keyed by `(seed, salt, stream, block, cell)`, so no RNG stream to advance, same
as part 1. Now, that key is drawn **once per cell per driver** and shared across every
field the driver moves. That's what makes "one event, many fields" the natural shape rather
than something you assemble by hand. Inventory and cash move on the *same* fire, on every
path, by construction. There's a test called
`coupled_fields_move_on_the_same_fire` that checks this on every cell of every path, because
if it were ever false the model would be quietly printing money.

### Every cell is a universe

The last piece is fun hack that spits out Monte Carlo for free. To simulate the controlled system I need thousands of
independent sample paths, so: how do I get a Monte Carlo ensemble out of a PDE framework?

You don't add anything. A Monte Carlo ensemble is a simulation whose cells happen not to
couple. One path per cell. Zero ghosts, no `fill_ghosts`, no CFL condition, and the block
decomposition that exists to parallelise a stencil now parallelises your paths instead. The
whole `core::monte_carlo` module is a thin wrapper plus a reduction:

```rust title="the entire ensemble-specific surface"
let grid = path_grid(40_000, 4_000)?;          // 40k paths, 10 blocks
let mut mc = MonteCarlo::new(sim);
mc.run(steps, dt);

let stats = mc.stats(|p| {                     // [!code focus]
    model.terminal_wealth(p.get(cash), p.get(inv), p.get(mid))
});
println!("{:.4} ± {:.4}", stats.mean, stats.std());
```

`Stats` is count/mean/variance/min/max, and that's the whole harness. It's generic over the
model, the discretization, the integrator, the scheduler, and the allocator, and it contains
not one word about market making. The first thing I ran through it was a CIR process checked
against its analytic mean $\mathbb{E}[\nu_t] = \theta + (\nu_0 - \theta)e^{-kt}$.

## Wiring the whole thing up

Now the two halves join. The HJB solve is deterministic and gives me a value surface; the
thing I want to *simulate* is the controlled system, where a maker actually quotes those
optimal depths and gets randomly filled. So I record the surface as I solve, bake it into
lookup tables, and hand those to the ensemble:

```
      HJB solve                    DepthTables                 controlled ensemble
  (deterministic PDE)          (τ, ν, q) → (δᵇ, δˢ)          (Monte Carlo, 40k paths)
 ┌───────────────────┐        ┌──────────────────┐        ┌──────────────────────────┐
 │ 11 fields, 1D ν   │  ───►  │  nearest-node    │  ───►  │ ν, S   ← Wiener(0), (1)  │
 │ NoNoise, ImexEuler│        │  O(1) lookup     │        │ q, cash ← Jump(0), (1)   │
 │ ~23 steps         │        │  ~4 ns           │        │ WienerJump<2,2>          │
 └───────────────────┘        └──────────────────┘        └──────────────────────────┘
```

The ensemble declares four fields and which drivers move them, and that declaration *is* the
model's structure:

```rust title="src/physics/market_making.rs" showLineNumbers
type Drivers = WienerJump<2, 2>;

fn register_fields(&mut self, builder: &mut StateBuilder<f64>) {
    self.nu   = Some(builder.register_driven("nu",   0, &[Driver::Time, Driver::Wiener(0)]));
    self.mid  = Some(builder.register_driven("mid",  0, &[Driver::Time, Driver::Wiener(1)]));
    // Inventory and cash are moved only by the two fill channels.
    self.inv  = Some(builder.register_driven("inv",  0, &[Driver::Jump(0), Driver::Jump(1)]));
    self.cash = Some(builder.register_driven("cash", 0, &[Driver::Jump(0), Driver::Jump(1)]));
}
```

Variance and midprice diffuse. Inventory and cash *only* jump — they have no time driver at
all, which is precisely right: nothing happens to your position between fills.

And then the payoff for all that `Option` discipline earlier. Here's the bid channel:

```rust title="the bid channel, and the bound that enforces itself" {7,8}
// δ this channel quotes at, given the current (τ, ν, q).
let depth_at = |idx: [isize; 1]| {
    let q = inv.get(idx).round() as isize;
    let (bid, ask) = self.tables.lookup(tau, nu.get(idx), q);
    if channel == 0 { bid } else { ask }
};
// Firing intensity λ·e^{−κδ} — and e^{−κ·∞} = 0.
let mut rate = out.intensity_mut(grid, block);
for_each_interior(nu.interior(), |idx| rate.set(idx, side.fill_rate(depth_at(idx))));
```

At $q = q_{\max}$ the buy quote is withdrawn, so the depth is $\infty$, so the intensity is
zero, so the jump **never fires**. Inventory stays inside $[q_{\min}, q_{\max}]$ with no
clamp, no branch, and no assertion anywhere in the ensemble code. The economics wrote the
constraint and the numerics just... obeyed it. A nice reuslt. The bound isn't enforced. It's *implied*.

## But does it actually work??

Four things have to be true for me to believe any of this, and I'd rather assert the
economics than re-implement the solver inside its own test:

```console
$ cargo test --release --test market_making_ensemble --test imex
     Running tests/imex.rs

running 5 tests
test imex_degenerates_to_forward_euler_without_stiff_rows ... ok
test imex_solve_is_bitwise_scheduler_independent ... ok
test imex_stays_bounded_on_a_fine_grid ... ok
test imex_takes_far_fewer_steps_than_explicit ... ok
test imex_recovers_the_explicit_optimal_policy ... ok

test result: ok. 5 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.01s

     Running tests/market_making_ensemble.rs

running 4 tests
test controlled_ensemble_is_scheduler_independent ... ok
test inventory_stays_within_the_quoting_bounds ... ok
test symmetric_book_has_no_inventory_bias ... ok
test market_maker_earns_positive_expected_wealth ... ok

test result: ok. 4 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 1.11s
```

Inventory never leaves its bounds, on any of 20,000 paths, and is always exactly an integer.
Running the optimal quotes over 40,000 paths, mean terminal wealth is solidly positive with
real dispersion; the maker harvests the spread, which is the entire economic claim of the
model. A symmetric book ($\mu = 0$, equal intensities on both sides) holds mean terminal
inventory within 0.05 of zero, so the policy isn't secretly directional. And the whole
pipeline is bitwise scheduler-independent: run it serial, run it on every core, get the same
`f64`s. Same guarantee as part 1, now with jumps in it.

## And then I tried to make it fast

Here's the part that changed my mind about something.

Everything above is a *policy*. You solve the HJB once and you get a table of optimal quotes.
But the parameters in that solve (arrival rates, decay, the long-run variance level) are
not constants of nature. They're estimates of a market that is currently changing. This means quotes go stale, and staying optimal means re-solving continuously. **The re-solve
latency is the freshness bottleneck**, not the lookup, which is obviously $\mathcal{O}(1)$ anyway.

So I profiled it, because we're doing good software design here. The flamegraph said
the solve was 61% `exp`, which would be those two fill terms, one exponential each, per inventory level per
cell per step, and that it was taking 376 steps to cross the horizon because the explicit
scheme is CFL-bound at $dt \propto d\nu^2$.

Then I did the obvious thing and parallelised it, and it got **6× worse**.

In hindsight, this is completely predictable and I should have predicted it. It's a 1D grid.
The per-step work is a few hundred cells across eleven fields. Fork-join overhead per step
dwarfs the actual arithmetic by an order of magnitude, so all the scheduler achieved was
paying Rayon's tax 375 times. The machine wasn't the problem. **375 was the problem.**

### Breaking the CFL wall

This is where we start actually treating this like an advection-diffusion equation. There's a famous result in PDEs, originally hyperbolic PDEs, called the [CFL bound](https://en.wikipedia.org/wiki/Courant%E2%80%93Friedrichs%E2%80%93Lewy_condition). At a high level, this says that if I want to compute the amplitude of a wave moving across a discrete grid in space, then I need to simulate that with timestepping less than the time it takes for the wave to reach adjacent grid points. Otherwise, by the time I try to evaluate my wave again, it will have hopped over many grid points, which usually means instability and incorrect results. For our equation here, the process is standard to derive the CFL bound in advection-diffusion, which turns out to be:

$$
dt \cdot \max_\nu\left(\frac{\sigma^2\nu}{d\nu^2} + \frac{|k(\theta-\nu)|}{d\nu}\right) \le 1
$$

Normally when people solve for this to get the current stable timestep, they check the diffusion and advection limits independently, which normally results in a timestep twice as large as it needs to be where the $\nu$ where both terms peak, which then promptly blows up mid-horizon. This means we need to compute this
stable $dt$ from the joint distribution here.

The $d\nu^2$ is the whole problem, and it comes entirely from the *linear* advection–
diffusion part. The nonlinear fill terms (the expensive exponentials) have no spatial
derivatives at all, so they impose no grid-dependent restriction whatsoever. Their stable
step is bounded by the fill intensity, full stop (Gershgorin on the fill Jacobian bounds the
spectral radius by $2(\lambda^s + \lambda^b)$, and I take a 0.4 safety factor):

$$
dt_{\text{nonstiff}} \le \frac{0.4}{\lambda^s + \lambda^b}
$$

So: integrate the stiff linear part implicitly, the cheap-to-invert part, and leave the
expensive nonlinear part explicit where it's already fine. That's [IMEX](https://en.wikipedia.org/wiki/Explicit_and_implicit_methods),
and for a tridiagonal operator the implicit solve is a Thomas sweep — $O(n)$, no pivoting:

$$
(I - dt\,L)\,Y^{n+1} = Y^n + dt\left(V_0(Y^n) - L\,Y^n\right)
$$

And the reward for the upwind/central sign structure is that $I - dt\,L$ comes out an
[M-matrix](https://en.wikipedia.org/wiki/M-matrix), rows summing to zero, strictly
diagonally dominant, so the backward solve is unconditionally stable *and* monotone, and
needs no pivoting at all.

### The result

| ν-grid | explicit | IMEX | speedup |
|---|---|---|---|
| n = 100 | 4.99 ms | **0.69 ms** | **7.2×** |
| n = 200 | 29.5 ms | **1.40 ms** | **21×** |

The number I actually care about is not either column. It's that **the speedup grows with
resolution**, and it has to. The explicit step count is CFL-bound and climbs with the grid (
376 steps at n=100, 1126 at n=200), while the IMEX count is **23 either way**, because it
never depended on $d\nu$ in the first place. So IMEX time merely doubles when the grid
doubles, since each step touches twice as many cells; explicit time pays that *and* the extra
steps, and goes up 5.9×. Halve $d\nu$ again and the gap widens again.

A full fine-grid policy re-solve went from 29.5 ms to 1.4 ms. At 1.4 ms you re-solve on every meaningful book update and quote off a
table that is never more than a millisecond stale.

And I want to be clear about how that was won, because it's the opposite of what I reached
for first. I got 21× by **removing 98% of the work**. The version where I threw threads at it
was 6× *slower* than where I started.

## What's next?

Next up is the runnable `examples/market_making` binary and a render script, so you can watch
an inventory path wander and get pulled back to zero the same way you can watch a dendrite
grow. Some things you really do have to see.
