---
layout: post
title: Time Reversal and PAT
disqus: y
---

The time reversal method works well when the wave speed is known and no attenuation is present, but it requires a long time observation on $\partial\Omega$.

However, it is already known that the observation time must be larger than a minimum $T$, to let all information pass through. And in 2D, the waiting time is much longer than odd dimension due to $\mathcal{O}(t^{1-d})$ decay rate of energy. Thus we do not have enough resources to wait such a long time.

The ending solution does not vanish $u(T, x)\neq 0$, not even close to $0$ maybe. The Neumann series method works here, using an "error" operator.


Take pressure field mapping to measurement as  $A:f\to u(t, \partial\Omega)$, and take time reversal operator $Q: u(t,\partial\Omega)\to u(0, x)$. The error operator is defined as

$$Kf = f - Q(Af)$$

if we take $Af = h$ which is known measurement, then

$$Qh = (I - K)f$$

when $T>T_0$, it is possible to show that $\|K\|<1$, therefore,

$$f = (I-K)^{-1}(Qh) = \sum K^m (Qh)$$

The algorithm is trivial here.

1. calculate time reversal $Qh$ as an initial guess of $f$, let $v = Qh$, $r = Qh$.
2. calculate $w = v - Q A(v)$, $r = r + w$
3. $v = w$ and repeat step 2.

We must see that each iteration consists of one forward and one backward propagation. It will take $\mathcal{O}(T)$ time for each. That is the sketchy outline of this method.

![Reconstruction](http://www.ma.utexas.edu/users/yzhong/images/post_img/non-trap.png)
This is the reconstruction image for initial condition. There is larger errors on jumps around phantom (WF set), for smooth bumps at corners, the reconstruction is accurate (w.r.t to the spatial discretization).

Now let's look at the implementation.

- forward model, namely operator $A$, it is to solve a wave equation in $\Omega\times[0, T]$, the wave equation lives in $\mathbb{R}^3$, thus finite domain has to deal with some absorption boundary, using PML or sufficient large domain would help.

  The PML method sets the absorption layer around $\Omega$, we will solve an equation like

  $$
  \begin{equation}
  \frac{d}{dt}\pmatrix{u\\\\u_t\\\\p\\\\q} = F(u, u_t, p ,q)
  \end{equation}
  $$

  any solver for first order ODE will work here, the forward model should be solved with high accuracy, thus a fine mesh will be necessary.


- backward model, iteratively, calculate

  $$K^m Qh = K(K^{m-1}Qh) = K^{m-1}Qh - QAK^{m-1}Qh$$

  The first term was stored from last step, the second term will need a forward plus a reversal.
