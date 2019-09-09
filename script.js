"use strict";
document.addEventListener("DOMContentLoaded", start);

function start() {
  document.querySelector("input").addEventListener("input", selectColor);

  function selectColor(event) {
    let color = event.target.value;
    hexToRgb(color);
  }

  function hexToRgb(color) {
    let hex;
    if (color.substring(0, 1) == "#") {
      hex = color.substring(1);
    }
    const rgb = {};
    rgb.r = parseInt(hex.substring(0, 2), 16);
    rgb.g = parseInt(hex.substring(2, 4), 16);
    rgb.b = parseInt(hex.substring(4), 16);

    rgbToHsl(color, rgb);
  }

  function rgbToHsl(color, rgb) {
    const rgbConvert = {};
    rgbConvert.r = rgb.r;
    rgbConvert.g = rgb.g;
    rgbConvert.b = rgb.b;

    rgbConvert.r /= 255;
    rgbConvert.g /= 255;
    rgbConvert.b /= 255;

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

    const hsl = `${Math.floor(h)}, ${Math.floor(s)}%, ${Math.floor(l)}%`;

    showColor(color, rgb, hsl);

    console.log(rgb);
  }

  function showColor(color, rgb, hsl) {
    document.querySelector(".box").style.backgroundColor = color;
    document.querySelector(".hex-output").textContent = `HEX: ${color}`;
    document.querySelector(
      ".rgb-output"
    ).textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
    document.querySelector(".hsl-output").textContent = `HSL: ${hsl}`;
  }
}
