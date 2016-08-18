---
layout: post
title: Transport
disqus: y
---

First, solution of transport equation or linear Boltzmann equation:

$$v\cdot \nabla u + \sigma u = f(x, v) $$

where incoming boundary condition given.

$$f(x, v) = \int_{\mathbb{S}^2} k(x, v\cdot v') u(x, v')\mathrm{d} v'$$

Then solution can be written as

$$u = \mathcal{I} g + \mathcal{E} f$$

where

$$\mathcal{I} g = \exp\left(-\int_0^{\tau_{-}(x, v)} \sigma(x - sv, v) \mathrm{d}s\right) g(x - \tau_{-} (x, v)v, v)$$

$$\mathcal{E}f = \int_{0}^{\tau_{-}(x, v)} \exp\left(-\int_0^t \sigma(x - sv, v)\mathrm{d}s\right) f(x - tv, v)dt$$

For the wellpose-ness of the problem, we need

- $\displaystyle\sigma > \int_{\mathbb{S}^2} k(x, v\cdot v')\mathrm{d}v'$ or
- free path $\max_{x, v}\tau_{-}(x, v)$ sufficient small.

Numerics are costy, there are many softwares solving this with ``DOM`` -- Discrete Orinates Method for angular discretization. However, this will probably bring **ray effect**, otherwise, we need to formulate problem in spherical coordinates or polar coordinates, but angles won't decouple.

Numerical method: FEM-CG. using ``DOM``.

  - Gauss-Seidel preconditioner with SI.
  - DSA, use first order approximated diffusive equation as correction step.
