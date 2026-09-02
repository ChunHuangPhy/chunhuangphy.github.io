(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var TWO_PI = 2 * Math.PI;
  var C_KM_S = 299792.458;
  var SCHWARZSCHILD_KM_PER_SOLAR_MASS = 2.95325008;

  function radians(degrees) {
    return degrees * Math.PI / 180;
  }

  function clamp(value, low, high) {
    return Math.max(low, Math.min(high, value));
  }

  function makeCircularCap(theta, longitude, radius, rings, azimuths) {
    var center = [
      Math.sin(theta) * Math.cos(longitude),
      Math.sin(theta) * Math.sin(longitude),
      Math.cos(theta)
    ];
    var eTheta = [
      Math.cos(theta) * Math.cos(longitude),
      Math.cos(theta) * Math.sin(longitude),
      -Math.sin(theta)
    ];
    var ePhi = [-Math.sin(longitude), Math.cos(longitude), 0];
    var points = [];

    // Uniform steps in cos(gamma) give equal-area samples over the circular cap.
    for (var ring = 0; ring < rings; ring += 1) {
      var fraction = (ring + 0.5) / rings;
      var cosGamma = 1 - fraction * (1 - Math.cos(radius));
      var sinGamma = Math.sqrt(Math.max(0, 1 - cosGamma * cosGamma));
      for (var az = 0; az < azimuths; az += 1) {
        var eta = TWO_PI * (az + 0.5 * (ring % 2)) / azimuths;
        var tangent = [
          eTheta[0] * Math.cos(eta) + ePhi[0] * Math.sin(eta),
          eTheta[1] * Math.cos(eta) + ePhi[1] * Math.sin(eta),
          eTheta[2] * Math.cos(eta) + ePhi[2] * Math.sin(eta)
        ];
        points.push([
          center[0] * cosGamma + tangent[0] * sinGamma,
          center[1] * cosGamma + tangent[1] * sinGamma,
          center[2] * cosGamma + tangent[2] * sinGamma
        ]);
      }
    }
    return points;
  }

  function makeHotspots(parameters) {
    var theta = radians(parameters.colatitude);
    var radius = radians(parameters.spotRadius);
    var samples = makeCircularCap(theta, 0, radius, 10, 18);
    if (parameters.antipodal) {
      samples = samples.concat(makeCircularCap(Math.PI - theta, Math.PI, radius, 10, 18));
    }
    return samples;
  }

  function rotateZ(point, angle) {
    var cosAngle = Math.cos(angle);
    var sinAngle = Math.sin(angle);
    return [
      point[0] * cosAngle - point[1] * sinAngle,
      point[0] * sinAngle + point[1] * cosAngle,
      point[2]
    ];
  }

  function sampleFlux(point, phase, parameters, compactness) {
    var normal = rotateZ(point, TWO_PI * phase);
    var inclination = radians(parameters.inclination);
    var sinInclination = Math.sin(inclination);
    var cosInclination = Math.cos(inclination);
    var cosPsi = clamp(normal[0] * sinInclination + normal[2] * cosInclination, -1, 1);

    // Beloborodov's fast Schwarzschild relation: cos(alpha) ≈ u + (1-u)cos(psi).
    var cosAlpha = compactness + (1 - compactness) * cosPsi;
    if (cosAlpha <= 0) return 0;

    var sinPsi = Math.sqrt(Math.max(0, 1 - cosPsi * cosPsi));
    var sinAlpha = Math.sqrt(Math.max(0, 1 - cosAlpha * cosAlpha));
    var sinAlphaOverSinPsi = sinPsi < 1e-8 ? Math.sqrt(1 - compactness) : sinAlpha / sinPsi;
    var surfaceSinTheta = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1]);
    var beta = TWO_PI * parameters.spin * parameters.radius * surfaceSinTheta /
      (C_KM_S * Math.sqrt(1 - compactness));
    beta = clamp(beta, 0, 0.35);
    var gamma = 1 / Math.sqrt(1 - beta * beta);
    var surfaceLongitude = Math.atan2(normal[1], normal[0]);
    var cosXi = -sinAlphaOverSinPsi * sinInclination * Math.sin(surfaceLongitude);
    var doppler = 1 / (gamma * (1 - beta * cosXi));

    // Mirrors the geometric factors in the research forward model. Constants that
    // cancel when the curve is normalized (distance, area, redshift) are omitted.
    return cosAlpha * (1 - compactness) * Math.pow(doppler, 4);
  }

  function computeLightcurve(samples, parameters) {
    var compactness = SCHWARZSCHILD_KM_PER_SOLAR_MASS * parameters.mass / parameters.radius;
    var values = [];
    var phaseBins = 96;
    for (var bin = 0; bin <= phaseBins; bin += 1) {
      var phase = bin / phaseBins;
      var sum = 0;
      for (var index = 0; index < samples.length; index += 1) {
        sum += sampleFlux(samples[index], phase, parameters, compactness);
      }
      values.push(sum / samples.length);
    }
    var mean = values.slice(0, -1).reduce(function (total, value) {
      return total + value;
    }, 0) / phaseBins;
    if (!(mean > 0)) mean = 1;
    return {
      compactness: compactness,
      values: values.map(function (value) { return value / mean; })
    };
  }

  function curvePoint(values, phase) {
    var scaled = clamp(phase, 0, 1) * (values.length - 1);
    var lower = Math.floor(scaled);
    var upper = Math.min(values.length - 1, lower + 1);
    var blend = scaled - lower;
    return values[lower] * (1 - blend) + values[upper] * blend;
  }

  function drawCurve(root, values, phase) {
    var path = root.querySelector("[data-curve-path]");
    var guide = root.querySelector("[data-phase-guide]");
    var dot = root.querySelector("[data-phase-dot]");
    var description = root.querySelector("[data-curve-description]");
    var left = 55;
    var right = 500;
    var top = 25;
    var bottom = 195;
    var maximum = Math.max.apply(null, values);
    var yMax = Math.max(1.1, maximum * 1.08);
    var commands = values.map(function (value, index) {
      var x = left + (right - left) * index / (values.length - 1);
      var y = bottom - (bottom - top) * value / yMax;
      return (index === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2);
    });
    path.setAttribute("d", commands.join(" "));

    var markerX = left + (right - left) * phase;
    var markerValue = curvePoint(values, phase);
    var markerY = bottom - (bottom - top) * markerValue / yMax;
    guide.setAttribute("x1", markerX.toFixed(2));
    guide.setAttribute("x2", markerX.toFixed(2));
    dot.setAttribute("cx", markerX.toFixed(2));
    dot.setAttribute("cy", markerY.toFixed(2));
    description.textContent = "Computed normalized flux over one rotation; flux at phase " +
      phase.toFixed(2) + " is " + markerValue.toFixed(2) + " times the mean.";
  }

  function drawStar(root, samples, parameters) {
    var layer = root.querySelector("[data-spot-layer]");
    var axis = root.querySelector("[data-star-axis]");
    var inclination = radians(parameters.inclination);
    var phaseAngle = TWO_PI * parameters.phase;
    var fragment = document.createDocumentFragment();
    var visible = 0;

    samples.forEach(function (sample) {
      var normal = rotateZ(sample, phaseAngle);
      var lineOfSight = normal[0] * Math.sin(inclination) + normal[2] * Math.cos(inclination);
      var screenX = normal[1];
      var screenY = -normal[0] * Math.cos(inclination) + normal[2] * Math.sin(inclination);
      var circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("cx", (140 + 108 * screenX).toFixed(2));
      circle.setAttribute("cy", (140 - 108 * screenY).toFixed(2));
      circle.setAttribute("r", "2.1");
      circle.setAttribute("class", lineOfSight >= 0 ? "spot-sample" : "spot-sample far");
      fragment.appendChild(circle);
      if (lineOfSight >= 0) visible += 1;
    });
    layer.replaceChildren(fragment);

    var projectedAxis = 108 * Math.sin(inclination);
    axis.setAttribute("y1", (140 + projectedAxis).toFixed(2));
    axis.setAttribute("y2", (140 - projectedAxis).toFixed(2));
    return visible;
  }

  function initializeSimulator() {
    var root = document.querySelector("[data-pulse-simulator]");
    if (!root) return;
    var inputs = {};
    root.querySelectorAll("[data-parameter]").forEach(function (input) {
      inputs[input.getAttribute("data-parameter")] = input;
    });
    var scheduled = false;

    function parametersFromInputs() {
      return {
        mass: Number(inputs.mass.value),
        radius: Number(inputs.radius.value),
        inclination: Number(inputs.inclination.value),
        colatitude: Number(inputs.colatitude.value),
        spotRadius: Number(inputs.spotRadius.value),
        spin: Number(inputs.spin.value),
        phase: Number(inputs.phase.value),
        antipodal: inputs.antipodal.checked
      };
    }

    function setOutput(name, text) {
      var output = root.querySelector('[data-output="' + name + '"]');
      if (output) output.textContent = text;
    }

    function render() {
      scheduled = false;
      var parameters = parametersFromInputs();
      setOutput("mass", parameters.mass.toFixed(2).replace(/0$/, "") + " M☉");
      setOutput("radius", parameters.radius.toFixed(1) + " km");
      setOutput("inclination", parameters.inclination.toFixed(0) + "°");
      setOutput("colatitude", parameters.colatitude.toFixed(0) + "°");
      setOutput("spotRadius", parameters.spotRadius.toFixed(0) + "°");
      setOutput("spin", parameters.spin.toFixed(0) + " Hz");
      setOutput("phase", parameters.phase.toFixed(2));

      var samples = makeHotspots(parameters);
      var result = computeLightcurve(samples, parameters);
      drawCurve(root, result.values, parameters.phase);
      var visible = drawStar(root, samples, parameters);
      var maximum = Math.max.apply(null, result.values);
      var minimum = Math.min.apply(null, result.values);
      var pulsedFraction = (maximum - minimum) / (maximum + minimum);
      root.querySelector('[data-readout="compactness"]').textContent = result.compactness.toFixed(3);
      root.querySelector('[data-readout="pulsedFraction"]').textContent = (100 * pulsedFraction).toFixed(1) + "%";
      root.querySelector('[data-readout="visibleSamples"]').textContent = visible + " / " + samples.length;
    }

    function scheduleRender() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(render);
    }

    root.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("input", scheduleRender);
      input.addEventListener("change", scheduleRender);
    });
    render();
  }

  function initializePublicationFilters() {
    var root = document.querySelector("[data-publications]");
    if (!root) return;
    var search = root.querySelector("[data-publication-search]");
    var filters = root.querySelectorAll("[data-publication-filter]");
    var items = Array.prototype.slice.call(root.querySelectorAll(".publication-item"));
    var count = root.querySelector("[data-publication-count]");

    function applyFilters() {
      var query = search.value.trim().toLowerCase();
      var visible = 0;
      items.forEach(function (item) {
        var matchesSearch = !query || item.getAttribute("data-search").indexOf(query) !== -1;
        var matchesFilters = Array.prototype.every.call(filters, function (filter) {
          var value = filter.value;
          var field = filter.getAttribute("data-publication-filter");
          return !value || item.getAttribute("data-" + field) === value;
        });
        item.hidden = !(matchesSearch && matchesFilters);
        if (!item.hidden) visible += 1;
      });
      count.textContent = visible + (visible === 1 ? " publication" : " publications");
    }

    search.addEventListener("input", applyFilters);
    filters.forEach(function (filter) { filter.addEventListener("change", applyFilters); });
  }

  // Keep the numerical core inspectable and testable independently of the page.
  window.PulseProfileModel = Object.freeze({
    makeHotspots: makeHotspots,
    computeLightcurve: computeLightcurve
  });

  document.addEventListener("DOMContentLoaded", function () {
    initializeSimulator();
    initializePublicationFilters();
  });
}());
