---
layout: post
title: L1 regularization
disqus: y
---

L1 regularization is typically stated as minimizing

$$ \min_{x} f(x) =  \lambda \Vert x \Vert_{L^1} + L(x) $$

where $L\in C^2(\mathbf{R}^n)$, and bounded from below. It is easy to see that sufficient large $\lambda$ will force solution to be sparse.

However, since $f(x)$ is not differentiable, using Matlab's ``fminunc`` or other gradient-dependent optimization toolbox may not give a nice try.

It would be extremely easy to prove minimum exists and without . And minimum satisfies:

$$
\begin{aligned}
\nabla_j L(x^{\ast})  + \lambda = 0\quad x^{\ast}_{j} >0 \\\\
\nabla_j L(x^{\ast})  - \lambda = 0\quad x^{\ast}_{j} < 0 \\\\
-\lambda\le\nabla_{j} L(x^{\ast})\le\lambda\quad x_{j}^{\ast} = 0
\end{aligned}
$$

Using smooth constraint:

Consider $x = x^+ + x^-$, where $x^+$ and $x^-$ are both non-negative vectors. Equivalent problem as

$$
\min_{x^+, x^-} \lambda \sum_{j = 1}^n {x_j}^+ +  \lambda\sum_{j = 1}^n {x_j}^- + L({x}^+ - {x}^-)
$$
