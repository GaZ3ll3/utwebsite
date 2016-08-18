---
layout: post
title: Thoughts on Fast Multipole
disqus: 'y'
---

We are most interested in those kernel independent methods, and so far, we are aware of two mainstream methods, one is ``KIFMM``, the other is ``BBFMM``.

They have very similar structure(upward pass, downward pass) of algorithm and exact the same data interaction, we call these common steps ``M2M``, ``M2L``, ``L2L``, by building a ``kd-tree``, with each leaf node containing at least $s$ particles. The brief algorithm is described as

``` python
# build tree(partly) involves S2M, M2M two parts.
def upwardPass(node)
  # postorder traversal
  if node.particles <=4 * threshold:
    # it is at leaf
    S2M(node)
  else:
    # not leaf
    divide(node)
    for i in xrange(4):
      upwardPass(node.child[i])
    M2M(node)
```

``` python
# downPass involves M2L, L2L.
def downPass(node)
  # preorder
  if node.isLeaf:
    L2L(node)
    # U List
    L2P(node)
    # put current data into correct spots
    processData(node)
  else:
    # V List
    M2L(node)
    # preorder traversal
    for i in xrange(4):
      downPass(node.child[i])
```

The algorithm is trivial with understanding of the information flow, however, we are particular interested in the core idea.

- ``KIFMM``

  It bases on potential theory in harmonic analysis, or simply Green's formula for second order operator like Laplacian. Second order PDE always has unique solution for exterior and interior boundary value problem, which means, the kernel must obey harmonic property, inside information must be equivalent(can transform to each other) to information on surface.

  This makes the algorithm very effective if the kernel is fundmental solution of second order PDE, because, using a few points on surface will total be equivalent to all nodes inside the grid.

  However, the limitation is also obvious, it can only work under the second order PDE, because the equation must have the potential property, that outside information can be calculated through following boundary integral, since the source is inside $\Omega$, it is a homogeneous exterior boundary value problem, solution should be something like

  $$u(x) = \int_{\partial\Omega} K(x, y) \psi(y)$$

  If the kernel does not fit the potential theory framework, this method does not work anymore, surface/boundary value cannot be used for the evaluation of the solution merely.

- ``BBFMM``

  This is method is something general, but requires more time on solution for special problems, since interpolation methods always need redundant interior data, this method actually is doing expansion of the kernel into small decoupling products.

  $$K(x, y) \sim \sum_{k=1}^N c_k S_k(x)T_k(y)$$

  Currently, there are some polynomial based $S_k, T_k$ such as Chebyshev and Lagrange, providing cut-off residue as higher ordered terms.

  We are more interested in selecting appropriate basis $S$ and $T$ such that

  $$\min \|K(x, y) - \sum_{k=1}^N c_k S_k(x)T_k(y)\|_{L^p(\Omega\times \Omega)}$$

  since in discretized model, this turns out to be

  $$\min\max_i | \sum_j K(x_i, y_j)\phi_j -\sum_{k=1}^N c_k S_k(x_i)\sum_j T_k(y_j)\phi_j| $$

  we observe that once the functions are found, the cost will be $\mathcal{O}(N n)$. It is quite straightforward to see Fourier transform is an example, but only good for fluctuation kernel, for smooth case, polynomial could be good approximation with good performance in accuracy. Thus if we are facing some unknown kernel or something other than second order PDE, ``BBFMM`` is somewhat a first choice for the first try.
