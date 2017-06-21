---
layout: post
disqus: 'y'
title: Some Math Background in Biology
---

In terms of biology, here we only focus on molecule level. The molecules/proteins are clusters of atoms with bonds for interactions. The structure of protein could be quite different from each other and topologically complicated. Most structures are detected by X-ray, which is called X-ray crystallography.

Crystals are periodical heterogeneous media under certain conditions. When X-ray passes through crystal, we will get diffraction pattern in 3D using various plane sensors for example. The light propagation is modeled as waves (geometric optics), and scattered by the crystal internal electrons.

The patterns are simply Fourier transform of the density function, however, only magnitudes are captured. We will have to deal with a ``phase recovery problem``, this problem turns out to be an important and interesting topic in signal processing.

When we are aware of the structure of such molecules, for many researchers, they are interested in the deformation of molecules/proteins, these motions of atoms are driven by some force field, computationally, it is called molecular dynamics (MD).

This problem involved highly intensive numerical computing. There are several existing models. Solving Poisson Boltzmann equation is one of the tasks. To evaluate the potential on each atom requires solving the ``PBE``, which is non-linear in general, but there are linear approximation under certain condition. A popular method is to re-formulate as boundary integral equation and solve with fast solvers.

The first kind integral equation is generally ill-conditioned, many researchers are shifting to second kind integral equation by differentiate the integral equation against target locations, however, this integral involves hyper-singular kernel and increase computational for each evaluation of integral.

If we are only interested in solving the problem, there are some direct method for factorization of such dense matrix (HSS), which compresses the matrix with very few information, but without using expensive ``svd``.  While if we are interested in dynamics, then we have to take some extra cost in mind: for mesh dependent methods, re-meshing is necessary during each time step.

For (weakly) singular integrals, when the mesh is changed, those diagonal values (pre-computed quadrature) will be re-computed again. Not mentioning the compression time.

Hence, a more intriguing problem rises as:

Operator $K$ is compressible with some algorithm (e.g. FMM or MG), if there is (global but possibly small) update to $K\to K'$, hopefully $K'$ has higher rank, but still compressible. (in terms of some other basis). Is there a fast algorithm for such update operation.
