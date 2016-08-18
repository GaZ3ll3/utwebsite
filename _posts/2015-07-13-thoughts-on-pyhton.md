---
layout: post
title: Thoughts on Python
disqus: y
---
``Python`` was slow, a few years ago. At that time, it is not a option for massive numerical computing for performance concern.

Now, ``Numpy``, ``Numba``, ``Cython``, ``Pyston``, ``Blaze``, etc. are giving a lot of hope to numerical computing community. Another competitor ``Julia`` is also an impressive language in numerical regime.

Numerics have been made extremely easy with modern JIT techniques, ``MATLAB`` is very fast on usual linear algebraic computing using commercial software and libraries. As ``LLVM 3.x`` has been released, several languages using ``LLVM`` like ``Julia`` has been made fast enough to compete with ``C``, within a factor of 2 or 3.

- ``Julia`` is built with ``LLVM 3.3``, types in ``Julia`` can be omitted and promoted at runtime. However, delaration of types can make program running robust and faster.
- ``Numba`` is built with ``LLVM 3.5(3.6)``, uses JIT,  aiming to transform ``Python``'s bytecode into machine code.
- ``Numpy`` is a low level implementation of various numerics, can be regarded as a replacement of generic Python math library.
- ``Cython`` is more like ``C`` than ``Python`` when the performance is critical, porting ``C`` code to ``Python`` code is made easier using this. Since it is basically running ``C`` program, the performance is secured, if optimization flags are turned on.
- Also, ``Numba`` and ``Cython`` claim they are ``Numpy`` aware, however, ``Numba`` probably cannot recognize all ``Numpy`` routes yet, for those code blocks that it cannot transform, it will maintain the original machine code, which will just as slow as pure Python.
- ``Pyston`` is a project from Dropbox, which is a lot like ``Numba``.

### Numba / NumbaPro
If there is not need to wrap a C/C++ library into ``Python`` module, ``Numba`` would be very convenient to acclerate the code. Now ``Numba`` is at ``version 0.20``, pretty early stage, but very powerful with help of ``LLVM``.

#### Features
- ``@jit`` decorator only, automatically infers types.
- ``@jit(OutputType(InputType_1, ...))`` explicitly indicates the signature of function, if violated, an error would be threw out.
- ``nopython`` force compiling without objects
- ``nogil`` release ``GIL``, would allow concurrency.
- ``@vectorize`` decorator allows operations like ``npufunc``.

#### Supported coding
Simply quote the link from [Supported Python features](http://numba.pydata.org/numba-doc/0.20.0/reference/pysupported.html#pysupported) on pydata's website.

#### OOP
In earlier releases of ``numba``, ``class`` can be applied with ``@jit`` to acclerate all methods, it seems this has been removed, and ``@jit`` is only usable on suitable functions(with ``numba`` types) now.

#### Scipy and Numpy integration
Doubtlessly ``Scipy``(refer to the library not the bundle) and ``Numpy`` are the core of modern scientific ``Python``, the library are mostly written in fast ``c`` and ``fortran``, though not optimized at assembly level. Frontends are written with ``Python`` and inlining some functions with ``weave``. Now ``numba`` can recognize part of ``numpy`` interface.

#### ASM level tuning
LLVM is not the most efficient for sure, sometimes we can observe a performance difference with ``gcc``. If we look at ``mkl`` and ``libm`` as well as ``BLAS``, we will find out, libraries are totally different, they handle different machine codes on different platform, yielding different performance, ``mkl`` can only generate fast codes for ``intel`` based machines **only**.

[TO BE CONTINUED]
