---
layout: post
title: Coding with Sparse Matrix
disqus: 'y'
---

The difficulty in handling sparse matrix in coding is always underestimated. In ``MATLAB``, there is nothing extra to do with sparse matrix, because the software has taken care of it. For other languages like ``C++``, a fast and robust sparse matrix library is quite necessary for radiative transport equation, since each ray-tracing forms a extremely sparse matrix. And it will involve intense additions for sparse matrices.


There are several popular libraries for sparse matrix operations. ``csparse`` is one of it, using traditional ``CSC`` or ``CSR`` format to store the matrix.

TO BE CONTINUED.
