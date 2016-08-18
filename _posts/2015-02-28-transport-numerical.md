---
layout: post
title: Transport Numerical
disqus: y
---

To fulfill the algorithm in last post with a general mesh. It requires a ``ray-triangle`` intersection algorithm.

Since we have ``neighbor`` data for each element, there is no need to construct neighborhood data for each node. The idea is to use ``unordered_set`` or ``array`` of ``boolean`` to record visited node to avoid repeating.

- select a ray direction $\theta$.
- visit current element ``e``'s node ``m``, if the node has not been visited, add it into ``visited``.
- From ``m``, along the ray, visit ``e`` 's two(or one) neighbors, add the neighbors into a queue. if the neighbor ``f`` can be reached, then current element is ``f``, pop the queue.
- output the intersection on the element ``f``, continue with next neighbor.

Luckily, this is simple and easy to implement, but it is kind of slow, the judgment on whether a node has been visited takes around $O(1)$ time, that is $O(N)$ in total. Calculating the intersection has time complexity with the number of element which are intersected with the rays, roughly $O(N)$.

The time consumed on a reasonable mesh and ``dom`` will take 70~80 seconds per run with one thread.

If multiple threading is available, then it will take less time with efficiency around 50%.

After finished the intersection part, we already have known all the intersections of rays and mesh. Then according to the formula, we have to calculate the integral along each ray according to the data on nodes, simply use the nodal data will give a first order approximation, and more data nodes will make this result more accurate, but much more slow.
