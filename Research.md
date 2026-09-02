---
layout: default
title: "Research"
description: "Research by Chun Huang on pulsar magnetospheres, X-ray pulse-profile modeling, neutron-star radii, and dense matter."
permalink: /research/
slug: research
---

<header class="research-hero shell">
  <p class="eyebrow">Research program</p>
  <h1>Reading a neutron star <em>from the outside in.</em></h1>
  <div class="research-hero-lede">
    <p>A neutron star packs more mass than the Sun into a sphere the size of a city. Its radius records how matter behaves at densities unreachable on Earth—but measuring that radius requires understanding where its X-rays come from.</p>
    <p>My research closes that loop: from relativistic plasma and surface heating, through X-ray waveform inference, to the dense-matter equation of state.</p>
  </div>
</header>

<nav class="research-jump shell" aria-label="Research sections">
  <a href="#magnetosphere"><span>01</span> Magnetosphere</a>
  <a href="#xray"><span>02</span> X-ray inference</a>
  <a href="#dense-matter"><span>03</span> Dense matter</a>
  <a href="#software"><span>04</span> Scientific software</a>
  <a href="#future"><span>05</span> Next program</a>
</nav>

<section class="research-section shell" id="magnetosphere">
  <div class="research-copy">
    <p class="eyebrow">01 · Exterior</p>
    <h2>Can plasma physics predict which parts of the star shine?</h2>
    <p>Particles accelerated in a pulsar’s relativistic magnetosphere return to the magnetic poles and heat the surface. The resulting hot regions are not arbitrary patches: they are physical maps of global electric currents and magnetic geometry.</p>
    <p>I developed analytic models that connect magnetospheric currents to surface-heating patterns for displaced dipoles and multipolar fields. These models remain fast enough for Bayesian inference while producing pulse shapes that can differ by roughly 30%.</p>
    <a class="paper-link" href="https://doi.org/10.3847/1538-4357/ae4489"><span>Featured paper</span> First-Principles Polar-Cap Currents in Multipolar Pulsar Magnetospheres →</a>
  </div>
  <figure class="research-visual map-visual">
    <img src="{{ '/assets/images/hotspot-map.webp' | relative_url }}" alt="Mollweide projection showing two physics-motivated hot regions on a neutron-star surface">
    <figcaption><strong>Surface heating map.</strong> Physical hotspot regions predicted from an off-center magnetic configuration. Huang & Chen, ApJ 991, 90 (2025).</figcaption>
  </figure>
</section>

<section class="research-section shell reversed" id="xray">
  <div class="research-copy">
    <p class="eyebrow">02 · Surface</p>
    <h2>Turning rotating X-ray light into a radius measurement.</h2>
    <p>NICER measures the changing X-ray brightness as hot regions rotate across a neutron star’s surface. General-relativistic light bending and Doppler effects encode the star’s compactness, but the result can shift if the surface geometry is wrong.</p>
    <p>I co-developed an open GPU-accelerated pulse-profile framework that matches established benchmarks while reducing high-fidelity waveform calculations from seconds or minutes to milliseconds—speedups of 10³–10⁴ on tested hardware.</p>
    <a class="paper-link" href="https://doi.org/10.1051/0004-6361/202659305"><span>Featured paper</span> GPU-Accelerated X-ray Pulse Profile Modeling →</a>
  </div>
  <figure class="research-visual comparison-visual">
    <img src="{{ '/assets/images/research-outside-in.png' | relative_url }}" alt="Comparison of shifted dipole, shifted multipole, and centered multipole heating maps and their inferred radius distributions">
    <figcaption><strong>A controlled model comparison.</strong> With the data and inference machinery fixed, two displaced-field models agree near 13–14 km while a centered-field model shifts the inferred radius higher. Preliminary J0740+6620 analysis.</figcaption>
  </figure>
</section>

<section class="research-section shell" id="dense-matter">
  <div class="research-copy">
    <p class="eyebrow">03 · Interior</p>
    <h2>Separating what the data say from what the equation of state assumes.</h2>
    <p>I develop complementary paths to neutron-star interiors. Physics-informed analyses test nucleonic, hyperonic, phase-transition, strange-matter, and dark-matter scenarios. Model-independent analyses instead combine mass-radius or gravitational-wave posteriors to infer canonical radii and tidal deformabilities with minimal equation-of-state assumptions.</p>
    <p>Three single-author studies establish this independent thread of my research, including data-driven determinations of the radius and tidal deformability of a 1.4-solar-mass neutron star.</p>
    <a class="paper-link" href="https://doi.org/10.3847/2041-8213/ad9f3c"><span>Featured paper</span> Equation-of-State-Independent Radius Determination →</a>
  </div>
  <div class="result-panel" aria-label="Selected model-independent neutron-star radius result">
    <p class="result-label">Model-independent inference</p>
    <div class="result-value">11.94 <small>km</small></div>
    <div class="result-range" aria-label="16th to 84th percentile range from 11.14 to 12.73 kilometers">
      <span style="left: 20%"></span><i style="left: 49%"></i><span style="left: 77%"></span>
    </div>
    <div class="range-labels"><span>11.14</span><strong>median</strong><span>12.73</span></div>
    <p>Radius of a 1.4-solar-mass neutron star inferred from two mass-radius measurements; 16th–84th percentiles.</p>
  </div>
</section>

<section class="software-section" id="software">
  <div class="shell software-grid">
    <div>
      <p class="eyebrow">04 · Infrastructure and leadership</p>
      <h2>CompactObject</h2>
      <p class="software-lede">An open-source framework for full-scope Bayesian inference of neutron-star equations of state.</p>
    </div>
    <div class="software-details">
      <p>As lead developer and coordinator, I work with researchers across the United States, Europe, and China to connect equation-of-state generation, TOV structure, nuclear experiments, X-ray measurements, and gravitational-wave constraints in one extensible workflow.</p>
      <ul class="tag-list" aria-label="CompactObject capabilities">
        <li>EOS generators</li><li>TOV solver</li><li>Nested sampling</li><li>Multimessenger likelihoods</li><li>Documented workflows</li>
      </ul>
      <div class="button-row">
        <a class="button button-light" href="https://github.com/ChunHuangPhy/CompactObject">Source on GitHub</a>
        <a class="text-link light-link" href="https://chunhuangphy.github.io/CompactObject/">Documentation →</a>
      </div>
    </div>
  </div>
</section>

<section class="future-section shell" id="future">
  <p class="eyebrow">05 · Postdoctoral research direction</p>
  <div class="future-grid">
    <h2>Three emission zones. One magnetic structure. A falsifiable radius experiment.</h2>
    <div>
      <p>My next program will ask whether radio polarization, thermal X-rays, and gamma-ray pulses can independently identify the magnetosphere before the X-rays are used to infer the stellar radius.</p>
      <ol>
        <li><strong>Calibrate surface heating</strong> with a bounded suite of kinetic plasma simulations.</li>
        <li><strong>Test one geometry</strong> against radio, X-ray, and held-out gamma-ray observations.</li>
        <li><strong>Average over surviving models</strong> to report both statistical and exterior-model uncertainty in the radius.</li>
      </ol>
      <p>The outcome is useful either way: a portable radius method if the models agree, or a quantified plasma systematic if they do not.</p>
    </div>
  </div>
</section>

<section class="earlier-section shell">
  <div>
    <p class="eyebrow">Earlier and collaborative work</p>
    <h2>A broader foundation</h2>
  </div>
  <div class="earlier-list">
    <article><span>Glitch dynamics</span><p>Bayesian model comparison for decades of Crab pulsar timing data and theoretical tests of starquake interpretations.</p></article>
    <article><span>Fluid dynamics</span><p>Symmetry breaking in polygon-vortex transitions, developed during my undergraduate training.</p></article>
    <article><span>Cross-field collaboration</span><p>Contributions spanning double-pulsar observations, dark matter in neutron stars, and heavy-quark effective theory.</p></article>
  </div>
</section>
