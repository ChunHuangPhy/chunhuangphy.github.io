---
layout: page
title: "Chun Huang"
description: "Chun Huang is a physicist studying neutron-star magnetospheres, X-ray pulse profiles, Bayesian inference, and dense matter."
permalink: /
slug: home
---

<section class="shell home-intro">
  <div>
    <p class="eyebrow">Neutron-star physics</p>
    <h1>From magnetosphere to dense matter.</h1>
    <p class="lede">I connect physical models of pulsar magnetospheres to X-ray pulse profiles and multimessenger inference, using observations of a star’s surface to study matter at extreme density.</p>
    <p class="availability">Ph.D. candidate at Washington University · seeking postdoctoral positions beginning in 2027</p>
    <div class="intro-links">
      <a href="{{ '/research/' | relative_url }}">Research</a>
      <a href="{{ '/publications/' | relative_url }}">Publications</a>
      <a href="mailto:chun.h@wustl.edu">Contact</a>
    </div>
  </div>
  <figure class="portrait">
    <img src="{{ '/assets/images/chun-huang-portrait.jpg' | relative_url }}" alt="Portrait of Chun Huang" width="800" height="1000">
    <figcaption>Washington University in St. Louis</figcaption>
  </figure>
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
    <p class="eyebrow">Interactive model</p>
    <h2>Build a hotspot and compute its pulse profile</h2>
    <p>Change the star, viewing angle, or emitting region. The surface view and normalized light curve are recomputed in your browser from the selected geometry.</p>
  </div>
  <div class="simulator-layout">
    <form class="sim-controls" aria-label="Hotspot model parameters">
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
      <label class="sim-control" for="sim-colatitude">
        <span class="control-row"><span>Spot colatitude</span><output for="sim-colatitude" data-output="colatitude">45°</output></span>
        <input id="sim-colatitude" data-parameter="colatitude" type="range" min="5" max="90" value="45" step="1">
      </label>
      <label class="sim-control" for="sim-spot-radius">
        <span class="control-row"><span>Spot radius</span><output for="sim-spot-radius" data-output="spotRadius">18°</output></span>
        <input id="sim-spot-radius" data-parameter="spotRadius" type="range" min="4" max="40" value="18" step="1">
      </label>
      <label class="sim-control" for="sim-spin">
        <span class="control-row"><span>Spin frequency</span><output for="sim-spin" data-output="spin">300 Hz</output></span>
        <input id="sim-spin" data-parameter="spin" type="range" min="0" max="700" value="300" step="10">
      </label>
      <label class="sim-control" for="sim-phase">
        <span class="control-row"><span>Rotation phase</span><output for="sim-phase" data-output="phase">0.00</output></span>
        <input id="sim-phase" data-parameter="phase" type="range" min="0" max="1" value="0" step="0.01">
      </label>
      <label class="sim-check"><input data-parameter="antipodal" type="checkbox" checked> Add antipodal spot</label>
    </form>

    <div class="sim-results">
      <div class="sim-figures">
        <figure class="sim-figure">
          <svg data-star-view viewBox="0 0 280 280" role="img" aria-labelledby="star-view-title star-view-desc">
            <title id="star-view-title">Neutron-star hotspot geometry</title>
            <desc id="star-view-desc">Projected stellar surface and emitting regions at the selected rotation phase.</desc>
            <defs><clipPath id="star-clip"><circle cx="140" cy="140" r="112"/></clipPath></defs>
            <circle class="star-disc" cx="140" cy="140" r="112"/>
            <g class="star-grid" clip-path="url(#star-clip)">
              <ellipse cx="140" cy="140" rx="112" ry="40"/>
              <ellipse cx="140" cy="140" rx="52" ry="112"/>
              <path d="M28 140H252"/>
            </g>
            <line class="star-axis" data-star-axis x1="140" y1="24" x2="140" y2="256"/>
            <g data-spot-layer clip-path="url(#star-clip)"></g>
          </svg>
          <figcaption>Projected surface at the selected phase</figcaption>
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
        <span>Visible samples <strong data-readout="visibleSamples">—</strong></span>
      </div>
      <p class="method-note">This educational forward model numerically integrates circular surface elements over a Schwarzschild star, using a fast light-bending approximation and special-relativistic Doppler boosting. It is recomputed from the controls; it is not a fit to observational data and does not reproduce the full atmosphere, detector-response, oblateness, or time-delay treatment used in research inference.</p>
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
