---
layout: post
title: Fast Loop
disqus: y
---

Looping within _M file_ is kind of a nightmare years ago, as there was almost no optimization for the loops, however, nowadays, the latest version of Matlab has already made loops faster than before, it seems there is no need with manual vectorization.

It is worth to point out, writing loops within command window environment won't get a lot of fun, since ``JIT`` will not optimize loops there, try to write a script and run, this will automatically call ``JIT`` compiler to optimize codes.

Back to several years ago, there are lots of self-tuned MEX codes using BLAS/LAPACK to overcome the setback of Matlab's for loop pitfall.

I recompiled ``mmx`` and ``mtimesx`` and tested them with our _2014b_ for loop, the result seems that ``for loop`` no longer stays the worst position.

![Comparision](https://www.ma.utexas.edu/users/yzhong/images/post_img/comparison.png)

However, since ``for loop`` on matrix multiplications are using multiple threads, it is still faster when making comparison on usual matrix computations. While when computing operations with ND arrays or ND matrix, ``mmx`` and ``mtimesx`` will give a few multiple of boosts.
