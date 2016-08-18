---
layout: post
title: OpenMP transport
disqus: y
---

In the post on numerical transport, we already have seen the simple algorithm on ray-triangle intersection to calculate the integrals. We already have made OpenMP running to save our time on building up the intersection. However, our previous implementation has not used all the resources.

My first implementation on the algorithm originally:

``` cpp
unordered_set<int32_t> visited;

for (int32_t i = 0; i < numberofelem; i++) {
  for (int32_t j = 0; j < numberofnodesperelem; j++){

    vertex = pnodes[i * numberofnodesperelem + j] - 1;

    if (visited.find(vertex) == visited.end()) {
      visited.insert(vertex);
      /*
       * ray triangle tracing here.
       */  
    }
    else {
      continue;
    }  
  }
}

```

With trivial parallelism, we want each thread handle specific group of the vertices. That makes some threads **waiting**.

```cpp
unordered_set<int32_t> visited;

#pragma omp parallel private(...) num_threads(4)
for (int32_t i = 0; i < numberofelem; i++) {
  for (int32_t j = 0; j < numberofnodesperelem; j++){
    // add tid to control thread
    tid = omp_get_thread_num();

    vertex = pnodes[i * numberofnodesperelem + j] - 1;

    if (not_match(vertex, tid)) continue;

    if (visited.find(vertex) == visited.end()) {
      visited.insert(vertex);
      /*
       * ray triangle tracing here.
       */
    }
    else {
      continue;
    }
  }
}

```
After some research, we know we need some dynamical mechanism to allocate thread to task, from stachoverflow, I found an idea.

``` cpp
unordered_set<int32_t> visited;

omp_lock_t lock;
omp_init_lock(&lock);

#pragma omp parallel private(...) num_threads(4)
for (int32_t i = 0; i < numberofelem; i++) {
  for (int32_t j = 0; j < numberofnodesperelem; j++){
    // no need to know the thread id

    vertex = pnodes[i * numberofnodesperelem + j] - 1;

    omp_set_lock(&writelock);
    // from now on, all threads do this one by one.
    if (visited.find(vertex) == visited.end()){
      visited.insert(vertex);
      // unlock, free to go.
      omp_unset_lock(&writelock);
    else {
      // unlock, free to go.
      omp_unset_lock(&writelock);
      continue;
    }
    // rearrange the codes here.
    /*
     * ray triangle tracing here.
     */
   }
 }
}
omp_destroy_lock(&lock);
```

The result is good,

```
sequential(1) running: 81 seconds.
parallel(4)   running: 39 seconds.
improved(4)   running: 31 seconds.
```
