---
layout: post
title: Iterative regularization method
disqus: 'y'
---

## Regularization method

Consider non-linear problem $F(x) = y$, when $y$ is noised as $y^{\delta}$, such that $|y - y_{\delta}| \le \delta$, we know that ill-posed problem may not have a continuous inversion, and regularization methods are used to generate stable approximation of the solutions, especially when $\delta \to 0$, the approximation will converge to identification.

$$ x_{\alpha}^{\delta} = \arg\min_{x} |F(x) - y^{\delta}|^2 + \alpha |x - x_0|^2 $$

as I wrote before, this Tikhonov regularization is equivalent to maximum likelihood method, with prior information added. Under mild assumption, convergence rates results have been shown that if

$$ \tilde{x} - x_0 = (F'(\tilde{x})^{\ast}F'(\tilde{x}))^{\mu})v  $$

where $\mu \in (1/2, 1)$ and $|v|$ small enough, we have convergence

$$|x^{\delta}_{\alpha} - \tilde{x}| = O(\delta^{2\mu/(2\mu + 1)})$$

## Iterative regularization method

For linear case, $Kx = y$, we only need to find Moore-Penrose pseudo-inverse $K^{\dagger}$, by minimizing $|Kx - y|^2$, the gradient based method will give negative gradient $K^{\dagger}(y - Kx)$, if we have that

$$x = \phi(x) = x + K^{\dagger}(y - Kx)$$ is a contraction, then it would be nice to have an iterative scheme. However, contraction is a very rare property in nonlinear ill-posed problems, all we need to do here is to create some _nonexpansive_ operator $\phi$ which has contraction property.

## Nonlinear Landweber iteration

$$x_{k+1} = x_{k} + \tau F'(x_k)^{\ast}(y^{\delta} - F(x_k))$$

The converging solution might not be the $x_0$-minimized solution.

## Modified nonlinear Landweber iteration

$$x_{k+1} = x_{k} + \tau F'(x_k)^{\ast}(y^{\delta} - F(x_k)) + \beta_k(x_0 - x_k)$$

$\tau$ should be selected to be small enough.

## Newton type

Newton type methods are aiming to solve $$F'(x_k) (x_{k+1} - x_k) = y^{\delta} - F(x_k)$$

Regularization is needed for most cases when ill-posedness are present, even for linearized case.

## Levenberg-Marquardt

Instead of minimizing usual squared misfit, this method goes one more step further, $$z_k = \arg\min_z |y^{\delta} - F(x_k) - F'(x_k)z| + \alpha_k |z|^2$$

and $x_{k+1} =x_k + z_k$.

## Gauss-Newton

$$x_{k+1} = x_k + (F'(x_k)^{\ast} F'(x_k) + \alpha_k I)^{-1} (F'(x_k)^{\ast}(y^{\delta} - F(x_k)) + \alpha_k(x_0 - x_k)) $$ which is very similar to Levenberg-Marquardt.
