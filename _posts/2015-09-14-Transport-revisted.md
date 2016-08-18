---
layout: post
disqus: y
title: Transport Revisited
---

Linear Boltzman equation:
Denote
$$\phi(x) = \frac{1}{\mathrm{Vol(\mathbb{S}^{d-1})}}\int_{\mathbb{S}^{d-1}}u(x, \theta')d\theta',$$

$$
\theta\cdot \nabla u(x, \theta) + \sigma_t(x) u(x, \theta) = \sigma_s(x) \phi(x) + f(x)
$$

Using ballistic transport equation's solution
$$
u(x, \theta) = \int_0^{\tau^-(x, \theta)}\exp\left(-\int_0^{t} \sigma_t(x - s\theta) ds\right)\left(\sigma_s(x- t\theta)\phi(x - t\theta) + f(x - t\theta)\right) dt
$$
$$
\phi(x) = \frac{1}{\mathrm{Vol(\mathbb{S}^{d-1})}}\int_{\mathbb{S}^{d-1}} \int_0^{\tau^-}\exp\left(-\int_0^{t} \sigma_t(x - s\theta) ds\right)\left(\sigma_s(x- t\theta)\phi(x -t\theta) + f(x- t\theta)\right) dt d\theta
$$
If we solve this under discrete orinate framework, considering interpolation of $\sigma_s$ and $\sigma_t$ as well as $\phi$, under a well-triangulation mesh with neighboring information, it is possible to conclude:

$$
\phi(x_i) = \frac{1}{|K|} \sum_{\theta_j\in K}\int_0^{\tau^-} \exp\left(-\int_0^t \sigma_t(x_i-s\theta_j)ds\right)\left(\sigma_s(x-t\theta_j)\phi(x - t\theta_j) + f(x - t\theta_j)\right) dt \Delta \theta_j
$$

Consider ray starts from $x_i$ with direction $\theta_i$, the ray passes through domain and intersects with many elements(mesh, grid), using first order approximation,

$$
\int_0^{\tau^-} E(x_i, \theta_j, t) S(x_i - t\theta_j) dt = \sum_{k} E(x_i, \theta_j, t_k)S(x_i - t_k \theta_j) \Delta t_k
$$
where $t_k$ is the length of segment in the element. The integral in $E(x, \theta, t)$ could also be approximated by finite summation. Since there are two summations, first order time-splitting is reasonable, second order splitting(RK2) is also easy to implement.

The problem of this method is, accuracy largely depends on the mesh size, first order approximation near $x_i$ is highly inaccurate and loses information, the solution should be somewhat less than the true solution (assuming everything is positive and bounded from below) .

To increase the accuracy, the integral can be formulated in $(x, y)$ coordinate instead of $(r, \theta)$ coordinate. The reason is assuming linearity of transition between $\theta_i$ and $\theta_i + d\theta$ is very inaccurate unless it is very near.

Under $(x, y)$ coordinate,
$$
\frac{1}{\mathrm{Vol}(\mathbb{S^{d-1}})}\int_{\mathbb{S^{d-1}}} \int_0^{\tau^-} E(x_i, \theta_i, r)S(x_i - r\theta_j) dr d\theta
$$

using 2D as an example, above equation is

$$
\int_0^{2\pi} \int_0^{\tau^-} E(x_i, \theta_i, r)S(x_i - r\theta_j) dr d\theta = \int_{y\in D} E(x_i, y) S(y) \frac{dy}{|x_i - y|}
$$

If $E(x_i, y)$ can be evaluated accurately, then for the integration , by first order approximation,

$$
\int_{D}\dfrac{E(x_i, y)}{|x_i - y|} S(y) dy = \sum_{D_k} \dfrac{E(x_i, y_k)}{|x_i - y_k|} S(y_k) |D_j|
$$

High ordered scheme is quite straightforward for here. The comparison between the two methods:

1. accuracy, $xy$ coordinate is better, with fast algorithm(preprint now), by losing a little accuracy, we can achieve very fast result.

2. speed, discrete orinate is better on computing() several times faster for now), but needs geometry to be calculated before. Under $xy$ coordinate, geometry is predefined, and no need to store extra geometry related variables.
