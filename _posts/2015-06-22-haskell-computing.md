---
layout: post
title: Haskell Computing
disqus: y
---

I am kind of new to ``Haskell``, this language has been there for decades, but I was never a huge fan for _FP_. Lately, _FP_ is a little bit warming up within computational community, ``Julia`` as a new comer , has integrated/borrowed some features from ``Haskell``.

What I concern most is, computationally speaking, _FP_ is suitable, since almost every numerical routine is something reading in and something writing out, in order to make functions **pure**, direct reference is not passed, on the other hand, a new variable will be created on heap and passed by reference.

And the GHC compiler might have it own way to figure out what should be passed by value directly, and what could be created on stack instead.

quoted from other places.
>The only things GHC puts on the stack are evaluation contexts. Anything allocated with a ``let/where`` binding, and all data constructors and functions, are stored in the heap. Lazy evaluation makes everything you know about execution strategies in strict languages irrelevant.

_to be continued_
