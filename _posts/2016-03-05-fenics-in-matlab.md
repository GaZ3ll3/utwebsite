---
layout: post
title: Fenics in MATLAB
disqus: y
---

Fenics is a known open-source FEM software, it provides C++ and Python interfaces for developers to use. One year ago I tried to make Fenics working in MATLAB using "mex" interface with C/C++, however, this method is not recommended, since it will cause crashes when exiting MATLAB.

The main problem is consistency of libraries between system and MATLAB, we clearly know that there is a dramatical lag in versions of libraries for MATLAB.

The method is listed in [gist file](https://gist.github.com/GaZ3ll3/d508c1ba31a6327247ae).

It includes a working example, Poisson equation. To compile the target, We include all necessary libraries, (ignore those unnecessary ones), and use ``export`` to preload the libraries before MATLAB loads the wrong ones.

This will lead to two problems:

- GUI will not work anymore, since it will load too many libraries.

- Confusing ``double free or corruption`` error when exiting, because the corresponding ``C++`` code can run very well.

update:
The problem is highly likely on ``mpi`` part. To avoid this fatal error, just do not waste time on fixing it.
