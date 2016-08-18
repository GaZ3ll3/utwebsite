---
layout: post
title: Mex Coding III
disqus: y
---

#### MEX PARALLEL

As we talked about, shared memory system will benefit some speedup with parallel computing. MPI is unacceptable for most cases, there are too much overheads.

* ``pthread``

Low level programming, use extensive ``mutex`` for multithreading.  

* ``OpenMP``

Ready to use and easy to integrate. Remember to add ``-fopenmp`` during comp

#### ACCESS DATA

All data exchange has to be done via its internal format ``mxArray*`` or ``mxArray-tag``, it holds all information of the data, such as ``class``, ``size``, ``address``, ``real``, ``complex`` and so on. Matlab provides almost all ``get`` methods which are defined in ``matrix.h``. Once there was a ``headerdump`` on _fileexchange_ to find out exact data of object in Matlab, but the format of ``mxArray`` changes along versions, it does not work anymore unless modifying it.

#### PROFILING

``tic/toc`` is not exact, using ``profiler`` would be better. Put ``clock()`` in code will also work.

#### MEX VS. LOADLIBRARY

I sometimes experienced hard time with porting codes into MEX domain. It is quite annoying to encounter various problems with internal problem with compiling codes against MEX. However, if I have my ready-to-use codes already built with some library, it is much easier to wrap all things I need to do in pure C/C++ and use ``loadlibrary`` as a workaround, porting time could be a loss but also could be negligible in most cases.

#### Problematic ``-lmwblas`` and ``-lmwlapack``

I had a tough time on compiling ``pardiso`` interface with Matlab, the manual solution provides me linking options as Matlab uses. However, ``pardiso`` has been upgraded to version ``5.0.0``, it no longer supports the old fashioned codes, and could produce errors like ``MKL Error``.

If compiling ``pardiso`` with MEX support, using ``-lblas`` and ``-llapack`` is fine with compiling process, but would get you crash with Matlab. To overcome the problem:

* preload ``lapack`` before starting Matlab.

is the only solution I have found. Be careful, ``lapack`` preloading is the only thing needed, ``blas`` is not very important here. The side effect is other functions depending on ``lapack`` maybe get lagged. Especially ``eig``, ``lmwlapack`` version is ``~2x`` faster than ``apt-get`` version of lapack.
