---
layout: post
title: Bayesian Reconstruction
disqus: y
---

It is nothing but regularization, stem from distributional framework.

Suppose $Y = f(X) + E$, with $E$ obey some distribution $\pi(e)$. Then Bayesian framework says

$$\pi(y|x) = \pi(e)$$

then $\pi(y) = \pi(e) \pi(x)$, the first term describes the error density, where $E$ has zero mean $\int e\pi(e) = 0$.

For $\pi(x)$, it largely depends on prior information of input data. If we do not have any constraint on $x$, then $\pi(y)$ is proportional to $\pi(y | x)$, the maximum likelihood will simple be a minimization on $e$, or finding inverse of $f$.

If we add constraint on $x$, then there is a distribution of $x$, also adding some regularization term to the maximum likelihood functional, only depends on $x$.

$$ML = \ln (\pi(y)) = \ln(\pi(y|x)) + \ln(\pi(x))$$

the latter term is regularization, the first term is the objective functional. If all things are Gaussian, then we will arrive at Tikhonov, kind of trivial.
