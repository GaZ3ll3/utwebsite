---
layout: post
title: Wave Equation II
disqus: y
---

This post mainly talks about the wave equation.

$$u_{tt} - c^2(x) \Delta u = f(x ,t)$$

with some boundary condition. I originally includes some mathematical formulation in the post, but after all I found that is a stupid idea to write a detailed mathematical post. All I want to do is to state something that is important and help me, maybe some readers to remember the idea. I plan writing another post introducing my writing's purpose.

------
In this post, I mainly introduce the ``exact control`` idea. For inverse problem, exact controllability is something helpful, especially with theory on recovering and also providing a way to reconstruct. J.L.Lions did a lot of work on this area, written a book with 2 volumes on this topic, which is called [Contrôlabilité exacte, perturbations et stabilisation de systèmes distribués](http://www.amazon.com/Contr%C3%B4labilit%C3%A9-perturbations-stabilisation-syst%C3%A8mes-distribu%C3%A9s/dp/2225814775). There are lots of papers on this topic also. A good begin is Vilmos Komornik's [Exact Controllability and Stabilzation. The multiplier method](http://www.pg.im.ufrj.br/verao_arquivos/komornik1.PDF). This book includes "Hilbert Uniquesnes Method", which was introduced by Lions.

>``HUM`` is based on uniqueness theorems which leads to the construction of suitable Hilbert spaces of the controllable spaces. It is related to a duality theory of Dolecki and Russell. The spaces may often be characterized by using multiplier method.

OK, what is ``exact control`` problem, it is a question about existence of a kind of control.

#### Exact Control

If the time dependent equation
$$u_{tt} + A u = 0$$
with Cauchy initial condition. Also consider there are some boundary conditions on $\partial\Omega$. Is there a control $v$ such that the solution $u(v)$ depends on $v$ and also vanishes at $T$:

$$u(T; v) = u'(T; v) = 0$$

#### HUM
