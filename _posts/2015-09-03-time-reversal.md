---
layout: post
disqus: y
published: true
title: Time Reversal - TAT
---

In thermo-acoustic tomography, some electric-magnetic pulse is propagating into domain and excite ultrasound from the domain, which is captured by some measurements.

The ultrasound problem is formulated as
$$
\begin{aligned}
(\partial_{tt} + P) u = 0\\\\
u|_{t=0} = f \\\\
\partial_t u |_{t=0} = 0
\end{aligned}
$$  
$u$ is solved on $[0, T]\times \Omega$.

When we take $w = u(T - t, x)$, then $w$ also satisfies wave equation, in a reversal way. We can solve another wave equation
$$
\begin{aligned}
(\partial_{tt} + P) w &= 0\\\\
w|_{t=0} &= u(T) \\\\
\partial_t w |_{t=0} &= -u_t(T)
\end{aligned}
$$
then $w$ will be exactly the flipped solution. Due to the decay of energy trapped in finite domain, as $T\to\infty$, the solution should converge to zero inside $\Omega$.

And this is very useful in PAT/TAT when we only measure the solution on surface $\partial\Omega$, instead of solving a Cauchy problem, we solve a boundary value problem for wave equation, assuming the Cauchy data are zero(or maybe not).

This method is proved to be very helpful and accurate when wave speed is accurate and no attenuation is present.
