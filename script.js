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

    h = Math.round(h);
    s = Math.round(s);
    l = Math.round(l);

    showColor(color, rgb, hsl);

    if (document.querySelector("#color_picker").value == "analogous") {
      setAnalogous(h, s, l);
    } else if (
      document.querySelector("#color_picker").value == "monochromatic"
    ) {
      setMonoChromatic(h, s, l);
    } else if (document.querySelector("#color_picker").value == "triad") {
      setTriad(h, s, l);
    } else if (
      document.querySelector("#color_picker").value == "complementary"
    ) {
      setComplementary(h, s, l);
    } else if (document.querySelector("#color_picker").value == "compound") {
      setCompound(h, s, l);
    } else if (document.querySelector("#color_picker").value == "shades") {
      setShades(h, s, l);
    }
  }

  function setAnalogous(h, s, l) {
    console.log("hej");

    document.querySelector(".box2").style.backgroundColor = `hsl(${h -
      60},${s}%,${l}%)`;
    document.querySelector(".box3").style.backgroundColor = `hsl(${h -
      30}, ${s}%, ${l}%)`;
    document.querySelector(".box4").style.backgroundColor = `hsl(${h +
      9}, ${s}%, ${l}%)`;
    document.querySelector(".box5").style.backgroundColor = `hsl(${h +
      18}, ${s}%, ${l}%)`;
  }

  function setMonoChromatic(h, s, l) {
    document.querySelector(".box2").style.background = `hsl(${h}, ${s}%, ${l -
      5}%)`;
    document.querySelector(".box3").style.background = `hsl(${h}, ${s}%, ${l -
      10}%)`;
    document.querySelector(".box4").style.background = `hsl(${h}, ${s}%, ${l -
      15}%)`;
    document.querySelector(".box5").style.background = `hsl(${h}, ${s}%, ${l -
      20}%)`;
  }

  function setTriad(h, s, l) {
    document.querySelector(".box2").style.background = `hsl(${h -
      60}, ${s}%, ${l}%)`;
    document.querySelector(".box3").style.background = `hsl(${h -
      120}, ${s}%, ${l}%)`;
    document.querySelector(".box4").style.background = `hsl(${h -
      120}, ${s}%, ${l}%)`;
    document.querySelector(".box5").style.background = `hsl(${h -
      60}, ${s}%, ${l}%)`;
  }

  function setComplementary(h, s, l) {
    document.querySelector(".box2").style.background = `hsl(${h -
      180}, ${s}%, ${l}%)`;
    document.querySelector(".box3").style.background = `hsl(${h -
      170}, ${s}%, ${l}%)`;
    document.querySelector(".box4").style.background = `hsl(${h -
      160}, ${s}%, ${l}%)`;
    document.querySelector(".box5").style.background = `hsl(${h -
      190}, ${s}%, ${l}%)`;
  }

  function setCompound(h, s, l) {
    document.querySelector(".box2").style.background = `hsl(${h -
      180}, ${s}%, ${l}%)`;
    document.querySelector(".box3").style.background = `hsl(${h -
      150}, ${s}%, ${l - 10}%)`;
    document.querySelector(".box4").style.background = `hsl(${h +
      150}, ${s}%, ${l}%)`;
    document.querySelector(".box5").style.background = `hsl(${h -
      180}, ${s}%, ${l - 10}%)`;
  }

  function setShades(h, s, l) {
    document.querySelector(".box2").style.background = `hsl(${h}, ${s -
      5}%, ${l}%)`;
    document.querySelector(".box3").style.background = `hsl(${h}, ${s -
      10}%, ${l - 10}%)`;
    document.querySelector(".box4").style.background = `hsl(${h}, ${s -
      15}%, ${l}%)`;
    document.querySelector(".box5").style.background = `hsl(${h}, ${s -
      20}%, ${l - 10}%)`;
  }

  function showColor(color, rgb, hsl) {
    document.querySelector(".box1").style.backgroundColor = color;
    document.querySelector(".hex-output").textContent = `HEX: ${color}`;
    document.querySelector(
      ".rgb-output"
    ).textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
    document.querySelector(".hsl-output").textContent = `HSL: ${hsl}`;
  }
}
