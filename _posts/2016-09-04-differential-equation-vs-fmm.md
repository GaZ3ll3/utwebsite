---
layout: post
title: Differential Equation VS. FMM
disqus: 'y'
---

After a long time of thinking, I would say fast multiple method is not a good method for solving differential equation, though it is a great algorithm.

#### interpolation vs. extrapolation

Finite difference method on a structured grid, approximating the differential operator using stencil, will generate a sparse system, which generally gives $\mathcal{O}(N)$ complexity, the constant depends on the wanted precision and order of equation.

The error analysis usually gives $\mathcal{O}(h^s)$, decreasing w.r.t $h$ the grid size.

FMM, in someway we can obtain the Green function, the solution is integral form, the error comes from two parts.

The first is discretization, depending on $h$. The second is from FMM algorithm itself, depending on its parameters, could be arbitrarily small, but will be dominated by the first one easily, a good rule is to select parameters to be comparable to the discretization error.

Well, the discretization error is terrible for FMM, to make the precision high enough, interpolation is very important, we need to import more points on the smallest resolution to get a high order quadrature rule, increasing the computing cost by a linear constant. The case is: this constant is as the same level as FDM (which uses extrapolation).

#### when to use

I think, the only case to use FMM on equation, is only good on integral equation only, no explicit differential equation is available. Unless FMM can reduce a lot of computation cost, otherwise, there is no need to use.
