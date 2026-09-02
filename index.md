---
layout: default
title: "Chun Huang"
description: "Chun Huang is a Ph.D. candidate connecting pulsar magnetospheres, X-ray observations, Bayesian inference, and neutron-star interiors."
slug: home
---

<section class="hero">
  <div class="shell hero-grid">
    <div class="hero-copy">
      <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span> Seeking postdoctoral opportunities · 2027</p>
      <h1>The physics of neutron stars, <em>from magnetosphere to dense matter.</em></h1>
      <p class="hero-lede">I connect physical models of pulsar magnetospheres to X-ray pulse profiles and multimessenger inference—turning light from a star’s surface into evidence about matter at extreme density.</p>
      <p class="hero-role">Ph.D. Candidate in Physics · Washington University in St. Louis</p>
      <div class="button-row">
        <a class="button button-primary" href="{{ '/research/' | relative_url }}">Explore my research <span aria-hidden="true">→</span></a>
        <a class="button button-secondary" href="{{ '/assets/files/Chun-Huang-CV.pdf' | relative_url }}">Download CV</a>
        <a class="text-link" href="mailto:chun.h@wustl.edu">Contact me</a>
      </div>
    </div>

    <figure class="hero-figure" aria-labelledby="hero-figure-title">
      <div class="figure-topline">
        <span id="hero-figure-title">Physical hotspot geometry</span>
        <span class="live-label">Model view</span>
      </div>
      <div class="star-stage">
        <img src="{{ '/assets/images/hotspot-map.webp' | relative_url }}" alt="Inferred physical hotspot regions on a neutron-star surface map" data-hotspot-map>
        <span class="orbit orbit-one" aria-hidden="true"></span>
        <span class="orbit orbit-two" aria-hidden="true"></span>
      </div>
      <div class="model-switch" role="group" aria-label="Hotspot geometry">
        <button class="model-button is-active" type="button" data-model="shifted" aria-pressed="true">Shifted dipole</button>
        <button class="model-button" type="button" data-model="multipole" aria-pressed="false">Multipole</button>
        <button class="model-button" type="button" data-model="centered" aria-pressed="false">Centered field</button>
      </div>
      <div class="model-output">
        <div class="pulse-chart" aria-label="Illustrative X-ray pulse profile for the selected geometry">
          <svg viewBox="0 0 320 90" role="img" aria-labelledby="pulse-title pulse-desc">
            <title id="pulse-title">Illustrative X-ray pulse profile</title>
            <desc id="pulse-desc">The pulse profile changes when a different physical hotspot geometry is selected.</desc>
            <path class="pulse-grid" d="M0 72H320M0 45H320M0 18H320"/>
            <path class="pulse-line" data-pulse-line d="M0 67 C30 66 41 27 67 25 S105 66 131 64 S174 34 199 35 S236 65 320 63"/>
            <circle class="phase-marker" data-phase-marker cx="0" cy="67" r="4"/>
          </svg>
          <label>Rotational phase <input type="range" min="0" max="100" value="0" data-phase-slider></label>
        </div>
        <div class="radius-readout" aria-live="polite"><small>Radius posterior</small><strong data-radius-value>13.3 km</strong><span data-radius-range>16th–84th: 12.1–14.8 km</span></div>
      </div>
      <figcaption>Physics-motivated surface heating maps replace freely drawn spots with testable magnetospheric structure.</figcaption>
    </figure>
  </div>
</section>

<section class="snapshot shell" aria-label="Research profile at a glance">
  <p class="section-kicker">Research at a glance</p>
  <div class="snapshot-grid">
    <div><strong>10</strong><span>first-author papers</span></div>
    <div><strong>3</strong><span>single-author papers</span></div>
    <div><strong>6</strong><span>mentored student-led papers</span></div>
    <div><strong>10³–10⁴×</strong><span>GPU speedup in pulse-profile modeling</span></div>
  </div>
</section>

<section class="section shell">
  <div class="section-heading split-heading">
    <div>
      <p class="eyebrow">One star, three physical regimes</p>
      <h2>Reading a neutron star from the outside in</h2>
    </div>
    <p>My work treats the magnetosphere, surface emission, and dense interior as parts of one inference problem—not isolated layers.</p>
  </div>
  <div class="research-path">
    <article class="path-card path-exterior">
      <span class="path-index">01 · Exterior</span>
      <h3>Magnetospheres shape what we see.</h3>
      <p>First-principles current maps predict where returning particles heat a pulsar’s surface.</p>
      <a href="{{ '/research/#magnetosphere' | relative_url }}">Magnetosphere modeling <span aria-hidden="true">↗</span></a>
    </article>
    <article class="path-card path-surface">
      <span class="path-index">02 · Surface</span>
      <h3>X-rays encode mass and radius.</h3>
      <p>GPU-accelerated waveform tools make complex, physical hotspot models tractable in Bayesian inference.</p>
      <a href="{{ '/research/#xray' | relative_url }}">X-ray pulse profiles <span aria-hidden="true">↗</span></a>
    </article>
    <article class="path-card path-interior">
      <span class="path-index">03 · Interior</span>
      <h3>Radii reveal dense matter.</h3>
      <p>Model-independent and physics-informed methods connect observations to the neutron-star equation of state.</p>
      <a href="{{ '/research/#dense-matter' | relative_url }}">Dense-matter inference <span aria-hidden="true">↗</span></a>
    </article>
  </div>
</section>

<section class="section feature-band">
  <div class="shell feature-grid">
    <div>
      <p class="eyebrow">Open scientific infrastructure</p>
      <h2>Building tools that let collaborations ask harder questions.</h2>
      <p>I lead the international <strong>CompactObject</strong> collaboration, an open-source Bayesian framework that connects nuclear theory, multimessenger observations, and neutron-star structure.</p>
      <div class="button-row">
        <a class="button button-light" href="https://github.com/ChunHuangPhy/CompactObject">View CompactObject</a>
        <a class="text-link light-link" href="{{ '/research/#software' | relative_url }}">Scientific software →</a>
      </div>
    </div>
    <div class="code-constellation" aria-label="CompactObject connects equation-of-state models, observations, TOV structure, and Bayesian inference">
      <span class="node node-a">EOS models</span>
      <span class="node node-b">Observations</span>
      <span class="node node-c">TOV structure</span>
      <span class="node node-d">Bayesian inference</span>
      <i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i>
    </div>
  </div>
</section>

<section class="section shell closing-grid">
  <div>
    <p class="eyebrow">Current direction</p>
    <h2>Can independent views identify the magnetosphere before its X-rays are used to infer a radius?</h2>
  </div>
  <div>
    <p>My next program combines radio polarization, thermal X-rays, and gamma-ray pulses to test one rotating magnetic structure across three emission zones.</p>
    <a class="arrow-link" href="{{ '/research/#future' | relative_url }}">Read the research vision <span aria-hidden="true">→</span></a>
  </div>
</section>
