---
layout: post
title: Wave Equation with PML
disqus: y
---

Last post, I wrote some doodle work on solving the wave equation under ``FEM`` framework. And we did not consider the boundary condition, since the equation assumes valid for all plane. Now if truncated, ``PML`` is a way to save it, just with tiny modification on our previous work.

Formulation is not as simple as frequency domain using a trivial transformation to introduce absorption term. We need to use ``ifft`` to transform our Helmholtz equation back to time domain.

Think about equation:

$$u_{tt} - \nabla\cdot(\mu\nabla u) = f$$

using Laplace transform

$$\tilde{u} = \int_0^{\infty} \exp(st) u(x, t)\mathrm{d}t$$

Thus we got Helmholtz, $s$ is complex.

$$s^2 \tilde{u} = \nabla\cdot(\mu\nabla\tilde{u}) +\tilde{f}$$

making coordinate transform as we do with Helmholtz:

$$x \rightarrow \tilde{x} = x + \frac{1}{s} \int^R \sigma(x)\mathrm{d}x$$

with conductivity $\sigma$, which is positive outside domain and vanish inside.

Extend $\tilde{u}$ onto transformed space,

$$s^2\tilde{u} = \tilde{\nabla}\cdot(\mu\tilde{\nabla}\tilde{u}) + \tilde{f}$$

The transforming back,

$$\begin{aligned}(s^2 + s(\sigma_x + \sigma_y) + \sigma_x \sigma_y) \tilde{u}= \nabla\cdot(\mu\nabla \tilde{u}) + \frac{\partial}{\partial x}(\mu \frac{\sigma_y - \sigma_x}{s + \sigma_x} \tilde{u}_x) + \frac{\partial}{\partial y}(\mu \frac{\sigma_x - \sigma_y}{s + \sigma_y} \tilde{u}_y) + f
\end{aligned}$$


$s$ means $\frac{\partial}{\partial t}$, therefore $u_{tt} + (\sigma_x + \sigma_y) u_t + \sigma_x \sigma_y u =
\nabla\cdot(\mu\nabla u) + \nabla\cdot\phi + f
$

where $\phi_t = A\phi + \mu B {\nabla}u$ and $A = diag(-\sigma_x, -\sigma_y)$, $B = diag(\sigma_y -\sigma_x, \sigma_x - \sigma_y)$. Initial $\phi$ as 0.

Using finite difference is acceptable. Central scheme with time, and work carefully with gradient on spatial grid.

Or use ``FEM`` on spatial and ``RK4`` for time integration. It should be fast on constructing the matrices if time-independent. Then it would be easy to calculate

$$\zeta' = f(\zeta)$$

each step involves 4 calls on the function $f$, and each call involves ~10 ``sparse-matrix-dense-vector`` multiplication, timing takes 0.05 seconds each for a matrix size of 18000 or so. That is about 1~2 seconds for one time step!! Unless we can find a way to reduce the calculations.


Hooray! By profiling the calculations, multiplication is just too fast and ``mldivide`` is taking most of time. But we know one thing, everything is going to be applied the same operation ``mldivide`` at last, do it at one pass with reduce the overhead at each round, the real calculation time would be only ``1e-3`` or so, but overhead will make it ``1e-1`` somehow.

Another thing is calculating the vector-mass matrix like

$$\int_{\Omega}  \phi_j (A\nabla \phi_i )\mathrm{d}x$$

It seems taking twice the timing than just stiffness or mass. However, we know one thing, as a sparse matrix ``COO-format`` : $I, J$ are fixed during all calculations like this, then avoiding getting extra work will make things move faster.

Update: examples are included in ``femex/example/PML`` on github. Performance is reasonable.


![Comparision](http://www.ma.utexas.edu/users/yzhong/images/post_img/pml.gif)

Problematic part: The previous overhead argument is kind of wrong in Matlab, ``horzcat`` creates a pretty large copy of the input, that will allocates lots of memory in advance.

Another thing is the ``ode45``, it stores all solutions. That is a large cost, and porting them into ``plot`` function also takes a lot of time.

Workaround: try to write a function in C using GSL to make this faster, or write some function with C to avoid storing the solution. Or simply add a callback..
