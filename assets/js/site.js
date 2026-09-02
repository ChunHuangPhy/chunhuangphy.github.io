(function () {
  "use strict";

  var TWO_PI = 2 * Math.PI;
  var C_KM_S = 299792.458;
  var RS_SUN_KM = 2.9532501;
  var SQRT_KM3_GMSUN = 2.745011592867327e-6;
  var SQRT_3_HALVES = 1.224744871391589;
  var FD_EPS = 1e-3;

  function radians(degrees) {
    return degrees * Math.PI / 180;
  }

  function clamp(value, low, high) {
    return Math.max(low, Math.min(high, value));
  }

  function wrapPi(value) {
    var wrapped = value;
    if (wrapped > Math.PI) wrapped -= TWO_PI;
    if (wrapped < -Math.PI) wrapped += TWO_PI;
    return wrapped;
  }

  function besselJ0(x) {
    var z = x * x * 0.25;
    var sum = 1;
    var term = 1;
    for (var k = 1; k < 14; k += 1) {
      term = -term * z / (k * k);
      sum += term;
    }
    return sum;
  }

  function besselJ1(x) {
    var z = x * x * 0.25;
    var sum = 1;
    var term = 1;
    for (var k = 1; k < 14; k += 1) {
      term = -term * z / (k * (k + 1));
      sum += term;
    }
    return sum * x * 0.5;
  }

  function shiftedPoint(radius, theta, phi, obliquity, offsetX, offsetY, offsetZ) {
    var sinTheta = Math.sin(theta);
    var x = radius * sinTheta * Math.cos(phi) - offsetX;
    var y = radius * sinTheta * Math.sin(phi) - offsetY;
    var z = radius * Math.cos(theta) - offsetZ;
    var shiftedRadius = Math.max(Math.sqrt(x * x + y * y + z * z), 1e-4);
    var cosTheta = z / shiftedRadius;
    var shiftedSinTheta = Math.sqrt(Math.max(0, 1 - cosTheta * cosTheta));
    var denominator = Math.max(shiftedRadius * shiftedSinTheta, 1e-4);
    var cosPhi = x / denominator;
    var sinPhi = y / denominator;
    var cosMagneticTheta = cosTheta * Math.cos(obliquity) +
      shiftedSinTheta * cosPhi * Math.sin(obliquity);
    return {
      radius: shiftedRadius,
      cosTheta: cosTheta,
      sinTheta: shiftedSinTheta,
      cosPhi: cosPhi,
      sinPhi: sinPhi,
      cosMagneticTheta: cosMagneticTheta
    };
  }

  function alphaAt(radius, theta, phi, parameters) {
    var point = shiftedPoint(
      radius, theta, phi, radians(parameters.obliquity),
      parameters.offsetX, parameters.offsetY, parameters.offsetZ
    );
    var sinSquared = Math.max(0, 1 - point.cosMagneticTheta * point.cosMagneticTheta);
    return -sinSquared / point.radius;
  }

  function betaAt(radius, theta, phi, parameters) {
    var obliquity = radians(parameters.obliquity);
    var point = shiftedPoint(
      radius, theta, phi, obliquity,
      parameters.offsetX, parameters.offsetY, parameters.offsetZ
    );
    var numerator = -point.sinTheta * point.sinPhi;
    var denominator = -point.sinTheta * point.cosPhi * Math.cos(obliquity) +
      point.cosTheta * Math.sin(obliquity);
    return Math.atan2(numerator, denominator);
  }

  function alpha0Dimensionless(parameters) {
    var omegaRadius = TWO_PI * parameters.spin * parameters.radius / C_KM_S;
    var sinObliquity = Math.sin(radians(parameters.obliquity));
    return SQRT_3_HALVES * omegaRadius * (1 + 0.2 * sinObliquity * sinObliquity);
  }

  function surfaceRedshift(parameters, theta) {
    var schwarzschildRadius = parameters.mass * RS_SUN_KM;
    var compactX = 0.5 * schwarzschildRadius / parameters.radius;
    var omegaBar = TWO_PI * parameters.spin *
      Math.sqrt(Math.pow(parameters.radius, 3) / parameters.mass) * SQRT_KM3_GMSUN;
    var oblateness = omegaBar * omegaBar * (-0.788 + 1.030 * compactX);
    var cosTheta = Math.cos(theta);
    var localRadius = parameters.radius * (1 + oblateness * cosTheta * cosTheta);
    return Math.sqrt(Math.max(1 - schwarzschildRadius / localRadius, 1e-12));
  }

  function lambdaCurrent(absAlpha, beta, magneticCosine, alpha0, obliquity) {
    var ratio = clamp(absAlpha / alpha0, 0, 1);
    var chi = 2 * Math.asin(Math.sqrt(ratio));
    var sign = magneticCosine > 0 ? -1 : 1;
    return sign * 2 * (
      besselJ0(chi) * Math.cos(obliquity) -
      sign * besselJ1(chi) * Math.cos(beta) * Math.sin(obliquity)
    );
  }

  function chargeDensity(radius, theta, phi, parameters) {
    var obliquity = radians(parameters.obliquity);
    var point = shiftedPoint(
      radius, theta, phi, obliquity,
      parameters.offsetX, parameters.offsetY, parameters.offsetZ
    );
    return -(3 * point.cosMagneticTheta * point.cosTheta - Math.cos(obliquity)) /
      Math.pow(point.radius, 3);
  }

  function surfaceCurrentMagnitude(theta, phi, parameters) {
    var radius = 1;
    var alpha = alphaAt(radius, theta, phi, parameters);
    var absAlpha = Math.abs(alpha);
    var alpha0 = alpha0Dimensionless(parameters);
    if (!(alpha0 > 0) || absAlpha >= alpha0) return 0;

    var obliquity = radians(parameters.obliquity);
    var point = shiftedPoint(
      radius, theta, phi, obliquity,
      parameters.offsetX, parameters.offsetY, parameters.offsetZ
    );
    var beta = betaAt(radius, theta, phi, parameters);
    var epsilon = FD_EPS;

    var daDr = (alphaAt(radius + epsilon, theta, phi, parameters) -
      alphaAt(radius - epsilon, theta, phi, parameters)) / (2 * epsilon);
    var daDTheta = (alphaAt(radius, theta + epsilon, phi, parameters) -
      alphaAt(radius, theta - epsilon, phi, parameters)) / (2 * epsilon);
    var daDPhi = (alphaAt(radius, theta, phi + epsilon, parameters) -
      alphaAt(radius, theta, phi - epsilon, parameters)) / (2 * epsilon);
    var dbDr = wrapPi(
      betaAt(radius + epsilon, theta, phi, parameters) -
      betaAt(radius - epsilon, theta, phi, parameters)
    ) / (2 * epsilon);
    var dbDTheta = wrapPi(
      betaAt(radius, theta + epsilon, phi, parameters) -
      betaAt(radius, theta - epsilon, phi, parameters)
    ) / (2 * epsilon);
    var dbDPhi = wrapPi(
      betaAt(radius, theta, phi + epsilon, parameters) -
      betaAt(radius, theta, phi - epsilon, parameters)
    ) / (2 * epsilon);

    var lambda = lambdaCurrent(absAlpha, beta, point.cosMagneticTheta, alpha0, obliquity);
    var sinTheta = Math.max(Math.sin(theta), 1e-4);
    var inverseRadialMetric = 1 / Math.max(surfaceRedshift(parameters, theta), 1e-4);
    var currentR = lambda * (daDTheta * dbDPhi - daDPhi * dbDTheta) /
      (inverseRadialMetric * radius * sinTheta);
    var currentTheta = lambda * (daDPhi * dbDr - daDr * dbDPhi) /
      (radius * sinTheta);
    var currentPhi = lambda * (daDr * dbDTheta - daDTheta * dbDr) / radius;
    var currentMagnitude = Math.sqrt(
      currentR * currentR + currentTheta * currentTheta + currentPhi * currentPhi
    );
    var densityMagnitude = Math.abs(chargeDensity(radius, theta, phi, parameters));
    return currentMagnitude > densityMagnitude && Number.isFinite(currentMagnitude) ?
      currentMagnitude : 0;
  }

  function generateHeatingMap(parameters) {
    var thetaBins = 44;
    var phiBins = 88;
    var cells = [];
    var maximumBrightness = 0;
    var heatedArea = 0;
    var totalArea = 0;

    for (var thetaIndex = 0; thetaIndex < thetaBins; thetaIndex += 1) {
      var theta = Math.PI * (thetaIndex + 0.5) / thetaBins;
      var areaWeight = Math.sin(theta);
      for (var phiIndex = 0; phiIndex < phiBins; phiIndex += 1) {
        var phi = -Math.PI + TWO_PI * (phiIndex + 0.5) / phiBins;
        var brightness = surfaceCurrentMagnitude(theta, phi, parameters);
        maximumBrightness = Math.max(maximumBrightness, brightness);
        totalArea += areaWeight;
        if (brightness > 0) heatedArea += areaWeight;
        cells.push({
          theta: theta,
          phi: phi,
          thetaIndex: thetaIndex,
          phiIndex: phiIndex,
          areaWeight: areaWeight,
          brightness: brightness
        });
      }
    }

    if (!(maximumBrightness > 0)) maximumBrightness = 1;
    cells.forEach(function (cell) {
      cell.relativeBrightness = cell.brightness / maximumBrightness;
      cell.temperature = Math.pow(cell.relativeBrightness, 0.25);
    });
    return {
      cells: cells,
      thetaBins: thetaBins,
      phiBins: phiBins,
      heatedFraction: heatedArea / totalArea
    };
  }

  function cellFlux(cell, phase, parameters, compactness) {
    if (!(cell.relativeBrightness > 0)) return 0;
    var rotatingLongitude = cell.phi + TWO_PI * phase;
    var sinTheta = Math.sin(cell.theta);
    var normalX = sinTheta * Math.cos(rotatingLongitude);
    var normalY = sinTheta * Math.sin(rotatingLongitude);
    var normalZ = Math.cos(cell.theta);
    var inclination = radians(parameters.inclination);
    var sinInclination = Math.sin(inclination);
    var cosPsi = clamp(normalX * sinInclination + normalZ * Math.cos(inclination), -1, 1);

    // Fast Schwarzschild light-bending relation used for the browser calculation.
    var cosAlpha = compactness + (1 - compactness) * cosPsi;
    if (cosAlpha <= 0) return 0;

    var sinPsi = Math.sqrt(Math.max(0, 1 - cosPsi * cosPsi));
    var sinAlpha = Math.sqrt(Math.max(0, 1 - cosAlpha * cosAlpha));
    var angleRatio = sinPsi < 1e-8 ? Math.sqrt(1 - compactness) : sinAlpha / sinPsi;
    var beta = TWO_PI * parameters.spin * parameters.radius * sinTheta /
      (C_KM_S * Math.sqrt(1 - compactness));
    beta = clamp(beta, 0, 0.35);
    var gamma = 1 / Math.sqrt(1 - beta * beta);
    var cosXi = -angleRatio * sinInclination * Math.sin(rotatingLongitude);
    var doppler = 1 / (gamma * (1 - beta * cosXi));

    // T^4 is proportional to the current-powered brightness in this map.
    return cell.relativeBrightness * cell.areaWeight * cosAlpha *
      (1 - compactness) * Math.pow(doppler, 4);
  }

  function computeLightcurve(heatingMap, parameters) {
    var compactness = RS_SUN_KM * parameters.mass / parameters.radius;
    var phaseBins = 96;
    var values = [];
    for (var phaseIndex = 0; phaseIndex <= phaseBins; phaseIndex += 1) {
      var phase = phaseIndex / phaseBins;
      var flux = 0;
      heatingMap.cells.forEach(function (cell) {
        flux += cellFlux(cell, phase, parameters, compactness);
      });
      values.push(flux);
    }
    var mean = values.slice(0, -1).reduce(function (sum, value) {
      return sum + value;
    }, 0) / phaseBins;
    if (!(mean > 0)) mean = 1;
    return {
      compactness: compactness,
      values: values.map(function (value) { return value / mean; })
    };
  }

  function interpolateColor(a, b, amount) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * amount),
      Math.round(a[1] + (b[1] - a[1]) * amount),
      Math.round(a[2] + (b[2] - a[2]) * amount)
    ];
  }

  function heatColor(value) {
    var stops = [
      [13, 24, 31],
      [24, 83, 96],
      [55, 145, 151],
      [210, 112, 61],
      [252, 231, 177]
    ];
    var scaled = clamp(value, 0, 1) * (stops.length - 1);
    var lower = Math.floor(scaled);
    var upper = Math.min(stops.length - 1, lower + 1);
    var color = interpolateColor(stops[lower], stops[upper], scaled - lower);
    return "rgb(" + color.join(",") + ")";
  }

  function drawHeatingMap(canvas, heatingMap, phase) {
    var context = canvas.getContext("2d");
    if (!context) return;
    var width = canvas.width;
    var height = canvas.height;
    var left = 42;
    var right = width - 12;
    var top = 14;
    var bottom = height - 34;
    var plotWidth = right - left;
    var plotHeight = bottom - top;
    var cellWidth = plotWidth / heatingMap.phiBins;
    var cellHeight = plotHeight / heatingMap.thetaBins;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "#0d181f";
    context.fillRect(0, 0, width, height);
    heatingMap.cells.forEach(function (cell) {
      context.fillStyle = heatColor(Math.pow(cell.temperature, 0.72));
      context.fillRect(
        left + cell.phiIndex * cellWidth,
        top + cell.thetaIndex * cellHeight,
        Math.ceil(cellWidth + 0.35),
        Math.ceil(cellHeight + 0.35)
      );
    });

    context.strokeStyle = "rgba(255,255,255,.25)";
    context.lineWidth = 1;
    context.setLineDash([]);
    [0.25, 0.5, 0.75].forEach(function (fraction) {
      context.beginPath();
      context.moveTo(left, top + fraction * plotHeight);
      context.lineTo(right, top + fraction * plotHeight);
      context.stroke();
    });
    [0.25, 0.5, 0.75].forEach(function (fraction) {
      context.beginPath();
      context.moveTo(left + fraction * plotWidth, top);
      context.lineTo(left + fraction * plotWidth, bottom);
      context.stroke();
    });

    var observerLongitude = ((-TWO_PI * phase + Math.PI) % TWO_PI + TWO_PI) % TWO_PI - Math.PI;
    var observerX = left + (observerLongitude + Math.PI) / TWO_PI * plotWidth;
    context.strokeStyle = "rgba(255,255,255,.9)";
    context.lineWidth = 1.5;
    context.setLineDash([5, 4]);
    context.beginPath();
    context.moveTo(observerX, top);
    context.lineTo(observerX, bottom);
    context.stroke();
    context.setLineDash([]);

    context.fillStyle = "rgba(255,255,255,.72)";
    context.font = "12px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
    context.textAlign = "center";
    context.fillText("−π", left, height - 11);
    context.fillText("0", left + plotWidth / 2, height - 11);
    context.fillText("π", right, height - 11);
    context.textAlign = "right";
    context.fillText("0", left - 8, top + 4);
    context.fillText("π/2", left - 8, top + plotHeight / 2 + 4);
    context.fillText("π", left - 8, bottom + 4);
    canvas.setAttribute(
      "aria-label",
      "Off-center dipole surface-heating map. " +
      (100 * heatingMap.heatedFraction).toFixed(1) +
      " percent of the sampled surface is heated; dashed line marks the observer-facing longitude."
    );
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

  function initializeSimulator() {
    var root = document.querySelector("[data-pulse-simulator]");
    if (!root) return;
    var inputs = {};
    root.querySelectorAll("[data-parameter]").forEach(function (input) {
      inputs[input.getAttribute("data-parameter")] = input;
    });
    var scheduled = false;
    var cachedSignature = "";
    var cachedMap = null;
    var cachedCurve = null;

    function parametersFromInputs() {
      return {
        obliquity: Number(inputs.obliquity.value),
        offsetX: Number(inputs.offsetX.value),
        offsetY: Number(inputs.offsetY.value),
        offsetZ: Number(inputs.offsetZ.value),
        mass: Number(inputs.mass.value),
        radius: Number(inputs.radius.value),
        inclination: Number(inputs.inclination.value),
        spin: Number(inputs.spin.value),
        phase: Number(inputs.phase.value)
      };
    }

    function setOutput(name, text) {
      var output = root.querySelector('[data-output="' + name + '"]');
      if (output) output.textContent = text;
    }

    function formattedOffset(value) {
      return value.toFixed(2).replace("-", "−");
    }

    function render() {
      scheduled = false;
      var parameters = parametersFromInputs();
      setOutput("obliquity", parameters.obliquity.toFixed(0) + "°");
      setOutput("offsetX", formattedOffset(parameters.offsetX));
      setOutput("offsetY", formattedOffset(parameters.offsetY));
      setOutput("offsetZ", formattedOffset(parameters.offsetZ));
      setOutput("mass", parameters.mass.toFixed(2).replace(/0$/, "") + " M☉");
      setOutput("radius", parameters.radius.toFixed(1) + " km");
      setOutput("inclination", parameters.inclination.toFixed(0) + "°");
      setOutput("spin", parameters.spin.toFixed(0) + " Hz");
      setOutput("phase", parameters.phase.toFixed(2));

      var signature = [
        parameters.obliquity, parameters.offsetX, parameters.offsetY, parameters.offsetZ,
        parameters.mass, parameters.radius, parameters.inclination, parameters.spin
      ].join("|");
      if (signature !== cachedSignature) {
        cachedMap = generateHeatingMap(parameters);
        cachedCurve = computeLightcurve(cachedMap, parameters);
        cachedSignature = signature;
      }

      drawHeatingMap(root.querySelector("[data-temperature-map]"), cachedMap, parameters.phase);
      drawCurve(root, cachedCurve.values, parameters.phase);
      var maximum = Math.max.apply(null, cachedCurve.values);
      var minimum = Math.min.apply(null, cachedCurve.values);
      var pulsedFraction = maximum + minimum > 0 ?
        (maximum - minimum) / (maximum + minimum) : 0;
      root.querySelector('[data-readout="compactness"]').textContent =
        cachedCurve.compactness.toFixed(3);
      root.querySelector('[data-readout="pulsedFraction"]').textContent =
        (100 * pulsedFraction).toFixed(1) + "%";
      root.querySelector('[data-readout="heatedFraction"]').textContent =
        (100 * cachedMap.heatedFraction).toFixed(1) + "%";
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

  function initializePublicationSearch() {
    var root = document.querySelector("[data-publications]");
    if (!root) return;
    var search = root.querySelector("[data-publication-search]");
    var items = Array.prototype.slice.call(root.querySelectorAll(".publication-item"));
    var count = root.querySelector("[data-publication-count]");

    function applySearch() {
      var query = search.value.trim().toLowerCase();
      var visible = 0;
      items.forEach(function (item) {
        var matchesSearch = !query || item.getAttribute("data-search").indexOf(query) !== -1;
        item.hidden = !matchesSearch;
        if (!item.hidden) visible += 1;
      });
      count.textContent = visible + (visible === 1 ? " publication" : " publications");
    }

    search.addEventListener("input", applySearch);
  }

  window.PulseProfileModel = Object.freeze({
    surfaceCurrentMagnitude: surfaceCurrentMagnitude,
    generateHeatingMap: generateHeatingMap,
    computeLightcurve: computeLightcurve
  });

  document.addEventListener("DOMContentLoaded", function () {
    initializeSimulator();
    initializePublicationSearch();
  });
}());
