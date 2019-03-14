"use strict";

function setCookie(e, o, n) {
  var t = encodeURIComponent(e) + "=" + encodeURIComponent(o) + ";path=/";

  if ("number" == typeof n) {
    var i = new Date();
    i.setDate(i.getDate() + n), t += ";expires=" + i;
  }

  document.cookie = t;
}

function getCookie(e) {
  for (var o = document.cookie.split("; "), n = 0; n < o.length; n++) {
    var t = o[n].split("=");
    if (t[0] == encodeURIComponent(e)) return decodeURIComponent(t[1]);
  }
}

function removeCookie(e) {
  document.cookie = encodeURIComponent(e) + "=;expires=" + new Date(0) + ";path=/";
}