---
layout: post
title: Explore Python
disqus: y
---

I looked at the [trunk](http://svn.python.org/projects/python/trunk) of ``Python``, found a few interesting old ``.txt`` files instead of ``.c`` files.

One of them is ``listsort.txt`` or so-called ``timsort`` appears in ``Python v2.3`` first. Maybe I can write more posts on those ``.txt`` files later.

## TimSort
Various languages have implemented or rephrased ``timsort`` including ``Java``, ``Julia``, ``Python``, ``Octave``, etc.

In ``timsort``, it is necessary to declare the ideas.

* ``timsort`` is nothing more than a modified ``mergesort``

 so we should expect its performance at ``O(nlog n)`` at worse case to match the performance of traditional ``mergesort``.

* comparisons are extremely expensive than moving/swapping elements.

  it is quite true that for those dynamic languages, comparing two elements is very time-costing without some type inferring(like ``numba``). For ``Python``, comparing two objects will involve type checking and value checking at least.

* ``mergesort`` does not appreciate imbalanced merge

  Think about ``mergesort`` of two sorted list ``A (len = 5000)`` and ``B (len = 5)``, traditionally, we locate the location of elements of ``B`` in ``A``, that is typically ``log n`` in average using binary search, if the list ``A`` is long, searching would be very expensive and in return we only get 5 more elements merged, with a lot of efforts.

* small case trade-in performance

  ``mergesort`` will eventually get into some trivial case of only a few elements to be sorted, and in small case, ``mergesort`` is worse than many other methods, like ``insert`` or ``qsort``.

And ``timsort`` is created to solve/implement the above problems/questions/ideas.

In order to avoid getting annoyed by meaningless comparisons, there is a concept called ``run``, which represents a block of elements which are already sorted(either way).

  When the data is random, it is hopeless to observe a long ``run``, very likely
  each run will only consists of two or three elements only, not very effective if we directly use them in ``mergesort``. We need to make each ``run`` long enough. Whenever ``timsort`` gets a small ``run``, it will automatically augment it to a fixed size ``minrun`` using any stable sorting algorithm should be fine, ``timsort`` uses insertion sort to put elements one-by-one into the previous ``run``, each insertion will perform a binary search, minimize the comparisons but maybe will get some cache effect when moving elements backwards.

Now we are clear that there are at most ``N/minrun`` runs to merge, each run is a range of sorted elements, if reverse ordered, we probably will correct it.

### How to set ``minrun``

``minrun`` is created by insertion sort, it is also necessary to set appropriate ``minrun`` to maintain the balance when merging, and to avoid cache effect (large ``minrun``). ``timsort`` uses a dynamic way to generate the ``minrun``.

``` c
int minrun(int n)
{
  assert (n >= 0);
  int r = 0;
  while ( n >= MIN_MERGE)
  {
    r |= (n & 1);
    n >>= 1;
  }
  return n + r;
}
```
If we choose ``MIN_MERGE`` as a power of 2, say 32,  then this program simply truncates ``n`` to its first 5 bits and plus 1 if the rest bits are non-zero.

### How to merge

Now we are stacking the ``run``s in a pre-defined stack/array. In order to avoid imbalanced merge, we must follow some rule.

``timsort`` requires invariant satisfies

``` c
stack[n - 1] > stack[n] + stack[n + 1]
stack[n] > stack[n + 1]
```
But it has been proved this __cannot__ ensure the invariant be sustained along the stack, and it has been pointed out that using 4 elements on stack is enough

``` c
stack[n - 1] > stack[n] + stack[n + 1]
stack[n - 2] > stack[n - 1] + stack[n]
stack[n] > stack[n + 1]
```

if these inequalities fail, it will trigger a merge of two short immediate runs, after a merge is fulfilled, hopefully the inequalities cannot hold on anymore and get a chain of merges.

### Merge two runs

``timsort`` does not use in-place merge, so it would be easy if a copy of shorter list is allowed.

### Galloping

That is a faster version for longer(``MIN_GALLOP``) merge when comparisons are non-trivial. Since two runs are sorted, say ``A`` and ``B``, we can compare ``A[0]`` with ``B[0]``, ``B[1]``, ``B[3]``, ``B[7]``, ...``B[2**n - 1]``, and get a lower bound and higher bound for ``A[0]``.  Then binary search between the bounds, it is much more effective when a lot of linear comparisons should be applied.
