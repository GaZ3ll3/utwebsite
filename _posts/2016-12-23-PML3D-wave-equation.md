---
layout: post
title: PML for 3D Wave Equation
disqus: 'y'
---

In previous post, the wave equation in 2D, with PML for absorption boundary condition. The system is augmented to 4 unknown variables. And in 3D case, regardless of possible issues from PML, the system should involve more unknowns for additional dimension, however, it is actually more than that. It will bring an $s^{-1}$ term, representing an temporal integral.

By Laplace transform (or Fourier transform) to frequency domain, the equation is simply as ($s$ is complex)

$$s^2 u  = c^2 \Delta u$$

By changing coordinate for each axis (e.g. $x, y, z$),
$$\tilde{x} = x + \displaystyle\int_0^x \sigma_x(\xi) d\xi$$

we will arrive at a new system

$$(s^2 + s(\sigma_x + \sigma_y + \sigma_z) + (\sigma_x\sigma_y + \sigma_y\sigma_z + \sigma_z \sigma_x) + \sigma_x\sigma_y\sigma_z s^{-1}) u = c^2 \Delta u + \nabla\cdot \Phi$$

where $\Phi = (\phi^1, \phi^2, \phi^3)$ are auxiliary functions, inverting $s$ to $\partial_t$, we put the equation back to time domain,

$$u_{tt} + p_1 u_t + p_2u + p_3 U = c^2 \Delta u + \nabla\cdot \Phi$$

$$\Phi_t + \Sigma \Phi = c^2 (p_1 \mathbb{I} - \Sigma)\nabla u + \Gamma \nabla U$$

$$U_t = u$$

where $\Sigma = \mathrm{diag}(\sigma_x, \sigma_y, \sigma_z)$ and $\Gamma = \mathrm{diag}(\sigma_y\sigma_z, \sigma_z\sigma_x, \sigma_x\sigma_y)$. $p_1= \mathrm{Tr}(\Sigma)$, $p_2 = \mathrm{Tr}(\Gamma)$, $p_3 = \mathrm{det}(\Sigma)$.

There are 6 unknowns to solve : $Y = (u, u_t, \phi^1, \phi^2, \phi^3, U)$. The system's initial condition is from wave equation, additional variables are initialized as zero.

$$Y_t = L Y$$

can be solved with various numerical methods, $L$ is a second order operator in spatial variables, thus we can use FDM, FEM, pseudo-spectral.


Pseudo-spectral is slower in complexity, but it will involve less points, since it is more accurate on the derivatives. The system needs evaluation on $U_x, U_y, U_z, u_x, u_y, u_z, c^2\Delta u, \nabla\cdot \Phi$ respectively, which requires ``fft`` for 5 times on $u, U, \Phi$ and ``ifft`` for 8 times, each ``fft/ifft`` in theory needs $15Nlog_2N$ in 3D, thus total flops are $195 N\log_2 N$ flops, for a grid as large as 200x200x200, the total flops will be ``7E10`` or so. On a single core machine at effective frequency 2.0GHz, the time will be ``30s`` for one evaluation! For multi-core (say quad-core) platform, it will require (maybe) ``10s`` for one run, 1000 time-steps with forward Euler will be about 3h, multi-step methods like RK2, RK3, RK4, the time will be much longer.

If precision is not important, using ``single`` precision will cut the timing in half.
