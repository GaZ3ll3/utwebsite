---
layout: post
title: Heat Equation
disqus: y
---

The simplest case of diffusion in two dimensional domain $\Omega\subset\mathbf{R}^2$,

$$\Delta u = f$$

with given whatever boundary condition. It has been studied thousands of times. Numerically, it is also easy to show it is computational stable.

With structured grid, finite difference would be a natural first order method, taking Dirichlet boundary condition without any extrapolating.

$$\Delta u \sim \frac{u(x + h, y) + u(x - h, y) + u(x, y + h) + u(x, y- h) - 4 u(x ,y)}{h^2}$$

When we are going to use higher ordered method on the grid, it does not permit us to extrapolate to outside of the domain. But if the grid is fine enough, we can always do interpolate, but without graceful symmetric property. Interpolate $u_{xx}$ with $u(x+h, y)$ and $u(x - jh, y)$ might not give a stable approximation, but could be an accurate one.

Instead of looking for coefficients - which means solving an easy linear system, finite element approach is much more straight-forward. First order method coincides with finite difference, higher order methods will formulate sparse system. Apart from this, we still can tweak the problem more.

FEM-BEM is a standard extension, free the boundary, make everything unconstrained and then use all conditions to constrain them,

$$\int_{\partial\Omega} \frac{\partial u}{\partial \nu} v - \int_{\Omega} \nabla u \cdot \nabla v = \int_{\Omega} fv$$

Sparse solver could be ``UMFPACK`` or ``gmres`` directly from Matlab. Or use ``AMG`` alike solvers which would provide reasonable speed.

Use ``multigrid`` to sacrifice memory for performance and accuracy, building mapping between grids would be memory killer if mesh is unstructured.

---

Consider more about diffusive processing, if there is transport $\sigma_t > 0$, where

$$\nabla\cdot (D\nabla u) - \sigma_t u = f$$

Since there is nothing to worry about the oscillation - the kernel is positive definite, the solution will decay rapidly, it is very stable to solve this without any problem.

If we reverse the transport, instead of that, negative $\sigma_t$ could be some trapping effect, making things not going away, and force oscillation, which is like wave equation.

It is also easy to prove if $D$ has positive lower bound, then  $\sigma_t$ could be negative, but not exceeding negative first eigenvalue, the problem is still fine to solve without wave effect(without any proof). That is - even trapped, diffusive process is still working, as I understand intuitively.

---

For this kind of wave equation, we have a lot of theory on it, and it could be approximated by eikonal equation, wavefront is propagating along some geodesic line.

$$|\nabla u| = f$$

which could be solved with a variety of methods, one of them is ``marching`` method.

- Fast marching
- Fast sweeping
- Ray tracing
