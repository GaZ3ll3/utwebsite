---
layout: post
disqus: 'y'
title: Billiards
---

It is an old topic and until today I finally implemented it. On a heterogeneous 2D disk, we consider geodesics in phase space according to Hamiltonian as $H = c^2 |\xi|^2$, which depicts the movement of a point billiard traveling inside the disk, $H$ can be seen as some mountains for potential.

To fully recover the information of speed $c(x)$, we will need the scatter relation $(X_s, X_r, t_{sr})$, which is a tuple of input phase coordinate, output phase coordinate and traveltime. In theory, $X_s$ and $X_r$ do not need to be located on the boundary, but in practice, we set sources are equi-spaced located on circle, with equi-spaced angles of input, and we record traveltime and output location, angle on the boundary.

So the data we have is described by a $N_s N_a \times 9$ matrix, each row containns information about a ray. Numerically, the disk is discretized on grid, so we need to let each grid passed by at least one ray. And it is quite easy to see that error will accumulate exponentially (Since it is simply a time integral).

For reconstruction of speed $c(x)$, once we use linearization, we will arrive at a linear system, but time integral related. We have to solve a non-coupled time integral.

$$\frac{dX}{ds} = L(X), \quad X(0) = X_s,\quad X(t_{sr}) = X_r$$
where $L = \mathrm{diag}(1,-1)\partial H/\partial X$. And Jacobian $\partial X/\partial X(0)$ satisfies
$$\frac{dJ}{ds} = M(X)J,\quad J(0) = I$$

which of course forms a one-parameter group. We immediately get

$$X_r - X_s \simeq \int_0^{t_{sr}} J(t_{sr}) J(t)^{-1} S(\delta c, X(t))dt $$
where $S(f, X)$ is linear operator in $f$, for each phase coordinate $X$. Thus by trapezoid rule and take matrix form of $S$,

$$X_r - X_s = J(t_{sr})(\sum_j w_j \Delta t J(t)^{-1} S_j) \delta c $$

$w_j$ are weights. And using all scattering pairs, we have a linear system as
$$D_{4m\times N} = A_{4m\times N} \delta c$$

As we have seen from previous discussion, matrix $A$ has rank ordering property, which means some pairs involves less unknowns, some pairs are involving more unknowns of $\delta c$. So we can reorder the measurement $D$ and $A$ according to the rank ``nnz(A(k, :))``, in MATLAB, just use ``colperm(A')`` to get the ordering. It is not a surprise that, the longest ray maybe involve almost all unknowns.

## Foliation

We can show the continuity of dependence of $X_r$ on $X_s$, which is trivial. We need to take small input angle to make sure dependence is minimal, i.e. ray only passes through a minimal number of grids, although, passing through one grid will automatically involve 12 grid points due to gradient in $S$. Thus, it is not numerically possible to do the problem on fine grid, therefore, fine resolution is not doable.

Roughly speaking, for boundary grids, there are 12 values involved for one grid, thus, the safe option for angular discretization is use at least 24 rays at each boundary point to recover boundary values. For interior, it depends, the most central grid needs to be resolved by rays, i.e. strongly/weakly passing through.

Foliation should be done automatically if we have the matrix $A$, rearranged as
$$A = [A_1; A_2; A_3; ...]$$

Where $A_k$ are smaller sparse matrices and of low rank, means corresponding $D_k = A_k \delta c$ is possible to solve for some values of $\delta c$. This process is called "Foliation".

The algorithm can be stated easily (noiseless).

1. Consider index set, $S_{1}$ and $S_2$, put all non-dependent grid values in $S_2$, since they are known.
2. only consider $S_1$ grids, rearrange $A$ by ``nnz`` of each row, ordering is $p$.
3. solve part of the problem $D(p(1:s)) = A(p(1:s)) \delta c$ for a selected $s$, and move this part of index from $S_1$ to $S_2$.
4. Run forward problem and get new data.
4. If $S_1$ is non-empty, goto 2.

## Complexity

The linear scheme can give at most first order convergence, all timing should be linear. Most time cost are spent on solving the rays, which is a 20-dimensional problem. A fast parallel solver is required for 1000 measurement or above.

In MATLAB, ``ode45`` or ``ode23`` can be used as time integrator, but it kills flexibility if we need to calculate matrix $A$ at the same time without memorizing everything, one should implement ``rk4`` for this purpose.

It will be quite slow for sure, the matrix manipulation are not simple ones.
