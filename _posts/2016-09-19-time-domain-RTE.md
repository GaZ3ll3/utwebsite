---
layout: post
title: Time domain RTE
disqus: 'y'
---
The time dependent radiative transport equation is stated as
$$
\begin{equation}
\begin{aligned}
&\frac{1}{c}\frac{\partial u}{\partial t} + \hat{s}\cdot \nabla u = \sigma(B(\nu, T) - u)\\\\
&C_{\nu}\frac{\partial T}{\partial t} = \int_{S^{d-1}}\int_0^{\infty} \sigma(u - B(\nu, T)) d\nu d\hat{s}
\end{aligned}
\end{equation}
$$
which describes the interaction of material and radiation. where $u(x, t, \hat{s},\nu)$ is radiation intensity, $T = T(x,t)$ is material temperature. $\sigma = \sigma(x, \nu, T)$ is opacity thickness, $C_{\nu}$ is heat capacity.
$$B(\nu, T) = \frac{2h}{c^3}\frac{\nu^3}{\exp(h\nu/k T) - 1}$$

by using approximation, the equation can be rewritten as an easier one,
$$
\begin{equation}
\begin{aligned}
&\frac{1}{c}\frac{\partial u}{\partial t} + \hat{s}\cdot \nabla u + \sigma u = \frac{\sigma b}{|S^{d-1}|} acT^4\\\\
&C_{\nu}\frac{\partial T}{\partial t} = \int_{S^{d-1}}\int_0^{\infty} \sigma d\nu \int_{S^{d-1}} u \hat{s} - \sigma_p acT^4
\end{aligned}
\end{equation}
$$

where $b$ is average of $B$, $\sigma_p$ is average of $\sigma b$.

There is a way to decouple the equations, by taking $t$ as another spatial variable. $z = (x, t)$, we have
$$
\tilde{s}\cdot \nabla_z u + \sigma(z, \nu) u = H(z, \nu)
$$

which is quite easy to come up with a solution for $\phi = \int_{S^{d-1}} u$. And insert into temperature equation.

$$C_{\nu}\frac{\partial T}{\partial t} = \int_0^{\infty}\sigma d\nu \int_{S^{d-1}}\int_0^{\tau^{-}(z,\tilde{s})} \exp(-\int_0^p\sigma(z-\mu\tilde{s})d\mu) H(z - p\tilde{s}) dp d\tilde{s} - \sigma_p ac T^4$$

And solving this can apply some fast algorithm like ``treecode`` or ``FMM`` as we did before, forward Euler scheme will generate $O(\Delta x)$ error.
