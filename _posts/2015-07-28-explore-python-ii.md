---
layout: post
title: Explore Python II
disqus: y
---

Rather than talking about the sorting algorithm, we probably should write our own version.

Then main function shall be (if in a typical ``c `` way)

``` c
typedef int (compar *)(const void *, const void *);
timsort(void *base, size_t len, size_t size, compar c)
```

main frame of the function is (ignoring invalid implicit conversions of pointers)

``` c
if (len < 2) return;
if (len < MIN_MERGE) {
  size_t init_run_len = countRunAndMakeAscending(base, len, c);
  binarysort(base, len, init_run_len, c);
  return;
}

size_t min_run = minRunLength(len);
char* cur = base;

do {
  size_t run_len = countRunAndMakeAscending(cur, len, c );
  if (run_len < min_run){
    size_t force = min(len, min_run);
    binarysort(cur, force, run_len, c);
  }

  push_run (cur, run_len);
  merge_collapse();

  cur += run_len;
  len -= run_len;

} while(len != 0)

merge_force_collapse();
```
We need to implement following functions:

- ``int countRunAndMakeAscending(void *, size_t, compar )``
- ``void binarysort(void *, size_t ,size_t, compar) ``
- ``void push_run(void *, size_t) ``
- ``void merge_collapse()``
- ``void merge_force_collapse()``

``` c
int countRunAndMakeAscending(void *base, size_t hi, compar c)
```
``` c
void push_run(void *, size_t)
```

are simple.


The key is ``binarysort`` and ``merge_collapse``.
- binarysort only is activated if current ``run`` is not long enough, and has to be manually inserting elements behind the sorted array into the ascending sequence. A typical ``binarysort`` should like

``` cpp
void binarysort(TYPE *base, size_t lo, size_hi, size_t start, size_t size){
  if (start == lo) start ++;
  for (;start < hi; start++){
    left = 0;
    right = start;

    while(left < right) {
      mid = (left + right ) >> 1;
      // to illustrate, we don't use void* here
      if (base[mid] < base[start]) {
        right = mid;
      }
      else{
        left = mid + 1;
      }
    }

    n = start - left;
    /*
     * move the memory here
     */
  }
}
```

and

``` c
void merge_collapse()
{
  // check n > 0, run[n - 1] >= run[n] + run[n + 1]
  // check n > 1, run[n - 2] >= run[n - 1] + run[n]
  // check n > 0, run[n - 1] > run[n]
  // otherwise, merge the shorter two runs among the top 3 runs.
}
```
