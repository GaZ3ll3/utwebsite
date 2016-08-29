---
layout: post
title: Thoughts on Fast Multipole III
disqus: 'y'
---
Continue with last post. Consider the pseudo-differential elliptic operator $P = \sum_{|\alpha|\le 2m} c_{\alpha}(x) D^{\alpha}$, if we have $P u(x) = f(x)$, with Dirichlet boundary condition $u^{\alpha} = 0$ for $|\alpha|\le m-1$.

$$\int_{\Omega}(P^{\ast}v(x, y))u(x) -  (Pu(x)) v(x, y) dx   = \sum_{\beta}\int_{\partial\Omega}\psi_{\beta}(x) v^{\beta}(x, y) dx$$

Here consider Green function $P^{\ast}v(x, y) = \delta_y(x)$, which is $P v(y, x) = \delta_y(x)$. If we say $K(x, y)$ is Green function of $P$, then we have to replace $x$ and $y$ in $v$, thus $K(x, y) = v(y, x)$.

$$u(y) - \int_{\Omega}  f(x)K(y, x)dx = \sum_{\beta} \int_{\partial\Omega}\psi_{\beta}(x) K^{\beta}(y, x) dx$$

Now come back to our previous exterior problem, if $f = 0$ in $\Omega^{c}$, then for $y\in\Omega$, here $\Omega$ could be internal domain or external domain.

$$u(y) =\sum_{|\beta|\le m - 1}\int_{\partial\Omega}\psi_{\beta}(x) K^{\beta}(y, x) dx$$

In 2D, there are $C_{m+1}^2$ terms in this summation, with discretization, and merge weights into $\psi$.

$$u(y_j) = \sum_{\beta} \sum_{k=1}^p \psi_{\beta}(x_k) K^{\beta}(x_k, y_j) $$

There are $pC_{m+1}^2$ unknowns for this problem. Just one surface is enough. This can be seen as an extension of ``KIFMM`` method.

### Numerical concerns
The summation over $\partial\Omega$ requires too many points (unknowns) to find out. Here we can simulate  $K^{\beta}(x_k, y_j)$ by taking finite difference to approximate the derivatives. Then we only need $m$ surfaces to find out all $K^{\beta}(x, \cdot)$, each surfaces we can place equally spaced $p$ points.

### Infinite order case
It seems to me that given all points inside a annulus will be enough for this.

### Failure for numerics
Just for a update. In numerical world, finite difference is rather a really bad idea to approximate derivatives, esp. those high order terms. Thus ``KIFMM`` is an effective fast _low_ order PDE solver.
