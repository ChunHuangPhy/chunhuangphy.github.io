---
layout: page
title: "Research"
description: "Research by Chun Huang on pulsar magnetospheres, X-ray pulse-profile modeling, Bayesian inference, and neutron-star dense matter."
permalink: /research/
slug: research
---

<header class="page-head">
  <div class="shell">
    <p class="eyebrow">Research</p>
    <h1>Neutron stars, from the outside in.</h1>
    <p class="lede">My work follows information from a pulsar’s magnetic field, through its heated surface and rotating X-ray signal, to the properties of matter in its interior.</p>
  </div>
</header>

<div class="shell">
  <section class="research-chapter" id="magnetospheres">
    <div class="chapter-number">01</div>
    <div class="chapter-copy">
      <p class="eyebrow">Magnetosphere</p>
      <h2>Physical maps of surface heating</h2>
      <p>Pulsar magnetospheres carry electric currents that return to the stellar surface and heat localized regions. I develop analytic, physics-motivated models for these hotspots in displaced-dipole and multipolar magnetic fields. The goal is to replace purely geometric emission regions with surface maps connected to the exterior electrodynamics.</p>
      <p><a href="https://doi.org/10.3847/1538-4357/adf747">Physics-Motivated Models of Pulsar X-Ray Hotspots</a> · <em>ApJ</em> 991, 90 (2025)</p>
      <p><a href="https://doi.org/10.3847/1538-4357/ae4489">First-Principles Polar-Cap Currents in Multipolar Pulsar Magnetospheres</a> · <em>ApJ</em> 999, 204 (2026)</p>
      <figure class="research-figure">
        <img src="{{ '/hotspot.png' | relative_url }}" alt="Physics-motivated hotspot geometry on a neutron-star surface" width="681" height="416">
        <figcaption>Example physics-motivated surface-heating geometry from published work on off-center dipole configurations. Huang & Chen, <em>ApJ</em> 991, 90 (2025).</figcaption>
      </figure>
    </div>
  </section>

  <section class="research-chapter" id="xray">
    <div class="chapter-number">02</div>
    <div class="chapter-copy">
      <p class="eyebrow">Surface emission</p>
      <h2>Relativistic X-ray pulse-profile modeling</h2>
      <p>As a neutron star rotates, its hotspots produce a periodic X-ray signal shaped by the viewing geometry, special-relativistic motion, gravitational redshift, and light bending. I work on forward models that connect physical surface maps to these pulse profiles and on GPU acceleration that makes complex models practical inside Bayesian inference.</p>
      <p><a href="https://doi.org/10.1051/0004-6361/202659305">GPU-Accelerated X-ray Pulse Profile Modeling</a> · <em>Astronomy & Astrophysics</em> 709, A111 (2026)</p>
      <p>The <a href="{{ '/#pulse-profile-demo' | relative_url }}">interactive calculation on the homepage</a> is a compact educational version of this forward-modeling idea. It uses generic parameters and contains no observational fit or unpublished result.</p>
    </div>
  </section>

  <section class="research-chapter" id="dense-matter">
    <div class="chapter-number">03</div>
    <div class="chapter-copy">
      <p class="eyebrow">Interior</p>
      <h2>Model-independent inference and dense matter</h2>
      <p>I develop complementary ways to learn about neutron-star interiors. One line uses physics-informed equations of state—including nucleonic, hyperonic, and phase-transition models—within Bayesian inference. Another extracts canonical radii and tidal deformabilities directly from observational posteriors with minimal equation-of-state assumptions.</p>
      <ul>
        <li><a href="https://doi.org/10.3847/2041-8213/ad9f3c">Equation-of-State-Independent Radius Determination</a></li>
        <li><a href="https://doi.org/10.3847/1538-4357/add5ef">Model-Independent Tidal-Deformability Determination</a></li>
        <li><a href="https://doi.org/10.1093/mnras/stae844">Relativistic Mean Field Constraints I: Nucleonic Models</a></li>
        <li><a href="https://doi.org/10.1093/mnras/stae2792">Relativistic Mean Field Constraints II: Hyperonic Models</a></li>
      </ul>
    </div>
  </section>

  <section class="research-chapter" id="software">
    <div class="chapter-number">04</div>
    <div class="chapter-copy">
      <p class="eyebrow">Infrastructure</p>
      <h2>Open scientific software and collaboration</h2>
      <p>I lead the development of <a href="https://github.com/ChunHuangPhy/CompactObject">CompactObject</a>, an open-source Python framework for neutron-star equation-of-state inference. The collaboration brings together researchers in the United States, Europe, and China and supports projects ranging from relativistic mean-field theory to multimessenger constraints.</p>
    </div>
  </section>

  <section class="research-chapter" id="earlier-work">
    <div class="chapter-number">05</div>
    <div class="chapter-copy">
      <p class="eyebrow">Earlier work</p>
      <h2>Glitches and nonlinear dynamics</h2>
      <p>My earlier research includes Bayesian model comparison for the long-term recovery of the Crab pulsar after glitches, tests of starquake interpretations, and undergraduate work on symmetry breaking in polygonal vortex flows.</p>
      <p><a href="https://doi.org/10.1093/mnras/staf1415">Bayesian Insights into Post-glitch Dynamics</a> · <em>MNRAS</em> 542, 3198–3205 (2025)</p>
    </div>
  </section>
</div>
