---
layout: post
title: Bsxfun And Faster
disqus: y
---
Matlab introduces ``bsxfun`` (binary singleton expansion) since 2007, which made matrix-vector operation easier when the vector is going to be applied to each row.

In fact, ``bsxfun`` works with all binary operations, if it needs to be done element-wisely.

Usually, when ``mxArray A`` and ``mxArray B`` are going to take operation ``op(A, B)``, but the dimension does not match, it might need ``repmat`` to reallocate memory.

``` matlab
>> a = rand(40);
>> a - mean(a); % matrix - vector, error
Error using -
Matrix dimensions must agree.
```

```matlab
>> a = rand(40);
>> bsxfun(@minus, a, mean(a)); % runs fine
```

Refer to [official site](http://www.mathworks.com/help/matlab/ref/bsxfun.html).

>``fun`` can also be a handle to any binary element-wise function not listed above. A binary element-wise function of the form ``C = fun(A,B)`` accepts arrays ``A``and ``B`` of arbitrary, but equal size and returns output of the same size. Each element in the output array ``C`` is the result of an operation on the corresponding elements of ``A`` and ``B`` only.

>The corresponding dimensions of ``A`` and ``B`` must be equal to each other or equal to one. Whenever a dimension of ``A`` or ``B`` is singleton (equal to one), ``bsxfun`` virtually replicates the array along that dimension to match the other array. In the case where a dimension of ``A`` or ``B`` is singleton, and the corresponding dimension in the other array is zero, ``bsxfun`` virtually diminishes the singleton dimension to zero.

>The size of the output array ``C`` is equal to:
``max(size(A),size(B)).*(size(A)>0 & size(B)>0)``.

This technique vectorizes the binary operation, and skip the overhead of allocation of memory as ``repmat`` does.
