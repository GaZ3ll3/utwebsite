---
layout: post
title: Wave Equation
disqus: y
---

In this post, I am going to try some standard ways to solve wave equation in time domain.

$$u_{tt} - c^2(x) \Delta u = 0$$

with initial Cauchy condition.

Consider using finite element method in space $T_{n} \times P_{m}$.

$$u(x, t) = \sum_{j = 1}^{M} \sum_{k = 0}^N u^k_{j} \phi_j(x)\psi_k(t)$$

then take $v(x,t) = \phi_l(x) \psi_r(t)$ multiply $u$ and integrate over whole domain. The left hand side equals

$$-\sum_{j,k} u_j^k \int_{\Omega}\phi_j\phi_l\int_{\delta t} \dot{\psi_k}\dot{\psi_r} + \sum_{j, k} u_j^k \int_{\Omega}c^2\nabla\phi_j\nabla\phi_l \int_{\delta t}\psi_k\psi_r $$

Taking notation $M_{jl} = \displaystyle\int_{\Omega}\phi_j\phi_l$ and similarly with $K$, $S$, $P$. And we got an equation like

$$
-\sum_{j, k} u_j^k M_{jl} K_{kr} + \sum_{j,k} u_j^k S_{jl} P_{kr} = RHS$$

which gives an iteration:

$$-M(\sum_k U^k K_{kr}) + S(\sum_k U^k P_{kr}) = RHS$$

If $T_n$ is piecewise linear, then $K$ and $P$ is tridiagonal.

$$-M(U^{r+1}K_{r+1, r} + U^r K_{r,r} + U^{r-1} K_{r-1, r}) + S(U^{r+1}P_{r+1, r} + U^r P_{r,r} + U^{r-1} P_{r-1, r}) = F$$

a.k.a

$$U^{r + 1} = A U^{r} + B U^{r - 1} + C$$ where $A, B, C$ are fixed.


Initial condition $u(x, t)$ at $t = 0$, gives $U^0$ vector. Derivative information gives difference between $U^1$ and $U^0$.

---

We cannot use higher order ``FEM `` for time coordinate, since information would not be enough. For that case, we simply consider spatial integral only.

$$u(x, t) = \sum_{i}\psi_i(t)\phi_i(x)$$

We will obtain a second ordered ODE for $\mathbf{\psi}$,

$$M \ddot{\psi} + S\psi = f$$

given $\psi(0)$ and $\psi'(0)$. Solving this involves integration methods like Runge Kutta if taking $\zeta = (\psi, \psi')$ as a variable, then

$$\frac{d\zeta}{dt} = (\psi',\psi'') = (\psi', -M^{-1}S\psi + M^{-1}f) = g(\zeta)$$

$\zeta(0)$ is given.
