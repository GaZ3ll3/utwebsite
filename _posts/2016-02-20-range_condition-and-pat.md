---
layout: post
disqus: y
title: Range Condition and PAT
---

Here I propose an idea to prove the uniqueness on reconstructing $c(x) = c(\gamma_1,\cdots,\gamma_n)$ during the first step, $H$ is unknown either, the wave speed is depending only on several variables, and assume this dependence is continuous and mild.

Now come to range condition, suppose $\lambda_j > 0$ are eigenvalues of $-c^2(x)\Delta$, then the eigenvalues are depending on $\gamma_1,\cdots, \gamma_n$, hopefully, this dependence is also mild.

The uniqueness only needs us to show that small perturbation on $\gamma_1,\cdots,\gamma_n$ won't let those eigenvalues collide.

Since the changes in $\lambda_j$ might be small, we just need to show that the gap between eigenvalues is non-vanishing: $\inf_{j} (\lambda_{j+1} - \lambda_j) > 0$.

Now the sketched proof is done.

P.S. this problem is proved to the unstable in Sobolev norm and some numerical results also suggests that it is unstable to recover the wave speed. However, there are some uniqueness results already.
