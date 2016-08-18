---
layout: post
title: Back/Slash
disqus: y
---

Solving linear system with Matlab could be easy with ``\`` or ``mldivide``, and at least faster than naive implementation without ``LAPACK`` or ``MKL`` support. The accuracy is reasonable, but we know that ``mldivide`` actuallly is LU decomposition, it uses [``UMFPACK``](http://www.suitesparse.com) method and designed for _unsymmetric_ matrices, however, its performance is not as good as many direct solvers when dealing with large matrix.

``MKL`` is shipped with an old version of ``pardiso``, but still very fast. However, combination of ``pardiso`` with Matlab is not easy, the official package of the Matlab interface does not work on _2014b_.

``MA57`` is alternative for _symmetric_ direct solver. It is fast and provided an easy-install interface for Matlab.

However, usually we are not using Matlab to solve super large system, thus it does not matter which direct solver is used. Another thing to mention is the ``AMG`` solvers.

``PyAMG`` has a reader-friendly core source code in C, however, port it from Python to Matlab is not an easy job, since there is not any sparse matrix support with Python-Matlab interface yet. Other tools did not give a straight-forward method either.

``AGMG`` has nice performance against Matlab's ``\`` method. It could be obtained upon request. Also, it provides a MEX-Fortran interface and easy to use.

``HSL MI-20`` is also ``AMG`` solver, it is slower than other ``AMG`` solvers and uses ``pcg`` as a iterative solver.

``MUMPS`` does a great job if running sequentially, parallel(distributed) computing will cause segment fault.

``Pardiso`` is a powerful direct solver, some records showed that it was more stable and faster than any other solvers. The solver is only free for academic uses.

When compiling those codes against MEX, the rule is: keep library consistent with each other, Matlab may load out-of-date library when starting. Use ``!ldd`` and ``ldd`` to see whether the libraries match.

p.s. ``multithreading`` is supported in Matlab, it is possible to use ``pthread`` at low level programming or use ``OpenMP`` instead.
