---
layout: post
title: Mex Coding I
disqus: y
---

Using Matlab for quite a long time, now Matlab _2014b_ has already equipped with various programming language support, such as C#, Python 2.7. However, it does not  mean an easy job to stir fry them together.

For scientific programming, we consider the most common ones: C++, Python,  Java(Scala) and Julia.

The lastest version of Matlab has already provided generic interfaces with C++, Python, Java. However, Python's support is limited to version 2.7 without some important types, which might be a huge problem for migrating codes from other platforms.

Limitations for _Python_ support:

-  __Multidimensional arrays__
-  Structure arrays
- Complex, scalar integers or arrays
- __Sparse arrays__
- Logical vectors
- Categorical, table, containers.Map, datatime types
- Matlab objects
- __Function handle__
- meta.class

For Java, [reference](http://www.mathworks.com/help/matlab/using-java-libraries-in-matlab.html):

Since Matlab itself runs inside a JVM, it would provide most generic support for Java, with all access of Java API and can call Java object methods within Matlab, the most important one, passing data would be easy.

In return of easy integration, Java method called from Matlab could have very high overhead before each call, much higher than other [approaches](http://stackoverflow.com/questions/1693429/is-matlab-oop-slow-or-am-i-doing-something-wrong).

Another thing needs to be mentioned is Object Oriented Programming within Matlab, it is slow compared to other mainstream languages, and the overhead cannot be avoid.

For C/C++, Matlab _2014b_ has provided two ways for interacting.

- ``loadlibrary`` inside Matlab console, then ``calllib`` calls function from the library.
-  use ``MEX`` as bridge.

C-MEX interface as

``` c
void mexFunction(int nlhs, mxArray* plhs[], int nrhs, const mxArray* prhs[])
```

While C++ users may create C++ objects and reuse them later by [implementing some wrapper](http://www.mathworks.com/matlabcentral/newsreader/view_thread/278243). In that thread, there are tons of potential dangers with memory leaks. The best way found is to define a class inherits the handle class using ``classdef`` and also implement constructor and destructor within the class.

A reasonable implementation can be found as [mexplus](https://github.com/kyamagu/mexplus).

However, when object is created and wants running its method with ``parfor``, Matlab needs to copy the object for each _worker_ in the pool. The [solution](http://stackoverflow.com/questions/13842893/matlab-parfor-and-c-class-mex-wrappers-copy-constructor-required) shows that marking the handle property as Transient will work and force calling ``loadobj``.

``` matlab
classdef myclass < handle
    properties(SetAccess=protected, Transient=true)
        cpp_handle
    end
    methods(Static=true)
        function obj = loadobj(a)
            a.cpp_handle = rand(1);
            disp(['Load initialized encoder with handle: ' num2str(a.cpp_handle)]);
            obj = a;
        end
    end
    methods
        function obj = myclass(val)
            obj.cpp_handle = rand(1);
            disp(['Initialized myclass with handle: ' num2str(obj.cpp_handle)]);
        end
        % destructor
        function delete(obj)
            disp(['Deleted myclass with handle: ' num2str(obj.cpp_handle)]);
        end
        % class method
        function amethod(obj)
            disp(['Class method called with handle: ' num2str(obj.cpp_handle)]);
        end
    end
end
```

Tested below :

``` matlab
cls = myclass();
parfor i = 1:10
    cls.amethod()
end
```
Result :

```
Load initialized encoder with handle: 0.096779
Class method called with handle: 0.096779
Class method called with handle: 0.096779
Class method called with handle: 0.096779
Class method called with handle: 0.096779
Load initialized encoder with handle: 0.66182
Class method called with handle: 0.66182
Class method called with handle: 0.66182
Class method called with handle: 0.66182
Class method called with handle: 0.66182
Class method called with handle: 0.096779
Class method called with handle: 0.096779
Deleted myclass with handle: 0.096779
Deleted myclass with handle: 0.66182
```
