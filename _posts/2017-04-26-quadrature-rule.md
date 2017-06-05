---
layout: post
title: Quadrature Rule
disqus: 'y'
---

For many PDE problems, they have some integral equation representation form too. I once mentioned whether it is good or not to put problem into integral form or not. For a lot of times, I think explicit form of something like Green's function is necessary for such a solution
$$u = \int G(x, y)f(y)$$
over surface or volume.

For smooth kernel function $G(x,y)$ in both variable, satisfying mild growth of derivatives magnitude. The local Taylor expansion could give sufficient high accuracy.

For non-smooth kernel function, say piecewise defined function or globally $C^k(D)\times C^k(D)$, then it is not possible to approximate $G$ with high order polynomials. In the other word, the accuracy is limited to the discretization and its regularity.

When $G(x,y) \in C^k(D)\times C^k(D)$, we can take derivatives upto $k$-th order for each of the variables, meaning that locally we have a reminder like $O(h^{k+1})$ near the irregular part.

For instance, if our function $G(x, y) = |x-y|$ for volumetric integral, then $k=0$, and irregular part happens only at $x=y$, for uniform discretization of size $h$, the local error is at order $O(h)$. We can expect the integrated error to be $O(h^{d+1})$ provided the dimension is $d$. The convergence rate is expected to be $d+1$.

For other cases such that singularity exists, e.g. $G(x,y) = |x-y|^{-1}$, special care has to be applied to the near interactions, which is far more tricky and expensive than irregular cases. Here the usual way is to divide the integral into several parts according to the "magnitude" of steepness. For those mild change parts, smoothness is preserved; for nearby parts, the change is faster, so divide into pieces to reduce the change rate; for the singular part, coordinate transform is applied.

At the end of the day, it is all about tricks, there is no general rule for every kernel function, the precomputed quadrature has to be done for all geometries and all quadrature points. It should be also noticed that for those translation invariant kernel functions like $G(x,y) = G(|x-y|)$, the precomputation could be reused for similar (e.g. $G(\lambda t) = \lambda^{\beta} G(t)$) or the same geometries under rotations.
