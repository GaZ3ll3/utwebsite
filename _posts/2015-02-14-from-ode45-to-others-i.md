---
layout: post
title: From ODE45 to others I
disqus: y
---

``ode45`` is a popular function within Matlab in each version. It uses explicit Runge Kutta 4(5) as integrator for first order equation:

$$\dot{\xi} = f(\xi, t)$$

``ode45`` has function definition as

{% highlight matlab %}
[t,x] = ode45(@fname, tspan, xinit, options)
{% endhighlight %}

- about ``tspan``

where ``tspan`` is used to control the size of output. The default setting for ``tspan`` with only two elements will enforce integration for the whole domain and output all the tiny time step.

In general, do not output all the things. Large system with long time interval will consume the memory rapidly. Simply insert some interested time steps into ``tspan`` will be efficient for computing, without extra overhead on allocating memory for storage.

- about ``fname``

The usual case for solving ODE is the first order equation stated above. But in some cases, we are more interested in solving
$$M(t, \xi) \dot{\xi} = f(\xi, t)$$

Some solvers do not support variable mass matrix or _singular_ ones.

To apply the solver to this kind of equation, we need to adapt our option through ``odeset``, otherwise default values will be used without any notice.

#### Remark on Error Control

{% highlight matlab %}
% Error Control
% RelTol        1e-3
% AbsTol        1e-6
% NormControl   off

% example
options = odeset('RelTol', 1e-6, 'AbsTol', 1e-8, 'NormControl', 'on');
{% endhighlight %}


The default normal control is off then there is a stringent element-wise condition on error vector, when it is turned on, we only focus on the integral error only, which might be faster, since there will be only one judgment.

#### Remark on Output Properties
{% highlight matlab %}
% Solver Output Properties
% NonNegative
% OutputFcn
% OutputSel
% Refine
% Stats
% example
options = odeset('NonNegative', [], 'OutputFcn', @func, 'OutputSel', [1 3],...
 'Refine', 1, 'Stats', 'off');
{% endhighlight %}


``NonNegative`` indicates which slots of solution must be non-negative, default as ``[]``.

``OutputFcn`` is the callback function handle. Should be called as ``status = f(t, x, flag)``.

- If ``flag`` is ``'init'``, the function calls callback with ``tspan`` and ``y0``.

- If ``flag`` is ``[]``, it continues with normal callback. ``status`` controls the process, whenever ``status`` gives 1, the process stops, otherwise, the ``status`` must be 0.

- If ``flag`` is ``'done'``, the function calls ``f([], [], 'done')``.

``OutputSel`` is the index of solution passed to the callback.

``Refine`` controls the number of integration steps. Since we usually use ``tspan`` with inserted time stamps, ``Refine`` is not useful here.

``Stats`` is not used usually for efficiency purpose.

#### Remark on Mass Matrix Properties

{% highlight matlab %}
% Mass Matrix and DAE Properties
% Mass
% MStateDependence
% MvPattern
% MassSingular
% InitialSlope
% example
options = odeset('Mass', @massfcn, 'MStateDependence', 'weak', 'MvPattern',...
 @mvpatternfcn, 'MassSingular', 'no');
{% endhighlight %}

``Mass`` could be a matrix or a handle, and a handle is more efficient. If the matrix is not singular, then just set ``MassSingular`` as ``no`` to avoid testing. For performance consideration, if the mass matrix is a fixed matrix $M$ and also invertible, then make the equation as
$$\dot{\xi} = M^{-1}(f(\xi))$$
is much better.

In our wave equation, we encountered the case like:

$$M [\dot{\mathbf{u}}, \dot{\mathbf{v}}, \dot{\mathbf{w}}, \dot{\mathbf{z}}] = \mathbf{f}(\mathbf{u}, \mathbf{v}, \mathbf{w}, \mathbf{z})$$

With common setting, it would be written as

$$ p = \left( \matrix{u \\\\
  v\\\\w\\\\z} \right) , \left(\matrix{M & & &\\\\
  & M &  & \\\\
  && M & \\\\
  &&& M}\right)\dot{p} = f (p)$$

Inverting the diagonal matrix is a vain of time, since it only needs to calculate a ``mldivide`` on each time step.

In Matlab, the fastest way I found is doing this, however, the setback is the allocation of space. At each round, $p$ has to be allocated for ``ode45``, on the other hand, we are calculating the component in following way, which means using ``horizcat`` to create a extra copy of the vectors $[u, v, w, z]$, and then copy the left hand side into the output vector.

$$[\dot{\mathbf{u}}, \dot{\mathbf{v}}, \dot{\mathbf{w}}, \dot{\mathbf{z}}] = M^{-1}\mathbf{f}(\mathbf{u}, \mathbf{v}, \mathbf{w}, \mathbf{z})$$

The reason that we do not use ``mldivide`` component-wisely is: **TOO SLOW**, overheads will dominate the computing cost, use ``2.5x`` more time than the other way we used.

------
Quoted from official:

>[ode45](http://en.wikipedia.org/wiki/Dormand%E2%80%93Prince_method) is based on an explicit Runge-Kutta (4,5) formula, the Dormand-Prince pair. It is a one-step solver – in computing $y(t_n)$, it needs only the solution at the immediately preceding time point, $y(t_{n-1})$. In general, ode45 is the best function to apply as a first try for most problems.

>[ode23](http://en.wikipedia.org/wiki/Bogacki%E2%80%93Shampine_method) is an implementation of an explicit Runge-Kutta (2,3) pair of Bogacki and Shampine. It may be more efficient than ode45 at crude tolerances and in the presence of moderate stiffness. Like ode45, ode23 is a one-step solver.

>[ode113](http://en.wikipedia.org/wiki/Linear_multistep_method) is a variable order Adams-Bashforth-Moulton [PECE](http://en.wikipedia.org/wiki/Predictor%E2%80%93corrector_method) solver. It may be more efficient than ode45 at stringent tolerances and when the ODE file function is particularly expensive to evaluate. ode113 is a multistep solver — it normally needs the solutions at several preceding time points to compute the current solution.

>The above algorithms are intended to solve nonstiff systems. If they appear to be unduly slow, try using one of the stiff solvers below.

>ode15s is a variable order solver based on the numerical differentiation formulas (NDFs). Optionally, it uses the backward differentiation formulas (BDFs, also known as Gear's method) that are usually less efficient. Like ode113, ode15s is a multistep solver. Try ode15s when ode45 fails, or is very inefficient, and you suspect that the problem is stiff, or when solving a differential-algebraic problem.

>ode23s is based on a modified Rosenbrock formula of order 2. Because it is a one-step solver, it may be more efficient than ode15s at crude tolerances. It can solve some kinds of stiff problems for which ode15s is not effective.

>ode23t is an implementation of the trapezoidal rule using a "free" interpolant. Use this solver if the problem is only moderately stiff and you need a solution without numerical damping. ode23t can solve DAEs.

>ode23tb is an implementation of TR-BDF2, an implicit Runge-Kutta formula with a first stage that is a trapezoidal rule step and a second stage that is a backward differentiation formula of order two. By construction, the same iteration matrix is used in evaluating both stages. Like ode23s, this solver may be more efficient than ode15s at crude tolerances.

The ``ode45`` is usually the first one to be used for solving ODE with Matlab, while if the local 5th(4th) order accuracy is not the goal, then ``ode113`` is more economic and time-saving, much better than ``ode23``.

```tex
% timing for PML, all of them share the same config.
% only uses [0, 0.5, 1.0] as 3 outputs. That is minimum.
ode45:  234 seconds
ode23:  524 seconds
ode113: 116 seconds
```
