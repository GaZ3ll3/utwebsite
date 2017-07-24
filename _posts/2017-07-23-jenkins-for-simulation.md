---
layout: post
disqus: 'y'
title: Jenkins For Simulations
---
It is a note about how to make numerical simulations easier.

I recently found that using some continuous integration pipeline for simulations is quite convenient. Softwares like Jenkins can organize the cluster through ``ssh`` and try to balance all the loads.

The setting up is quite easy, there are tutorials anywhere.

For numerical simulations, all the different settings should be built in configuration file style or passed through stdin and taken as input instead built in binary executable. In this way, Jenkins run the simulations easily without manually setups.
