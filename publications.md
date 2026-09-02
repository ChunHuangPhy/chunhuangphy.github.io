---
layout: page
title: "Publications"
description: "Publications by Chun Huang in neutron-star physics, pulsar magnetospheres, X-ray modeling, and dense-matter inference."
permalink: /publications/
slug: publications
---

<header class="page-head">
  <div class="shell">
    <p class="eyebrow">Publications</p>
    <h1>Research papers</h1>
    <p class="lede">Work on pulsar magnetospheres, X-ray pulse-profile modeling, dense matter, Bayesian inference, and scientific software.</p>
    <p><a href="https://scholar.google.com/citations?user=oNADiKYAAAAJ&hl=en">Google Scholar</a> · <a href="https://inspirehep.net/authors/2831773?ui-citation-summary=true">INSPIRE-HEP</a></p>
  </div>
</header>

<section class="shell" data-publications>
  <div class="publication-tools">
    <label>Search
      <input type="search" data-publication-search placeholder="Search by title" autocomplete="off">
    </label>
  </div>
  <p class="publication-count" data-publication-count aria-live="polite">{{ site.data.publications | size }} publications</p>

  <div class="publication-list">
    {% assign papers = site.data.publications | sort: 'year' | reverse %}
    {% for paper in papers %}
    <article class="publication-item" data-search="{{ paper.title | downcase | escape }}">
      <span class="publication-year">{{ paper.year }}</span>
      <div>
        <h2><a href="{{ paper.url }}">{{ paper.title }}</a></h2>
      </div>
    </article>
    {% endfor %}
  </div>
</section>
