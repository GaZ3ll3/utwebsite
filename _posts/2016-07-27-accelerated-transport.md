---
layout: post
title: Accelerated Transport
disqus: 'y'
---

As I am concerned, all solvers without approximating with simply diffusion models must suffer from a very huge time cost in solutions. Including $P_N$, Monte Carlo, finite volume/element approaches in discrete ordinate method. The reason that diffusion model is plausible in many cases is the scattering effect is so strong, the particles movement is very similar as heat transfer in macroscopic scale. A very interesting thing here is, people were using DSA method for accelerate the transport solution by damping the error with diffusion solver first as a pre-conditioner, then it will be fast for transport solver to get the rest things done.

Without a high priority in accuracy, the transport equation might be solved in a coarse way in every sense, it seems that without hurting the result, we can modify the transport model a little to achieve some boost in speed.

$$ -\delta \Delta u + v\cdot \nabla u(x, v) + \sigma_t u = \sigma_s \frac{1}{\mathrm{Vol}(V)} \int_{V} u(x, v) dv +  q $$

Now the equation will converge faster in each iteration, because we enhanced the first order approximation, which plays an important role in iterating.

It seems this does not work well under the integration form since it produces differential-integral equation, which makes thing worse. Under other framework like discrete ordinate method, this method is better because Laplacian is easy to handle under Galerkin sense.
