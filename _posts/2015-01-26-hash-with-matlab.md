---
layout: post
title: Hash with Matlab
disqus: y
---

When writing some program involving ``search`` function, matching the element within a data structure would take a long time if this is not done in a decent way.

- For multidimensional array, searching a element would take \\(O(N)\\) time complexity in average. If sorted, then time would be reduced to \\(O(\log N)\\), however, it is still not optimal under some cases, especially when we have redundant memory and fast IO.
- For a set/tree/dict, searching would be more or less faster by taking advantage of structure.

Matlab provides several search functions with hash:

- ``containers.Map``
- ``java.util.HashSet``, ``java.util.HashMap``
- use MEX interface
- use logic matching

#### Containers.Map

The generic method as ``containers.Map`` is built-in and as noted, it is most efficient when stored data is scalar or char.

```
mapObj = containers.Map
mapObj = containers.Map(keySet,valueSet)
mapObj = containers.Map(keySet,valueSet,'UniformValues',isUniform)
mapObj = containers.Map('KeyType',kType,'ValueType',vType)
```
and following is quoted from ``Map.m``:

```
myMap = containers.Map('KeyType', kType, 'ValueType', vType)
```
 constructs a ``Map`` object with no data that uses a key type of ``kType``, and a value
type of ``vType``.

Valid values for ``kType`` are the strings: ``'char'``,
``'double'``, ``'single'``, ``'int32'``, ``'uint32'``,`` 'int64'``, ``'uint64'``.

Valid values
for ``vType`` are the strings: ``'char'``, ``'double'``, ``'single'``, ``'int8'``, ``'uint8'``,
``'int16'``, ``'uint16'``, ``'int32'``, ``'uint32'``, ``'int64'``, ``'uint64'``,`` 'logical'``, or
``'any'``.

_The order of the key type and value type arguments is not
important, but both must be provided_.

#### Java workaround

``Map`` structure from Java is ``java.util.HashMap``. At Matlab _2014b_, this method has almost the same performance as ``containers.Map``, since ``containers.Map`` is actually a scaled-down implementation of ``java.util.HashMap``.

``` matlab
% construct map
cm = containers.Map(1:100000,rand(1, 100000),'UniformValues',true);

tic;
for i = 1:100000
  cm.isKey(i);
end
toc;

% construct map
jm = java.util.HashMap;
for i = 1:100000
  jm.put(i, rand(1));
end

tic;
for i = 1:100000
  jm.containsKey(i);
end
toc;
```

``` matlab
Elapsed time is 4.141781 seconds.
Elapsed time is 3.769957 seconds.
```

#### Mex with ``mexplus``

Use C++ to wrap ``unordered_map`` for all basic types would be more than enough. At mexplus level, implement all necessary wrapper functions such as ``add``, ``remove``, ``hasKey``, etc, then port them into Matlab class. Note: using ``std`` will not be thread safe. The ``java.util.HashMap`` is thread safe.

#### Logic matching

The slowest approach. using logic expression for searching/matching. Not recommended if dealing with large data set.
