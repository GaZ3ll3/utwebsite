---
layout: post
disqus: 'y'
title: Bregman As Default
---

For most nonlinear inverse problem, direct solution is not accessible easily, thus many people chose an iterative optimization scheme.

Suppose forward model $\mathcal{M}: (\sigma, u_g, g)\to m$ passes unknown variable coefficient $\sigma\in \mathcal{E}$, unknown solution $u_g$ and known input $g\in\mathcal{G}$ to some observable measurement $m$, where $u$ satisfies solution model constraint $F(u_g, \sigma, g) = 0$. we usually use minimization scheme:
$$\min_{\sigma} J(\sigma) = \sum_{g\in\mathcal{G}} |\mathcal{M}(\sigma, u_g, g) - m|^q + \frac{\beta}{2}\|\sigma\|_{p}$$

values for $p,q$ are found everywhere, common choices for regularization is TV or $L_1, L_2$.

When $q=2$, adjoint method is often used to reduce computational cost, ignoring $g$ for each input,

$$\frac{\partial |\mathcal{M}(\sigma,u) - m|^2}{\partial \sigma} (\delta \sigma)=2( \frac{\partial \mathcal{M}}{\partial \sigma}(\delta \sigma))^t(\mathcal{M}(\sigma,u) - m)$$
and
$$\frac{\partial \mathcal{M}(\sigma, u)}{\partial \sigma}(\delta \sigma) = \mathcal{M}_{\sigma}\delta\sigma + \mathcal{M}_{u}\frac{\partial u}{\partial \sigma}(\delta \sigma)$$

we need to resolve $\frac{\partial u}{\partial \sigma}$ which is reduced from solution model that
$$F_u \frac{\partial u}{\partial \sigma}(\delta \sigma) + F_{\sigma}(\delta\sigma) = 0$$

so we have
$$\frac{\partial \mathcal{M}(\sigma, u)}{\partial \sigma}(\delta \sigma) = \mathcal{M}_{\sigma}\delta\sigma + \mathcal{M}_u F_u^{-1} F_{\sigma}(\delta\sigma)$$

The $F^{-1}_u$ is some solution operator, we take adjoint, then we only need solve
$$(F_{\sigma}(\delta\sigma))^t F_u^{-t} \mathcal{M}_u^t (\mathcal{M}(\sigma, u) - m)$$

Now, for each iteration, we need to evaluate operations, mostly matrix-vector multiplications.

$$\mathcal{M}_u^t(y), F_u^{-t}(y), F_{\sigma}(\delta \sigma), F^{-1}(y)$$

For linear operators, we have $F_u = F$, but $F_{\sigma}$ has to be calculated separately, for large system, $F^{-1}$ is nontrivial to update fast.

This is the unconstrained version. This version of numerical implementation has to calculate exact solutions to $F$ multiple times $O(1)$.

In order to quantify the cost, we consider following model of time cost.

- $t_{mv}$ is sparse matrix-vector multiplication time.
- $t_{sv}$ is the inversion time.
- $t_{pre}$ is precomputing time for ``mv`` or ``sv``.
- $t_{set}$ is total intrinsic setting time for all operators, which is minimal.

Total time for each iteration will be: $t_{set} + t_{pre} + 2t_{sv} + (n+1)t_{mv}$. When the operators are sparse (local), then $t_{mv} = O(n)$, $t_{sv} = O(n)$, but mostly ill-conditioned, preconditioner is needed, total is $O(n^2)$. In this case, it is not optimal to use the low rank compression here due to high overhead in $t_{pre}$.

If $F$ is integral equation, then system is dense. $F_u^{-1}$ or $F^{-1}$ is not cheap to calculate in practice, iterative method might be utilized for such problems, in such case, low rank method can kick in.


Then we look at constrained version. Optimization problem is
$$\min_{\sigma, u_g} J(\sigma, u_g) = \sum_{g\in\mathcal{G}} |\mathcal{M}(\sigma, u_g, g) - m|^q + \frac{\beta}{2}\|\sigma\|_{p}$$
subject to
$$F(u_g, \sigma, g) = 0.$$

The Lagrangian multiplier method gives
$$\min_{\sigma, u_g, \lambda}L(\sigma, u_g, \lambda_g) =  J(\sigma) - \sum_g\lambda_g F_g$$

The KKT conditon says
$$J_{\sigma} = \sum_g \lambda_g F_{g,\sigma},\quad J_{u_g} = \sum_{g}\lambda_g F_{g, u_g}$$

To solve the problem, we use some penalty term in addition to get ``AL`` as
$$L_{al}(\sigma, u_g, \lambda_g, \mu) = J(\sigma) - \sum_{g}\lambda_g F_g + \frac{\mu}{2}\|F(u_g,\sigma, g)\|^2$$

[TO BE CONTINUED]
