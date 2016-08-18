---
layout: post
title: Faster Codes I
disqus: y
---

When we are coding in ``MATLAB``, what kind of performance is expected ? Comparable to ``C`` or ``Java`` ?

It is known that many frequent used routines are compiled into ``MATLAB`` system library or toolbox, they are written with ``MATLAB`` interface ``mxFunction``, but calling these functions are also bringing some overhead, there is no way to avoid it.

Writing a time-costy naive routine in ``MATLAB`` script will be still the most inefficient thing, even it is faster than before, but much slower than mainstream numerical programming languages.

- cache friendly

  _declare before use_.

  When data is produced and not used after, the operation part in memory will read a full cache line and modify the appropriate data. This slows down the code when large data structure scatters the data over cache-line, causing refreshing the cache lines at the same time.

  compiler is designed to avoid this using write-combine.

  quoted from Wikipedia:
  >Write combining is a computer bus technique for allowing data to be combined and temporarily stored in a buffer — the write combine buffer (WCB) — to be released together later in burst mode instead of writing (immediately) as single bits or small chunks.

  >Write combining cannot be used for general memory access (data or code regions) due to the weak ordering. Write-combining does not guarantee that the combination of writes and reads is done in the expected order. For example, a Write/Read/Write combination to a specific address would lead to the write combining order of Read/Write/Write which can lead to obtaining wrong values with the first read (which potentially relies on the write before).

  >In order to avoid the problem of read/write order described above, the write buffer can be treated as a fully associative cache and added into the memory hierarchy of the device in which it is implemented. Adding complexity slows down the memory hierarchy so this technique is often only used for memory which does not need strong ordering (always correct) like the frame buffers of video cards.

There are many intrinsic instructions operates on the cache line. For example, quoting from intel's documentation.

```
void _mm_stream_pd(double *p, _m128d a)
```

will store the data ``a``, which is 128bit long double to some aligned address ``p``, that is 2 doubles at one time. (AVX can operates 4 doubles at one time). However, if the cache line containing ``p`` is already in cache, then cache will be updated.

- unroll loops

  unrolling loops is not making loops faster, it just utilizes the cache line. Suppose we have an array of ``double`` to loop with, we can see there are ``CACHE_LINE_SIZE/sizeof(double)`` doubles in one line. Then operates on them at the same time would be much faster using WCB.

  But the speed up is **not** linear, it is normal to see a 2x with 8x unrolling. The unrolling factor varies from platform to platform, on the lastest Haswell, using ``-mavx`` flag, the unrolling factor of 10 is found to be best, since FMA latency is 5 on Haswell with double-issue each cycle.

- avoid excessive unrolling

- libraries packing

- static linking vs dynamic linking and ``-fPIC``

- ``simd``

  Modern compilers like ``icpc`` already utilize ``simd`` as possible as it can, we can always find it faster than optimization by hand, generating effective machine codes. Also, there is a newcomer ``ispc`` compiler to automatically make vectorization.

- external libraries

  Libraries like ``BLAS`` and ``FFTW`` are great efforts by a lot of experts, use them instead cook up a new one.
