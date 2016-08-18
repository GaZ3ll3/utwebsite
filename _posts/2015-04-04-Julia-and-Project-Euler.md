---
layout: post
title: Julia and Project Euler
disqus: y
---
It has been a long time since last solved problem on PE. I was using ``C++/C`` for most small integer(``long long``) number problems, and use ``Python`` for ``BigInt`` operations, including the built-in ``pow`` function.

However, it is exhausting to shift from language to language. Python is too slow, C++ is not friendly with ``BigInt``, even with ``boost`` or simply ``GMP``, it is still consuming time.

Maybe, Julia is a remedy, it has some performance advantage over Python on pure arithmetic operations, also it provides elemental number operations like ``pow`` and ``mod``, also has ``GMP``. It would be easy to port codes into Julia, if the user is familiar with Python and Matlab.
