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
      <input type="search" data-publication-search placeholder="Title or author">
    </label>
    <label>Topic
      <select data-publication-filter="topic">
        <option value="">All topics</option>
        {% assign topics = site.data.publications | map: 'topic' | uniq | sort %}
        {% for topic in topics %}<option value="{{ topic | downcase }}">{{ topic }}</option>{% endfor %}
      </select>
    </label>
    <label>Year
      <select data-publication-filter="year">
        <option value="">All years</option>
        {% assign years = site.data.publications | map: 'year' | uniq | sort | reverse %}
        {% for year in years %}<option value="{{ year }}">{{ year }}</option>{% endfor %}
      </select>
    </label>
    <label>Role
      <select data-publication-filter="role">
        <option value="">All roles</option>
        {% assign roles = site.data.publications | map: 'role' | uniq | sort %}
        {% for role in roles %}<option value="{{ role | downcase }}">{{ role }}</option>{% endfor %}
      </select>
    </label>
  </div>
  <p class="publication-count" data-publication-count aria-live="polite">{{ site.data.publications | size }} publications</p>

  <div class="publication-list">
    {% assign papers = site.data.publications | sort: 'year' | reverse %}
    {% for paper in papers %}
    <article class="publication-item" data-topic="{{ paper.topic | downcase }}" data-year="{{ paper.year }}" data-role="{{ paper.role | downcase }}" data-search="{{ paper.title | append: ' ' | append: paper.authors | downcase | escape }}">
      <span class="publication-year">{{ paper.year }}</span>
      <div>
        <h2><a href="{{ paper.url }}">{{ paper.title }}</a></h2>
        <p class="publication-authors">{{ paper.authors }}</p>
        <p class="publication-meta">{{ paper.venue }} · {{ paper.role }}</p>
      </div>
    </article>
    {% endfor %}
  </div>
</section>
