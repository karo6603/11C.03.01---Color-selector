"use strict";
document.addEventListener("DOMContentLoaded", start);

function start() {
  document.querySelector("input").addEventListener("input", selectColor);
  document.querySelector("select").addEventListener("change", selectTheme);

  function selectColor(event) {
    setColors(event.target.value);
  }

  function selectTheme() {
    setColors(document.querySelector("input").value);
  }

  function RGBToHex(rgb) {
    var hex = rgb.r.toString(16) + rgb.g.toString(16) + rgb.b.toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }

  function HSLToRGB(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
  }

  function hexToRGB(color) {
    let hex;
    if (color.substring(0, 1) == "#") {
      hex = color.substring(1);
    }
    const rgb = {};
    rgb.r = parseInt(hex.substring(0, 2), 16);
    rgb.g = parseInt(hex.substring(2, 4), 16);
    rgb.b = parseInt(hex.substring(4), 16);

    return rgb;
  }

  function RGBToHSL(rgb) {
    const rgbConvert = {};
    rgbConvert.r = rgb.r / 255;
    rgbConvert.g = rgb.g / 255;
    rgbConvert.b = rgb.b / 255;

    let h, s, l;

    const min = Math.min(rgbConvert.r, rgbConvert.g, rgbConvert.b);
    const max = Math.max(rgbConvert.r, rgbConvert.g, rgbConvert.b);

    if (max === min) {
      h = 0;
    } else if (max === rgbConvert.r) {
      h = 60 * (0 + (rgbConvert.g - rgbConvert.b) / (max - min));
    } else if (max === rgbConvert.g) {
      h = 60 * (2 + (rgbConvert.b - rgbConvert.r) / (max - min));
    } else if (max === rgbConvert.b) {
      h = 60 * (4 + (rgbConvert.r - rgbConvert.g) / (max - min));
    }

    if (h < 0) {
      h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
      s = 0;
    } else {
      s = (max - l) / Math.min(l, 1 - l);
    }

    s *= 100;
    l *= 100;

    return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
  }

  function setColors(hex) {
    const rgb = hexToRGB(hex);
    const hsl = RGBToHSL(rgb);
    if (document.querySelector("#theme_picker").value == "analogous") {
      setAnalogous(hsl);
    } else if (
      document.querySelector("#theme_picker").value == "monochromatic"
    ) {
      setMonoChromatic(hsl);
    } else if (document.querySelector("#theme_picker").value == "triad") {
      setTriad(hsl);
    } else if (
      document.querySelector("#theme_picker").value == "complementary"
    ) {
      setComplementary(hsl);
    } else if (document.querySelector("#theme_picker").value == "compound") {
      setCompound(hsl);
    } else if (document.querySelector("#theme_picker").value == "shades") {
      setShades(hsl);
    }
  }

  function setAnalogous(hsl) {
    showColor(hsl.h, hsl.s, hsl.l, 1);
    showColor(hsl.h - 60, hsl.s, hsl.l, 2);
    showColor(hsl.h - 30, hsl.s, hsl.l, 3);
    showColor(hsl.h + 9, hsl.s, hsl.l, 4);
    showColor(hsl.h + 18, hsl.s, hsl.l, 5);
  }

  function setMonoChromatic(hsl) {
    showColor(hsl.h, hsl.s, hsl.l, 1);
    showColor(hsl.h, hsl.s, hsl.l - 5, 2);
    showColor(hsl.h, hsl.s, hsl.l - 10, 3);
    showColor(hsl.h, hsl.s, hsl.l - 15, 4);
    showColor(hsl.h, hsl.s, hsl.l - 20, 5);
  }

  function setTriad(hsl) {
    showColor(hsl.h, hsl.s, hsl.l, 1);
    showColor(hsl.h - 60, hsl.s, hsl.l, 2);
    showColor(hsl.h - 120, hsl.s, hsl.l, 3);
    showColor(hsl.h - 120, hsl.s, hsl.l, 4);
    showColor(hsl.h - 60, hsl.s, hsl.l, 5);
  }

  function setComplementary(hsl) {
    showColor(hsl.h, hsl.s, hsl.l, 1);
    showColor(hsl.h - 180, hsl.s, hsl.l, 2);
    showColor(hsl.h - 170, hsl.s, hsl.l, 3);
    showColor(hsl.h - 160, hsl.s, hsl.l, 4);
    showColor(hsl.h - 190, hsl.s, hsl.l, 5);
  }

  function setCompound(hsl) {
    showColor(hsl.h, hsl.s, hsl.l, 1);
    showColor(hsl.h - 180, hsl.s, hsl.l, 2);
    showColor(hsl.h - 150, hsl.s, hsl.l, 3);
    showColor(hsl.h + 150, hsl.s, hsl.l, 4);
    showColor(hsl.h - 80, hsl.s, hsl.l, 5);
  }

  function setShades(hsl) {
    showColor(hsl.h, hsl.s, hsl.l, 1);
    showColor(hsl.h, hsl.s - 5, hsl.l, 2);
    showColor(hsl.h, hsl.s - 10, hsl.l - 10, 3);
    showColor(hsl.h, hsl.s - 15, hsl.l, 4);
    showColor(hsl.h, hsl.s - 20, hsl.l - 10, 5);
  }

  function showColor(h, s, l, counter) {
    const rgb = HSLToRGB(h, s, l);
    document.querySelector(
      ".box" + counter
    ).style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
    document.querySelector(
      ".hex-output" + counter
    ).textContent = `HEX: ${RGBToHex(rgb)}`;
    document.querySelector(
      ".rgb-output" + counter
    ).textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
    document.querySelector(
      ".hsl-output" + counter
    ).textContent = `HSL: ${h}${s}${l}`;
  }

  selectTheme();
}
