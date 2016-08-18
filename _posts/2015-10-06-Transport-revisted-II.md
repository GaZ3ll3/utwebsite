---
layout: post
disqus: y
title: Transport Revisited II
---
Previously, I implemented the radiative transport equation solver before March, it is fast but not accurate enough, in almost-diffusive regime ($\sigma_s/\sigma_a \sim 100$), the solution is not near the diffusion solution, with 20% $L^\infty$ error.

Now, I tried another method we talked about in last post, under $xy$ coordinate, a particle-particle interaction (FMM based) method is adopted here, with 5% or so error.

Under polar coordinate, the core part of algorithm is
$$
\frac{1}{\mathrm{Vol}(\mathbb{S^{d-1}})}\int_{\mathbb{S^{d-1}}} \int_0^{\tau^-} E(x_i, \theta_i, r)S(x_i - r\theta_j) dr d\theta
$$

In 2D, it is simply
$$
\frac{1}{2\pi}\int_{0}^{2\pi} \int_0^{\tau^-} E(x_i, \theta_i, r)S(x_i - r\theta_j) dr d\theta
$$

which is
$$
\frac{1}{2\pi} \int_{D}\frac{E(x_i, y)}{\|x_i - y\|} S(y) dy
$$

The integral has a decay kernel
$$
K_{transport} = \frac{E(x, y)}{\| x - y\|}
$$
this is a similar decay function with diffusion kernel as
$$
K_{diffusion} = \frac{1}{\|x - y\|}
$$

The only problem is evaluate the integration function $E(x, y)$ accurately. FMM gives a good start for this kind of integration. Suppose there are $N^2$ piecewise constant components in the domain. Then the standard time cost should be $O(N^5)$ at least, using quadtree data structure, it will change the time cost to around $O(N^3 \log(N))$.

If we can find an accurate expansion, it will probably give a $O(N^3)$ method.
