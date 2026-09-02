---
layout: default
title: "Publications"
description: "Publications by Chun Huang in neutron-star astrophysics, X-ray modeling, dense matter, and scientific software."
permalink: /publications/
slug: publications
---

<header class="page-hero shell">
  <p class="eyebrow">Research record</p>
  <h1>Publications</h1>
  <div class="page-hero-grid">
    <p>Work across pulsar magnetospheres, X-ray pulse-profile modeling, dense matter, and open scientific software.</p>
    <div class="profile-links">
      <a href="https://scholar.google.com/citations?user=oNADiKYAAAAJ&hl=en">Google Scholar ↗</a>
      <a href="https://inspirehep.net/authors/2831773">INSPIRE HEP ↗</a>
      <a href="https://orcid.org/0000-0001-6406-1003">ORCID ↗</a>
    </div>
  </div>
</header>

<section class="publication-browser shell" data-publication-browser>
  <div class="publication-controls" aria-label="Filter publications">
    <fieldset>
      <legend>Topic</legend>
      <button class="filter-button is-active" type="button" data-filter-group="topic" data-filter-value="all" aria-pressed="true">All</button>
      <button class="filter-button" type="button" data-filter-group="topic" data-filter-value="Magnetospheres" aria-pressed="false">Magnetospheres</button>
      <button class="filter-button" type="button" data-filter-group="topic" data-filter-value="X-ray modeling" aria-pressed="false">X-ray</button>
      <button class="filter-button" type="button" data-filter-group="topic" data-filter-value="Dense matter" aria-pressed="false">Dense matter</button>
      <button class="filter-button" type="button" data-filter-group="topic" data-filter-value="Scientific software" aria-pressed="false">Software</button>
      <button class="filter-button" type="button" data-filter-group="topic" data-filter-value="Earlier work" aria-pressed="false">Earlier work</button>
    </fieldset>
    <fieldset>
      <legend>Contribution</legend>
      <button class="filter-button is-active" type="button" data-filter-group="role" data-filter-value="all" aria-pressed="true">All</button>
      <button class="filter-button" type="button" data-filter-group="role" data-filter-value="First author" aria-pressed="false">First author</button>
      <button class="filter-button" type="button" data-filter-group="role" data-filter-value="Mentored" aria-pressed="false">Mentored</button>
      <button class="filter-button" type="button" data-filter-group="role" data-filter-value="Collaborative" aria-pressed="false">Collaborative</button>
    </fieldset>
    <label class="publication-search">Search titles and authors<input type="search" placeholder="e.g. hotspot, radius, GPU" data-publication-search></label>
  </div>

  <p class="publication-count" aria-live="polite"><strong data-publication-count>{{ site.data.publications | size }}</strong> publications shown</p>
  <ol class="publication-list">
    {% for paper in site.data.publications %}
    <li class="publication-item{% if paper.featured %} is-featured{% endif %}" data-publication data-topic="{{ paper.topic }}" data-role="{{ paper.role }}" data-search="{{ paper.title | downcase }} {{ paper.authors | downcase }} {{ paper.venue | downcase }}">
      <div class="publication-year">{{ paper.year }}</div>
      <div>
        <div class="publication-meta"><span>{{ paper.topic }}</span><span>{{ paper.role }}</span>{% if paper.featured %}<span class="featured-label">Selected</span>{% endif %}</div>
        <h2><a href="{{ paper.url }}">{{ paper.title }}</a></h2>
        <p class="publication-authors">{{ paper.authors }}</p>
        <p class="publication-venue">{{ paper.venue }}</p>
      </div>
    </li>
    {% endfor %}
  </ol>
  <p class="publication-empty" data-publication-empty hidden>No publications match these filters. Try a broader topic or clear the search.</p>
</section>
