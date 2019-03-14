"use strict";

function $id(n) {
  return document.getElementById(n);
}

function rand(n, r) {
  return Math.round(Math.random() * (r - n) + n);
}

function yzm() {
  for (var n = "", r = 1; r <= 4; r++) {
    var t = rand(48, 122);
    if (58 <= t && t <= 64 || 91 <= t && t <= 96) r--;else n += String.fromCharCode(t);
  }

  return n;
}