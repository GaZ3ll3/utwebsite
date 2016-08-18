---
layout: post
title: Advices on Matlab
disqus: y
---

As almost everyone uses MATLAB(After 2009b), I think there are some things to write down.

- Use built-in commands instead of cooking up one yourself

You guys already programmed Strassen, it is faster than usual \\(O(n^3)\\) time complexity, since it trades
expensive(why?) floating-point multiplication with cheap additions. Why don’t we use it? You might
have noticed, Strassen is a memory killer, it takes almost \\(O(n^2)\\) extra space, but our usual method mtimes
takes \\(O(1)\\). Many built-in commands are very handy and fast, and faster than your naive implementation
such as ``ldivide``, ``svd``, ``eig``, etc.

- MATLAB is slow, unless you are doing pure matrix computation(in a correct way)

You might have heard of some stories about how terribly does MATLAB work on “loops”, in many cases,
if you do not vectorize your algorithm manually, then it could be up to years until MATLAB is no longer
“busy”. However, working with “mex” requires a lot of self memory management and maybe there is
some possible library problem if your MATLAB uses a out-dated one and your system uses a different
one. Fortunately, there is something that MATLAB is pretty fast with and good at -- Matrix computation,
highly optimized and parallelized. So if you are going to use a large “loop” with MATLAB, please think
if there is another way out.

- Please use ``sparse`` if the matrix is sparse

When your target matrix is sparse, say tri-diagonal or penta-diagonal, it is much more convenient to
use it as a sparse one instead of using it as a full one. Full matrix stores redundant zeros and slows
down computation. Sparse matrix class has its way to handle all common computations. Furthermore,
MATLAB possibly will ring a warning if you are assigning values, that could be a slow indexing process.
If you want to be fast, use standard way to build/create a sparse matrix. You may look up(type help
sparse) usage of sparse in MATLAB.

```matlab
S = sparse(A)
S = sparse(i,j,s,m,n,nzmax)
S = sparse(i,j,s,m,n)
S = sparse(i,j,s)
S = sparse(m,n)
```

- Be careful about allocation overhead

Though it won’t be a big problem, since MATLAB has its memory management to handle it. Inside
MATLAB environment, it is pass-by-value, but all operations are actually pass-by-pointer -- ``mxArray*``,
and involves allocation for output. So when you are using something like ``A(i : j, m : n)``, you are making a
shallow copy, which could be dangerous if the sub-matrix is too large. Another example, solving ``Ax = b``
by using ``x = A \ b``, not by ``x = A ^(-1)*b`` or ``x = inv(A)*b``, that will take more time and more space.
So, if you are simply creating some small arrays, then just go and do it, while when it involves too much
memory allocation/reallocation which is not necessary, find another way out.

```matlab
A = rand(5000, 5000);
b = rand(5000, 1);
tic; x = A\b; toc;
tic; x = A^(-1)*b; toc;
tic; x = inv(A)*b; toc;
```

```
Elapsed time is 2.441786 seconds.
Elapsed time is 6.760536 seconds.
Elapsed time is 6.734927 seconds.
```

- Row or Column

C/C++ is row-majored, but MATLAB/Fortran is column-majored. So when looping over a matrix, be
sure you are following the comfortable way.

```matlab
tic;
for i = 1:5000
sum(A(i,:));
end
toc;
tic;
for i = 1:5000
sum(A(:,i));
end
toc;
```
```
Elapsed time is 0.117392 seconds.
Elapsed time is 0.057798 seconds.
```

- Think about how to optimize your program

Do you find your code slow? Why is it slow? which part consumes the most time?
Is there a way to reduce consumed space ? Sometimes, the diagonal is just repeating the same number.
Sometimes, you do not even have to use/store matrix or sparse matrix, element-wised for-loop might be
faster(usually it is not).
Is there a way to vectorize? Is there a way to use matrix operation instead of element-wise operations,
such as ``kron``?
