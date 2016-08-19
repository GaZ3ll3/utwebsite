---
layout: post
title: Thoughts on Fast Multipole II
disqus: 'y'
---

In last post, I sort of believe that ``KIFMM`` was limited to a small portion of PDE, especially for second order elliptic equations, while the deeper idea is not the same thing at all.

### Equivalence of information
I realized that there is something called ``Equivalence of information`` here, for example, Laplacian $\Delta u = 0$ made solution depending only information on boundary, as we called boundary value problems.  Then we can define the equivalence class of equation $P u = 0$ that associated with pseudo-differential operator $P$.

In theory, even higher ordered elliptic equation

$$P(x, D) u =  \sum_{|\alpha| \le 2m} c_{\alpha} D^{\alpha} u = 0$$

we can see that for this equation, classical results could apply easily, and we consider the weak formulation, if vector-function $\tilde{g} = (g_{\alpha})_{|\alpha|\le m-1}$,  which satisfies
$$\|\tilde{g}\| = \sum_{\alpha} \|g_{\alpha}\| $$
is finite, we say $\tilde{g} \in W^{m-1}(\partial\Omega)$. We are looking for $u\in W^{2m}(\Omega)\cap W^{m-1}(\overline{\Omega})$ such that  $Pu = 0$ and $D^{\alpha} u|_{\partial\Omega} = g_{\alpha}$.

>For any bounded domain $\Omega$, there is unique weak solution to the Dirichlet problem $P u = 0$. When boundary is smooth enough, the weak solution is also classical solution.

On the other hand, the exterior problem also has unique solution for the same Dirichlet boundary conditions.

> If $Pu = 0$, for any given measure $\nu^{\alpha}\in\Omega$, there exists $\mu^{\alpha}\in \partial\Omega$ that
$$\sum_{|\alpha|\le m-1} \int (D^{\alpha}u) d\mu^{\alpha} = \sum_{|\alpha|\le m -1} \int (D^{\alpha} u) d\nu^{\alpha}$$

The proof should be found somewhere in ``ADN (Agmon, Douglis, Nirenberg)``, uniqueness could be concluded from something similar of Lax-Milgram. That also reveals the fact that this operator $P$ has equivalence class $\Omega\sim (\partial\Omega)^{m}$. Since we can use finite difference method to approximate $D^{\alpha} u$ on $\partial \Omega$, by giving $u$ at $\partial\Omega + t_i\mathbf{n}$ surfaces, where $t_0, \cdots, t_{m-1}\in (0,\epsilon)$. Now our problem is how to generate those surfaces/or small domains for equivalence potential.

### Equivalent cluster of surfaces
Define cluster of surfaces $C(t_i),i=0,\cdots, m-1$, where $C(t_i) = \{x + t_i \mathbf{n}, x\in \partial\Omega\}$. We also consider the solutions on each surfaces $C_i = C(t_i)$ as $u_i$.

Then $D^{\alpha} u$ can be computed through finite difference. Especially, on square surface, this is quite straightforward to compute each derivatives.

### Exterior to Interior problem
Consider free space Green function for internal source $f$, the whole space solution is
$$u(x) = \int_{\Omega} K(x, y) f(y) dy$$
and here we are looking for $\Lambda_{\alpha}$ such that $x\in \Omega^{c}$,
$$u(x) = \sum_{|\alpha|\le m - 1} \int_{\partial\Omega} \Lambda_{\alpha}(x, y) \underline{D^{\alpha} u(y)}dy$$

### Interior to Exterior problem
The exterior problem will be the same, except the source $f$ lives outside of the domain $\Omega$.
