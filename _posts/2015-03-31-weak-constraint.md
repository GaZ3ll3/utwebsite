---
layout: post
title: Weak Constraint
disqus: y
---

When we play around with finite element, with various boundary condition, we usually do not think about why we have to impose those condition. Some of the conditions are natural, like absorbing, or Dirichlet condition, some are not. For the Neumann boundary condition, sometimes, we can measure the current flow out from the boundary, then imposing such a condition is without doubt, sometimes, the boundary condition is not measured, but physically should be there, like free fluid surface, while imposing the condition directly will potentially make things too restricted, in this case, **weak constraint** is used.


**Note: the following content only valid for linear constraint**.

By using Lagrange multiplier method to impose the boundary condition, we introduce the multiplier $\lambda$ as trial function and another function $\mu$ as test function.

$$\min_{\lambda} \frac{1}{2}B(u, u) - \langle u, f\rangle - \int_{D}\lambda (R(u) - g)$$

where $R$ is the linear restriction operator.

take variational,

$$B(u, v) - \langle v, f\rangle - \int \mu (R(u) - g) -\int  \lambda{} R v = 0$$

i.e.

$$\widehat{B}(u, \lambda; v, \mu) = B(u, v) - \int \mu R(u) - \int\lambda Rv  = \langle v, f\rangle - \int \mu{} g$$
