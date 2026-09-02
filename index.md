---
layout: page
title: "Chun Huang"
description: "Chun Huang is a physicist studying neutron-star magnetospheres, X-ray pulse profiles, Bayesian inference, and dense matter."
permalink: /
slug: home
---

<section class="shell home-intro">
  <figure class="portrait">
    <img src="{{ '/assets/images/chun-huang-portrait.jpg' | relative_url }}" alt="Chun Huang standing in front of the United States Supreme Court" width="900" height="1200">
  </figure>
  <div class="intro-copy">
    <p class="eyebrow">Ph.D. candidate in Physics</p>
    <h1>Chun Huang</h1>
    <p class="lede">I am a final-year Ph.D. candidate in the Department of Physics at Washington University in St. Louis, advised by Alexander Y. Chen.</p>
    <p>I study how pulsar magnetospheres produce X-ray hotspots, and how pulse-profile and multimessenger observations can constrain neutron-star radii and dense matter.</p>
    <p class="availability">I am seeking postdoctoral positions beginning in 2027.</p>
    <div class="intro-links">
      <a href="{{ '/research/' | relative_url }}">Research</a>
      <a href="{{ '/publications/' | relative_url }}">Publications</a>
      <a href="mailto:chun.h@wustl.edu">Contact</a>
    </div>
  </div>
</section>

<section class="section shell">
  <div class="section-heading">
    <p class="eyebrow">Research</p>
    <h2>An outside-in approach to neutron stars</h2>
  </div>
  <div class="research-list">
    <article>
      <h3>Magnetospheres & surface heating</h3>
      <p>Deriving physical hotspot maps from current flow in displaced and multipolar magnetic fields.</p>
      <a class="plain-link" href="{{ '/research/#magnetospheres' | relative_url }}">Read more</a>
    </article>
    <article>
      <h3>X-ray pulse profiles</h3>
      <p>Developing accelerated relativistic forward models that connect surface emission to rotating X-ray signals.</p>
      <a class="plain-link" href="{{ '/research/#xray' | relative_url }}">Read more</a>
    </article>
    <article>
      <h3>Dense matter & inference</h3>
      <p>Combining mass–radius, gravitational-wave, and nuclear constraints with Bayesian and model-independent methods.</p>
      <a class="plain-link" href="{{ '/research/#dense-matter' | relative_url }}">Read more</a>
    </article>
  </div>
</section>

<section class="simulator shell" id="pulse-profile-demo" data-pulse-simulator>
  <div class="simulator-intro">
    <p class="eyebrow">Interactive forward model</p>
    <h2>From an off-center dipole to an X-ray pulse</h2>
    <p>Change the magnetic obliquity or move the dipole inside the star. The physics-motivated surface-heating map and its relativistic light curve are recomputed together.</p>
  </div>
  <div class="simulator-layout">
    <form class="sim-controls" aria-label="Hotspot model parameters">
      <fieldset>
        <legend>Magnetosphere</legend>
        <label class="sim-control" for="sim-obliquity">
          <span class="control-row"><span>Magnetic obliquity</span><output for="sim-obliquity" data-output="obliquity">35°</output></span>
          <input id="sim-obliquity" data-parameter="obliquity" type="range" min="10" max="80" value="35" step="1">
        </label>
        <label class="sim-control" for="sim-offset-x">
          <span class="control-row"><span>Dipole offset x/R</span><output for="sim-offset-x" data-output="offsetX">0.15</output></span>
          <input id="sim-offset-x" data-parameter="offsetX" type="range" min="-0.35" max="0.35" value="0.15" step="0.01">
        </label>
        <label class="sim-control" for="sim-offset-y">
          <span class="control-row"><span>Dipole offset y/R</span><output for="sim-offset-y" data-output="offsetY">0.00</output></span>
          <input id="sim-offset-y" data-parameter="offsetY" type="range" min="-0.35" max="0.35" value="0" step="0.01">
        </label>
        <label class="sim-control" for="sim-offset-z">
          <span class="control-row"><span>Dipole offset z/R</span><output for="sim-offset-z" data-output="offsetZ">−0.10</output></span>
          <input id="sim-offset-z" data-parameter="offsetZ" type="range" min="-0.35" max="0.35" value="-0.10" step="0.01">
        </label>
      </fieldset>
      <fieldset>
        <legend>Star and observer</legend>
      <label class="sim-control" for="sim-mass">
        <span class="control-row"><span>Mass</span><output for="sim-mass" data-output="mass">1.4 M☉</output></span>
        <input id="sim-mass" data-parameter="mass" type="range" min="1.0" max="2.2" value="1.4" step="0.05">
      </label>
      <label class="sim-control" for="sim-radius">
        <span class="control-row"><span>Radius</span><output for="sim-radius" data-output="radius">12.0 km</output></span>
        <input id="sim-radius" data-parameter="radius" type="range" min="10" max="16" value="12" step="0.1">
      </label>
      <label class="sim-control" for="sim-inclination">
        <span class="control-row"><span>Observer inclination</span><output for="sim-inclination" data-output="inclination">60°</output></span>
        <input id="sim-inclination" data-parameter="inclination" type="range" min="5" max="90" value="60" step="1">
      </label>
      <label class="sim-control" for="sim-spin">
        <span class="control-row"><span>Spin frequency</span><output for="sim-spin" data-output="spin">300 Hz</output></span>
        <input id="sim-spin" data-parameter="spin" type="range" min="100" max="700" value="300" step="10">
      </label>
      </fieldset>
      <label class="sim-control" for="sim-phase">
        <span class="control-row"><span>Rotation phase</span><output for="sim-phase" data-output="phase">0.00</output></span>
        <input id="sim-phase" data-parameter="phase" type="range" min="0" max="1" value="0" step="0.01">
      </label>
    </form>

    <div class="sim-results">
      <div class="sim-figures">
        <figure class="sim-figure">
          <canvas data-temperature-map width="480" height="260" role="img" aria-label="Physics-motivated off-center dipole surface-heating map"></canvas>
          <figcaption>Surface temperature proxy · longitude × colatitude</figcaption>
        </figure>
        <figure class="sim-figure">
          <svg data-lightcurve viewBox="0 0 520 240" role="img" aria-labelledby="curve-title curve-desc">
            <title id="curve-title">Computed X-ray pulse profile</title>
            <desc id="curve-desc" data-curve-description>Normalized flux over one stellar rotation.</desc>
            <text class="chart-title" x="55" y="15">Normalized bolometric flux</text>
            <g class="chart-grid"><path d="M55 50H500M55 95H500M55 140H500M55 185H500"/></g>
            <rect class="chart-frame" x="55" y="25" width="445" height="170"/>
            <path class="chart-line" data-curve-path d="M55 175 C130 50 205 175 278 60 S420 150 500 175"/>
            <line class="phase-guide" data-phase-guide x1="55" y1="25" x2="55" y2="195"/>
            <circle class="phase-dot" data-phase-dot cx="55" cy="175" r="5"/>
            <g class="chart-text"><text x="51" y="214">0</text><text x="272" y="214">0.5</text><text x="495" y="214">1</text><text x="245" y="233">Rotation phase</text></g>
          </svg>
          <figcaption>Relativistic forward calculation, updated with every control</figcaption>
        </figure>
      </div>
      <div class="sim-readout" aria-live="polite">
        <span>Compactness <strong data-readout="compactness">0.345</strong></span>
        <span>Pulsed fraction <strong data-readout="pulsedFraction">—</strong></span>
        <span>Heated surface <strong data-readout="heatedFraction">—</strong></span>
      </div>
      <p class="method-note">The surface map ports the off-center-dipole current prescription used in Huang & Chen (2025): open-field current is evaluated across the star and converted to a temperature proxy. The light curve integrates that nonuniform map with Schwarzschild light bending and Doppler boosting. This browser calculation uses generic parameters and is not an observational fit; the research pipeline additionally includes atmosphere spectra, exact ray-tracing tables, oblateness, time delays, and detector response.</p>
      <noscript><p class="method-note">JavaScript is required to change parameters; the initial curve above remains as a static illustration.</p></noscript>
    </div>
  </div>
</section>

<section class="section shell">
  <div class="section-heading">
    <p class="eyebrow">Selected work</p>
    <h2>Recent publications</h2>
  </div>
  <div class="selected-list">
    {% assign featured = site.data.publications | where: 'featured', true %}
    {% for paper in featured limit: 5 %}
    <article class="selected-paper">
      <span class="year">{{ paper.year }}</span>
      <h3><a href="{{ paper.url }}">{{ paper.title }}</a></h3>
      <span class="venue">{{ paper.venue }}</span>
    </article>
    {% endfor %}
  </div>
  <p><a class="plain-link" href="{{ '/publications/' | relative_url }}">View all publications</a></p>
</section>
