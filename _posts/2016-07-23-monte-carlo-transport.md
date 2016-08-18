---
layout: post
title: Monte Carlo Transport
disqus: 'y'
---

Radiative transport equation has multiple ways to solve, here I prefer to talk about one efficient way using MC.

MC simulation will try to emit a huge number of particles and track each particle's life cycle. We are particularly interested in intensity of the solution which is the angular integral of solution at each point. This will save a lot of time in simulating. As we know, the error related to MC is proportional to $\frac{1}{\sqrt{N}}$, where $N$ is the particles emitted at each point.

We select an easier case to handle here,

$$v \cdot \nabla u(x, v) + \sigma_t u = \sigma_s \frac{1}{\mathrm{Vol}(V)}\int_V u + q$$

where $\sigma_t = \sigma_a + \sigma_s$, and coefficients are all positive constants. To put the model into numerical framework, we discretize the domain $[0,1]^2$ into small squares for convenience. Suppose we have mesh as $L \times L$, $L$ represents the number of boxes along one side.

Following is the pseudo-code.

``` python
for location x in domain:
  spawn N particles
  for particle p in the group:
    carries energy as q[x] initially
    while p has not finished traveling:
      travel along its direction to x'
      illuminate x' with its energy
      if p is going to be absorbed:
        break loop since p is dead.
      else:
        change its direction to another one.
```

The most time-costing part is random number generating. We can do this very quickly if we know the distribution and sample the distribution intentionally, which works perfectly under our case.

The distance traveled is $-\log(\xi)/\sigma_t$, where $\xi\in U[0,1]$. The performance is good if there is not a large $N$ or $\sigma_s$ is not too large, we should have a quick stop for one run. For other cases, it will take a long time for sure.

For parallel computing in this case, it will be better to run simulation distributed, using the MapReduce framework.

One thing needs to point out is the discretized case, if we try to approximate the solution in $C^0$ sense, the error will not just first order, it will be worse than first order. Even if the coefficients are constants.
