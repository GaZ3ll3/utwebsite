---
layout: post
title: Weak Constraint on Fenics
disqus: y
---
Though there is no **weak constraint** in fenics, we can still cook up it with mixed function space.

For me, the first time I got to know the idea of **weak constraint** is from using **Comsol-4.4**, solving some single phase flow problem, and there is an advance option for solving the problem, when enabling the weak constraint, the restriction on boundary(or any SubDomain) will not directly work on the matrix, instead of reducing the _dofs_, it will bring more variables by mixing the space.

Just for an example, solving:

$$\Delta u = 0$$

given Neumann boundary with true solution as $u = x^2 - y^2$ on the unit square.  We know the dofs more than equations, we need one more constraint.

Suppose the constraint is:

$$\int_{\Omega} u = 0$$

then we can apply weak constraint:
$$\lambda\int_{\Omega}  v + \mu{}\int_{\Omega} u$$

Update:

The usual Lagrange multiplier method weakly add the constraint onto the target expression. The energy is represented as

$$E(u, \lambda) = \dfrac{1}{2}\int_{\Omega} (\nabla u)\cdot (\nabla u) + \lambda \int_{\Omega} u - L(u)$$

we are looking for parameter $u, \lambda$ such that $E(u, \lambda)$ is minimum.

Take variational, merge $(u, \lambda)$ as a augmented vector(function).

$$\dfrac{d}{d\epsilon} E(u + \epsilon v, \lambda + \epsilon\mu) =\int_{\Omega}\nabla u\cdot \nabla v + \lambda \int_{\Omega} v + \mu\int_{\Omega} u - L(v)$$

In general case, the bilinear form gives variational form

$$E(u) = \dfrac{1}{2}B(u, u) - L(u)$$

with constraints $F_k(u) = 0$.

The optimization takes form as

$$E(u, \lambda_k) = E(u) + \lambda_k F_k(u)$$

which produces the bilinear form embedded in augmented function space,

$$B(u, v) - L(v) + \lambda_k \langle \nabla F_k(u), v\rangle + \mu_k F_k(u)$$

If $F_k$ is linear then it will produce a symmetric weak constraint.

``` python
from dolfin import *

# Create mesh and define function space
mesh = UnitSquareMesh(64, 64)
V = FunctionSpace(mesh, "CG", 1)
R = FunctionSpace(mesh, "R", 0)
W = V * R

# Define variational problem
(u, c) = TrialFunction(W)
(v, d) = TestFunctions(W)
f = Constant(0)
g = Expression("2 * (x[0] == 1 || x[1] == 1)")
a = (inner(grad(u), grad(v)) + c*v + u*d)*dx
L = f*v*dx + g*v*ds

# Compute solution
w = Function(W)
solve(a == L, w)
(u, c) = w.split()

# Plot solution
plot(u, interactive=True)
```
