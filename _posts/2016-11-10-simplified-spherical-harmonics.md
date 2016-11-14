---
layout: post
title: Simplified Spherical Harmonics
disqus: 'y'
---

Simplified spherical harmonics $SP_n$ comes from infinite slab model, under strong scattering, one only needs to focus on azimuth angle scattering, and for the other direction of angle, it will integrate out.

Another good property of $SP_n$ is the recursive property of Legendre polynomials combined with odd-even parity, gives a **non-sparse** system.

Take
$$\psi_i = (2i-1)\phi_{2i - 2} + (2i)\phi_{2i}$$

$SP_7$ will give a matrix between $\psi$ and $\phi$, only with even terms of $\phi$.
$$
\begin{pmatrix}
1 & 2 & 0 & 0\\\\
0 & 3 & 4 & 0\\\\
0 & 0 & 5 & 6\\\\
0 & 0 & 0 & 7
\end{pmatrix}\phi = \psi
$$
with a trivial inversion.  The differential operator system gives

$$L_i \psi_i = \sum_i S_{ij} \psi_j + g_i$$

where $L_i$ are second order differential operators and $S$ **is** sparse. Under finite element method framework, we will arrive at a linear system that

$$(\mathrm{diag}(L_i) - S )\psi = g$$

But with integral equation,

$$\psi_i = \sum_i A_{ij} \psi_j + f$$

the operators $A_{ij}$ are evaluated separately and $A = (A_{ij})$ is **not** sparse.

These two methods have very similar last step, but they are quite different in many ways, in theory, differential equation form will work better because of lower computational cost. Unless there is a way to reduce the cost of integral equation's cost.
