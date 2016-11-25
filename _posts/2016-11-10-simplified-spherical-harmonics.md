---
layout: post
title: Simplified Spherical Harmonics
disqus: 'y'
---

Simplified spherical harmonics has been proposed decades ago, and it provides an approximation to ERT, by generalizing differential operator $dx$ to $\nabla$. The solution can be obtained by solving a diffusion equation system, instead of solving just one diffusion equation by assuming diffusive regime, $SP_n$ can make corrections to diffusion system by capturing more details/modes.

One thing to notice is, $SP_n$ is still an approximation even $n\to \infty$, since it is not solving the actual equation.  Usually, the scattering behavior is described with phase function, and a common choice is Henyey-Greenstein phase function.

$$p(\mu, g) = \frac{1 - g^2}{4\pi (1 + g^2 - 2g\mu)^{3/2}}$$

where $\mu = \Omega'\cdot \Omega$ as the scattering angle. And

$$p(\mu, g) = \sum_{n=0}^{\infty} \frac{2n+1}{4\pi} g^n P_n(\mu)$$

One interesting thing is to compare the idea behind integral-based method with reduced phase, and simplified spherical harmonics. If we follow the idea of $SP_n$, consider the 1D model and generalize to finite domain, then it is straightforward, because we just take azimuth angle and ignore the polar angle, completely achieves the same complexity, but model is slightly changed.

Under forward-peaking regime with large scattering, this is  reasonable though.
