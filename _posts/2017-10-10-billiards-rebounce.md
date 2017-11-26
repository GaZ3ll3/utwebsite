---
layout: post
disqus: 'y'
title: Billiards Rebounce
---

When there is a perfect scatterer $T$ inside medium, the foliation process will be difficult.  The ray satisfies bi-characteristic,

$$\frac{d\xi}{ds } = -\frac{\partial H}{\partial x} = -c\nabla c |\xi|^2$$

while on the bounce point $x_b$, it will change the direction dramatically, as if
$$\frac{d\xi}{ds} = 2\delta(x - x_b) \vec{v}(\xi)$$

which means when $X$ travels to reflection location $X(s^{\ast})=(x_b, \xi_b)$, it will suffer from a jump

$$\lim_{ds\to 0^{+}}\xi(s^{\ast} + ds/2) - \xi(s^{\ast} - ds/2) =  2 \vec{v}(\xi) $$

But $H$ cannot take this information without hurting continuity, unless normal vector matches $\nabla c$, which means scatterer is levelset function of $c$.

Instead, we consider recovering the broken rays. Suppose all broken rays are corresponding to single scattering. Foliation is able to recover all non-broken rays (why?), or we are able to distinguish most non-broken and most broken rays.

We bring fidelity term $p(x)$ into the system.
