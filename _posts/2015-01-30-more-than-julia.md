---
layout: post
title: More than Julia
disqus: y
---

[``Julia``](https://github.com/JuliaLang/julia) is regarded as one of most promising scientific programming languages recently. Its syntax is similar to Matlab and performs well on numerical computing.

Since ``Julia`` also has JIT technique, it is faster than Python+Numpy and only 2~3x slower than C, if everything is programmed in a decent way.

I was lucky to know this language when it was still at baby step, and I occasionally found a benchmark on the performance over Matlab which uses ``while`` loops and ``for`` loops everywhere, however, it still showed its capability on computing. It is also worthy to observe the summation ``for`` loops with ``pisum`` in its [benchmark](http://julialang.org/benchmarks/), it has a comparable speed with ``-O3`` switched-on C program, which means Matlab already has a JIT to optimize ``for`` maybe nested ``for``.

Like Matlab's MEX interface, ``Julia`` also can use ``ccall`` for calling from shared library, which would be a easy hack on porting codes to ``Julia``, but as far as I know, only C base types including ``struct`` can be converted forward and backward, C++ still is _not_ supported officially.

For packages, community has contributed a lot, especially in optimization and data science, statistics and so on, but unfortunately, a large portion of the existing packages do not have sufficient support and maintenance.


We quoted from ``Cpp.jl``

>Julia can call C code with no overhead, but it does not natively support C++. However, the C++ ABI is essentially "C plus some extra conventions," of which the most noteworthy is name mangling. Name mangling is used to support function overloading, a key C++ (and Julia) feature. Infamously, different compilers use different mangling conventions, and this has lead to more than a few headaches. However, in recent years there has been a greater push for standardization of the C++ ABI, and there is good documentation available on calling conventions of different compilers.

In order to get C++ codes working with Matlab as well as ``Julia``, we probably have to use ``Cpp.jl`` to generate mangled names or simply declaring ``extern "C"`` in order to disable name mangling.

```cpp
#ifdef __cplusplus
extern "C"
#endif
void some_function(...);
```

```cpp
#include "header.h"

void some_function(...) {
  //C++ codes here.
}

```

compile with ``gcc`` but linking against C++ library as ``lstdc++``, or simply use ``g++``.

``` bash
gcc -c -fPIC libsome_func.o
gcc -shared -o libsome_func.so -lstdc++
```
