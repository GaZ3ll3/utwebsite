---
layout: post
title: Diffusion Equation
disqus: y
---

Solving diffusive equation is trivial with numerics.

$$-\nabla\cdot (D(x)\nabla u) + \sigma u = f$$

with whatever boundary condition. It has been studied thousands of times of how to solve it as fast as possible and also the theories on the (weak/strong) solution.

In ``PAT``, solving the diffusive equation will physically generate pressure $H = \Gamma \sigma{} u$, traditional ``PAT`` might include the two sub-problems: $\frac{\partial p}{\partial n} \rightarrow{} (H, c) $ and $H\rightarrow (\sigma, \Gamma, D)$, may or may not stable.

The second sub-problem involves solving inverse problem through pressure field $H$ to absorption $\sigma$, supposing diffusive $D$ is known or just set as constant.
