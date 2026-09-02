(function () {
  "use strict";

  var modelButtons = document.querySelectorAll(".model-button");
  var modelData = {
    shifted: {
      radius: "13.3 km",
      range: "16th–84th: 12.1–14.8 km",
      path: "M0 67 C30 66 41 27 67 25 S105 66 131 64 S174 34 199 35 S236 65 320 63",
      transform: "translateX(-2%) scale(1.02)",
      filter: "saturate(.95) contrast(1.08) hue-rotate(0deg)"
    },
    multipole: {
      radius: "13.5 km",
      range: "16th–84th: 12.2–16.1 km",
      path: "M0 69 C25 68 38 38 61 35 S91 54 110 58 S143 21 172 23 S203 58 223 59 S260 39 320 61",
      transform: "translateX(3%) scale(1.05)",
      filter: "saturate(1.15) contrast(1.12) hue-rotate(-12deg)"
    },
    centered: {
      radius: "17.5 km",
      range: "16th–84th: 16.0–19.4 km",
      path: "M0 69 C41 69 56 63 78 46 S111 17 144 19 S188 53 218 52 S259 27 320 48",
      transform: "translateY(-2%) scale(1.12)",
      filter: "saturate(1.3) contrast(1.15) hue-rotate(38deg)"
    }
  };
  var pulseLine = document.querySelector("[data-pulse-line]");
  var hotspotMap = document.querySelector("[data-hotspot-map]");
  var radiusValue = document.querySelector("[data-radius-value]");
  var radiusRange = document.querySelector("[data-radius-range]");
  var phaseSlider = document.querySelector("[data-phase-slider]");
  var phaseMarker = document.querySelector("[data-phase-marker]");

  function updatePhaseMarker() {
    if (!phaseSlider || !phaseMarker || !pulseLine) return;
    var length = pulseLine.getTotalLength();
    var point = pulseLine.getPointAtLength(length * (Number(phaseSlider.value) / 100));
    phaseMarker.setAttribute("cx", point.x.toFixed(1));
    phaseMarker.setAttribute("cy", point.y.toFixed(1));
    if (hotspotMap) hotspotMap.style.transform = "translateX(" + ((Number(phaseSlider.value) - 50) * .06).toFixed(1) + "%) scale(1.05)";
  }

  modelButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      modelButtons.forEach(function (item) {
        item.classList.remove("is-active");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("is-active");
      button.setAttribute("aria-pressed", "true");
      var selected = modelData[button.getAttribute("data-model")];
      if (selected && pulseLine) pulseLine.setAttribute("d", selected.path);
      if (selected && hotspotMap) {
        hotspotMap.style.transform = selected.transform;
        hotspotMap.style.filter = selected.filter;
      }
      if (selected && radiusValue) radiusValue.textContent = selected.radius;
      if (selected && radiusRange) radiusRange.textContent = selected.range;
      if (phaseSlider) phaseSlider.value = 0;
      window.requestAnimationFrame(updatePhaseMarker);
    });
  });

  if (phaseSlider) {
    phaseSlider.addEventListener("input", updatePhaseMarker);
    window.requestAnimationFrame(updatePhaseMarker);
  }

  var publicationBrowser = document.querySelector("[data-publication-browser]");
  if (publicationBrowser) {
    var activeFilters = { topic: "all", role: "all" };
    var filterButtons = publicationBrowser.querySelectorAll("[data-filter-group]");
    var searchInput = publicationBrowser.querySelector("[data-publication-search]");
    var publications = publicationBrowser.querySelectorAll("[data-publication]");
    var countOutput = publicationBrowser.querySelector("[data-publication-count]");
    var emptyOutput = publicationBrowser.querySelector("[data-publication-empty]");

    function filterPublications() {
      var query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      var visible = 0;
      publications.forEach(function (publication) {
        var topicMatch = activeFilters.topic === "all" || publication.getAttribute("data-topic") === activeFilters.topic;
        var roleMatch = activeFilters.role === "all" || publication.getAttribute("data-role") === activeFilters.role;
        var searchMatch = !query || publication.getAttribute("data-search").indexOf(query) !== -1;
        var show = topicMatch && roleMatch && searchMatch;
        publication.hidden = !show;
        if (show) visible += 1;
      });
      if (countOutput) countOutput.textContent = String(visible);
      if (emptyOutput) emptyOutput.hidden = visible !== 0;
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var group = button.getAttribute("data-filter-group");
        activeFilters[group] = button.getAttribute("data-filter-value");
        filterButtons.forEach(function (candidate) {
          if (candidate.getAttribute("data-filter-group") === group) {
            var active = candidate === button;
            candidate.classList.toggle("is-active", active);
            candidate.setAttribute("aria-pressed", active ? "true" : "false");
          }
        });
        filterPublications();
      });
    });

    if (searchInput) searchInput.addEventListener("input", filterPublications);
  }
})();
