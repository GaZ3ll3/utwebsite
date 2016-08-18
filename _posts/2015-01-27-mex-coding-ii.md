---
layout: post
title: Mex Coding II
disqus: y
---

Using ``mexplus`` to port C++ program to Matlab is easy. Follow the instructions from the [webstie](https://github.com/kyamagu/mexplus) of ``mexplus``.

#### Parallelized Coding

Before _2014b_, there was a famous [bug](http://stackoverflow.com/questions/19268293/matlab-error-cannot-open-with-static-tls) with ``omp``, which is quoted as

>That's bug _No.961964_ of MATLAB known since R2012b (8.0). MATLAB dynamically loads some libs with static TLS (thread local storage, e.g. see gcc compiler flag -ftls-model). Loading too many such libs gets no space left.

However, the problem with ``libomp5`` has been fixed by applying another version of the library from [MathWorks](http://www.mathworks.de/support/bugreports/961964), other problems might not have been fixed.

Back to our coding problem, since MEX API are _not_ thread safe, it is not a good idea to call any of the API functions within parallelized block, quoted from [here](http://www.walkingrandomly.com/?p=1795).

The best way I suggest is to write helper function to do all the math and just pass them through the API, calling Matlab by [``mexCallMATLAB``](http://www.mathworks.com/help/matlab/apiref/mexcallmatlab.html) inside ``omp`` blocks will not benefit anything.


#### In-place Editing

The following comments are quoted from [undocumentedmatlab](http://undocumentedmatlab.com/blog/matlab-mex-in-place-editing).

As mentioned, in-place editing is not officially supported with MEX yet. Supposing ``some_function`` will modify input data in-place.

The __safe__ copy-then-work model is:

``` c
void mexFunction(int nlhs, mxArray* plhs[], int nrhs, const mxArray* prhs[]) {
  mxArray *input_copy = mxDuplicateArray(prhs[0]);
  // allocate some memory for plhs here...
  plhs[0] = some_function(input_copy);
}
```

Usually a deep copy of the array won't be necessary if we do not need to maintain the input.

``` c
void mexFunction(int nlhs, mxArray* plhs[], int nrhs, const mxArray* prhs[]) {
  // allocate memory for plhs ...
  plhs[0] = some_function(const_cast<mxArray *>(prhs[0]));
}
```

But in the post mentioned before, this programming style will mess up with Matlab's _copy-on-write_ mechanism.

Matlab is lazy on copying, unless it detects you are really modifying the copy or original data, it won't do the copy process, that means whenever we are calling something like

```
a = rand(5, 1);
b = a;
a(1) = 0.;
```

First, ``a`` is created on heap, then ``a`` actually just got passed to ``b`` by __reference__. ``b`` does not take up any memory at this time, then we changed ``a``, Matlab is aware that ``a`` and ``b`` are independent now, thus it would create a copy of ``a`` to ``b`` at this time.

Similarly, if we cook up a mex-function ``some_function`` with the ``const_cast`` trick, then

``` matlab
a = rand(5, 1);
b = a;
some_function(a);
```
If ``a`` is changed, then ``b`` definitely will be changed, since when we try to modify the data of ``a``, Matlab does not know about it, MEX would not tell Matlab whether the input has been modified or not. That is the difference.

And how to avoid messing up the copy-on-write? We need some _undocumented_ functions:

``` c
extern "C" bool mxUnshareArray(mxArray *array_ptr, bool noDeepCopy);

void mexFunction(int nlhs, mxArray *plhs[], int nrhs, const mxArray *prhs[]) {
   mxUnshareArray(const_cast<mxarray *>(prhs[0]), true);
   plhs[0] = some_function(const_cast<mxarray *>(prhs[0]));
}
```

We need to declare the function ``mxUnshareArray`` since it literally does not exist in document, but its symbol exists.
