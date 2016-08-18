---
layout: post
title: More on Transport
disqus: 'y'
---

The radiative transfer equation involves several parameters, $\mu_t$,
$\mu_s$ be the attenuation(transport) and scattering coefficient
respectively. $K(\hat{\mathbf{s}}, \hat{\mathbf{s}}')$ is the phase
function describing the probability of scattering from
$\hat{\mathbf{s}}$ to $\hat{\mathbf{s}}'$.

$$\hat{\mathbf{s}}\cdot \nabla u(\mathbf{r}, \hat{\mathbf{s}}) + \mu_t u(\mathbf{r}, \hat{\mathbf{s}}) = \mu_s \frac{1}{\mathrm{Vol}(\mathbb{S}^{d-1})}\int_{\mathbb{S}^{d-1}} K(\hat{\mathbf{s}}\cdot \hat{\mathbf{s}}') u(\mathbf{r}, \hat{\mathbf{s}}') d\hat{\mathbf{s}}' + q$$

When the phase function is isotropic, we are aware that FMM based
algorithm would be a good approximation to the solution. Here we try to
develop more application cases.

Isotropic $\delta$-Eddington approximation
------------------------------------------

In 3D, the phase function is selected as

$$K(\cos\theta) = 2f\delta(1 - \cos\theta) + (1-f)(1 + 3g'\cos\theta)$$

where $f = g^2, g' = g/(1+g)$ are constant parameters and
$\cos\theta = \hat{\mathbf{s}}\cdot \hat{\mathbf{s}}'$. Then the RTE
will be reduced to

$$\hat{\mathbf{s}}\cdot \nabla u(\mathbf{r}, \hat{\mathbf{s}}) + \mu_t'u(\mathbf{r}, \hat{\mathbf{s}}) = \mu_s'\frac{1}{\mathrm{Vol}(\mathbb{S}^{d-1})}\int_{\mathbb{S}^2}(1 + 3g' \hat{\mathbf{s}}\cdot \hat{\mathbf{s}}') u(\mathbf{r}, \hat{\mathbf{s}}') d\hat{\mathbf{s}}' + q$$

where $\mu_s' = (1- f)\mu_s$ and $\mu_t' = \mu_a + \mu_s'$. If $g' = 0$,
we will again land on our original FMM settings.

Anisotrpic $\delta$-Eddington approximation
-------------------------------------------

Here we consider more general case $g'\neq 0$, to simplify our work, we
assume the domain $\Omega\subset \mathbb{R}^2$, where $\delta$-Eddington
approximation should be similar. We consider the equation with ,

$$\hat{\mathbf{s}}\cdot \nabla u(\mathbf{r}, \hat{\mathbf{s}}) + \mu_t u(\mathbf{r}, \hat{\mathbf{s}}) = \mu_s \frac{1}{\mathrm{Vol}(\mathbb{S}^{d-1})}\int_{\mathbb{S}^2}(1 + \kappa\hat{\mathbf{s}}\cdot \hat{\mathbf{s}}') u(\mathbf{r}, \hat{\mathbf{s}}') d\hat{\mathbf{s}}' + q$$

where $\kappa$ is an appropriate constant. In 2D, we can substitute
$\hat{\mathbf{s}}$ with $\theta$. And
$\hat{\mathbf{s}}\cdot \hat{\mathbf{s}}' = \cos\theta \cos\theta' + \sin\theta\sin\theta'$.
Then

$$
    u(\mathbf{r}, \theta) = \int_0^{\tau_{-}(\mathbf{r}, \theta)} E(\mathbf{r}, \mathbf{y})\Big( \mu_s(\mathbf{y})\left(U(\mathbf{y}) + \kappa C(\mathbf{y})\cos\theta  + \kappa S(\mathbf{y})\sin\theta \right) + q(\mathbf{y})\Big) dt
$$

where $y = \mathbf{r}- t\hat{\mathbf{s}}$, $E(\mathbf{r},\mathbf{y})$ is
the line integral, and

$$\begin{aligned}
    U(\mathbf{r}) &= \frac{1}{2\pi}\int_0^{2\pi} u(\mathbf{r}, \theta) d\theta\\\\
    C(\mathbf{r}) &=  \frac{1}{2\pi}\int_0^{2\pi} \cos\theta u(\mathbf{r}, \theta) d\theta\\\\
    S(\mathbf{r}) &=  \frac{1}{2\pi}\int_0^{2\pi} \sin\theta u(\mathbf{r}, \theta) d\theta
    \end{aligned}
$$

Then we integrate over $\theta \in \mathbb{S}^1$.

$$U(\mathbf{r}) =  \frac{1}{2\pi}\int_0^{2\pi}  \int_0^{\tau_{-}(\mathbf{r}, \theta)} E(\mathbf{r}, \mathbf{y})\Big( \mu_s(\mathbf{y})\left(U(\mathbf{y}) + \kappa C(\mathbf{y})\cos\theta  + \kappa S(\mathbf{y})\sin\theta \right) + q(\mathbf{y})\Big) dt$$

change from polar coordinate to Cartesian, also we know that

$$(\cos\theta, \sin\theta) = \frac{\mathbf{r}- \mathbf{y}}{|\mathbf{r}- \mathbf{y}|}$$

then

$$\begin{aligned}
    U(\mathbf{r}) &= \int_{\mathbf{y}\in \Omega} \frac{1}{2\pi} \frac{E(\mathbf{r}, \mathbf{y})}{|\mathbf{r}- \mathbf{y}|} \Big(\mu_s(\mathbf{y}) U(\mathbf{y}) + q(\mathbf{y})\Big)d\mathbf{y}\\\\
    &+ \int_{y\in\Omega} \frac{\kappa}{2\pi} \frac{E(\mathbf{r}, \mathbf{y}) (\mathbf{r}_x - \ \mathbf{y}_x)}{|\mathbf{r}- \mathbf{y}|^2}\mu_s(\mathbf{y}) C(\mathbf{y}) d\mathbf{y}\\\\
    &+ \int_{y\in\Omega} \frac{\kappa}{2\pi} \frac{E(\mathbf{r}, \mathbf{y}) (\mathbf{r}_y - \ \mathbf{y}_y)}{|\mathbf{r}- \mathbf{y}|^2}\mu_s(\mathbf{y}) S(\mathbf{y}) d\mathbf{y}\end{aligned}
$$

In the same way, we also have

$$\begin{aligned}
    C(\mathbf{r}) &= \int_{\mathbf{y}\in \Omega} \frac{1}{2\pi} \frac{E(\mathbf{r}, \mathbf{y})(\mathbf{r}_x - \mathbf{y}_x)}{|\mathbf{r}- \mathbf{y}|^2} \Big(\mu_s(\mathbf{y}) U(\mathbf{y}) + q(\mathbf{y})\Big)d\mathbf{y}\\\\
    &+ \int_{y\in\Omega} \frac{\kappa}{2\pi} \frac{E(\mathbf{r}, \mathbf{y}) (\mathbf{r}_x - \ \mathbf{y}_x)^2}{|\mathbf{r}- \mathbf{y}|^3}\mu_s(\mathbf{y}) C(\mathbf{y}) d\mathbf{y}\\\\
    &+ \int_{y\in\Omega} \frac{\kappa}{2\pi} \frac{E(\mathbf{r}, \mathbf{y}) (\mathbf{r}_x - \ \mathbf{y}_x)(\mathbf{r}_y - \ \mathbf{y}_y)}{|\mathbf{r}- \mathbf{y}|^3}\mu_s(\mathbf{y}) S(\mathbf{y}) d\mathbf{y}\end{aligned}
$$

$$\begin{aligned}
    S(\mathbf{r}) &= \int_{\mathbf{y}\in \Omega} \frac{1}{2\pi} \frac{E(\mathbf{r}, \mathbf{y})(\mathbf{r}_y - \mathbf{y}_y)}{|\mathbf{r}- \mathbf{y}|^2} \Big(\mu_s(\mathbf{y}) U(\mathbf{y}) + q(\mathbf{y})\Big) d\mathbf{y}\\\\
    &+ \int_{y\in\Omega} \frac{\kappa}{2\pi} \frac{E(\mathbf{r}, \mathbf{y}) (\mathbf{r}_x - \ \mathbf{y}_x)(\mathbf{r}_y - \mathbf{y}_y)}{|\mathbf{r}- \mathbf{y}|^3}\mu_s(\mathbf{y}) C(\mathbf{y}) d\mathbf{y}\\\\
    &+ \int_{y\in\Omega} \frac{\kappa}{2\pi} \frac{E(\mathbf{r}, \mathbf{y}) (\mathbf{r}_y - \ \mathbf{y}_y)^2}{|\mathbf{r}- \mathbf{y}|^3}\mu_s(\mathbf{y}) S(\mathbf{y}) d\mathbf{y}\end{aligned}
$$

which is a system of first kind integrals, let
$\Psi(\mathbf{r}) =   \begin{pmatrix}
    U(\mathbf{r})\\\\
    C(\mathbf{r})\\\\
    S(\mathbf{r})
    \end{pmatrix}$ and $Q(\mathbf{r}) =\begin{pmatrix}
    q(\mathbf{r})\\\\
    0\\\\
    0
    \end{pmatrix}$, then

$$\Psi(\mathbf{r}) =
    \int_{y\in \Omega} \mathcal{K} (\mathbf{r}, \mathbf{y})\Big(\mu_s(\mathbf{y})\Psi(\mathbf{y}) + Q(\mathbf{y})\Big)
    d\mathbf{y}= K(\mu_s\Psi + Q
)$$

It is obvious that solving $\Psi$ will automatically give solution
$u(\mathbf{r}, \theta)$ from .

$$\Psi(\mathbf{r}) = \frac{1}{\mu_s} (I - \mu_sK )^{-1}(\mu_s K Q)$$

Algorithm complexity
--------------------

From above system, there are six kernels ($\mathcal{K}$ is symmetric) to
be calculated, also $\kappa K_{UU} = K_{CC} + K_{SS}$ can reduce the
evaluation complexity. Unlike our previous algorithm for isotropic phase
function, instead of caching all matrices for interaction (M2L) only, we
also will cache variables $E(\mathbf{r}, \mathbf{y})$ in order to
accelerate other kernels building process by re-using them, the time
complexity in caching the kernels will be $\mathcal{O}(nN_p)$. We solve
the linear system by Krylov subspace methods such as GMRES or MINRES, if
there are $l$ iterations, then the time cost is $\mathcal{O}(l^2 nN_p)$.

Possible pre-conditioner for the system
---------------------------------------

In FMM, we have to evaluate the self-contribution on each grid, however,
we can easily observe that off-diagonal kernels in $K$ should produce
zero for self-contributions, and integrand will drop fast for further
points, thus we may approximate $K$ using its diagonal operators.

Possible anisotropic source
---------------------------

Currently we cannot handle anisotropic source term
$q(\mathbf{r}, \hat{\mathbf{s}})$ unless we know exact explicit form, since the coupling between
$\mathbf{r}$ and $\hat{\mathbf{s}}$ could involve higher ordered terms
(in Legendre polynomial sense). In this very case, first order
approximation, we could assume
$q(\mathbf{r}, \theta) \sim q_0(\mathbf{r}) + \cos\theta q_c(\mathbf{r}) + \sin\theta q_s(\mathbf{r})$
without hurting the analysis and algorithm too much.

Error analysis
--------------

Similar to previous report, the error of approximation by FMM is bounded
by $-C l \log (l) + \varepsilon_{FMM}$, when $l\to 0^{+}$.

More general case
-----------------

Consider the phase function $K(\hat{\mathbf{s}}\cdot \hat{\mathbf{s}}')$
expansion in terms of $\hat{\mathbf{s}}\cdot \hat{\mathbf{s}}'$, with
Legendre polynomials for 3D or Chebyshev polynomial for 2D. Then similar
argument will bring us to a large linear system which requires very
intense evaluations of FMM kernels.
