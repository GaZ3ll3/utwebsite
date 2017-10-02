---
layout: post
disqus: 'y'
title: Wignerization
---

Though it is tedious, I would think some notes on Wigner transform is necessary to some beginner like me. All notes are based on H.T. Yau's famous result in 1999.

For Schrodinger equation, $i\psi_t = H\psi$, where $H = H_0 + \lambda V$, $H_0 = -\frac{1}{2}\Delta$. Formally, we have Dyson series

$$\psi_t = e^{-itH}\psi_0 = \sum_{n=0}^{N-1} \psi_n(t) + \Psi_N(t)$$
where $V$ is spatially variable,
$$\psi_n(t) = (-i\lambda)^n (\int_0^t)^{n+1} \prod_{j=0}^n(ds_j) \delta(t - \sum_{j=0}^n s_j) e^{-is_0H_0}V\cdots Ve^{-is_n H_0}  \psi_0$$
and remainder is
$$\Psi_N(t) = -i\lambda \int_0^t ds e^{-i(t-s)H}V\psi_{N-1}$$

We take Fourier transform on $\psi_n$, ignoring the constants $(2\pi)^d$ by normalizing the Lebesgue measure. The integral is actually in a simplex instead of full cube.

$$\widehat{\psi}_n(t, p_0) = \lambda^n \int \prod_{j=1}^n (dp_j) K(t;p,n) L(p, n) \widehat{\psi}_0(p_n)$$

where $$K = (-i)^n \int_0^t \prod_{j=0}^n (ds_j) \delta(t - \sum_{j=0}^n s_j) \prod_{j=0}^n e^{-is_j p_j^2}$$ $$L(p,n) = \prod_{j=0}^{n-1} \widehat{V}(p_j - p_{j+1})$$ It is straightforward to check this by convolution back.

The main result shows that if we truncate the series, we can get error term goes away by taking limit.

For $\psi = \psi_1 + \psi_2$, with $\psi_2$ as error, we can show that for any admissible functional $\widehat{J}_{\epsilon}(\xi, v)$,
$$|E\int \overline{\widehat{J}_{\epsilon}}(\xi, v)(\widehat{W}_{\psi}(\xi, v) - \widehat{W}_{\psi_1}(\xi, v))| d\xi dv\le C \sup\|\widehat{J}_{\epsilon}\|_{1,\infty}\sqrt{E|\psi_2|^2 E|\psi_1|^2}$$

Thus after truncation of Dyson series, above limit will be zero as $N\to\infty$, which means weak convergence.

The Wignerization of the truncated series will involve all terms like
$$ E \int \overline{\widehat{J}}_{\epsilon} \overline{\widehat{\psi}_n(t, v-\frac{\xi}{2})} \widehat{\psi}_{m}(t, v + \frac{\xi}{2}) d\xi dv$$
above expectation involves $L(p,n), L(p',m)$, when $V$ is standard Gaussian process, then $n+m$ must be even to get perfect pairing to be nonzero.

Knowing that $E \overline{\widehat{V}(p)}\widehat{V}(q) = \delta(p - q) R(p)R(q)$, we will try to find out all cases like

1. $\widehat{V}(p_j - p_{j+1})\widehat{V}(p'_{k} -p'_{k+1})$
2. $\widehat{V}(p_j - p_{j+1})\widehat{V}(p_{k} -p_{k+1})$
3. $\widehat{V}(p'_j - p'_{j+1})\widehat{V}(p'_{k} -p'_{k+1})$

where $p_0 = v-\frac{\xi}{2}$ and $p'_0 = v + \frac{\xi}{2}$. Connecting all $p$ and $p'$ forming a loop, all relations can be classified as nested, crossing and simple. It can be shown that these kinds of interaction is dominated by simple relations.

[TO BE CONTINUED]
