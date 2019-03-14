"use strict";

function convertStrToObj(e) {
  if (!e) return {};

  for (var r = e.split(":"), n = {}, t = 0; t < r.length; t++) {
    var o = r[t].split(",");
    n[o[0]] = o[1];
  }

  return n;
}

function convertObjToStr(e) {
  var r = "";

  for (var n in e) {
    r && (r += ":"), r += n + "," + e[n];
  }

  return r;
}

function checkForm() {
  var e = checkPhone(),
      r = checkPassword();
  return e && r;
}

function checkPhone() {
  var e = document.getElementById("loginName"),
      r = document.getElementById("phoneErr");
  return /^1\d{10}$/.test(e.value) ? (r.innerHTML = "OK", r.className = "success", !0) : (r.innerHTML = "手机号码不合规范", !(r.className = "error"));
}

function checkPassword() {
  var e = document.getElementById("password"),
      r = document.getElementById("passwordErr");
  return /^\w{6,12}$/.test(e.value) ? (r.innerHTML = "OK", r.className = "success", !0) : (r.innerHTML = "密码不合规范", !(r.className = "error"));
}

window.onload = function () {
  var e = document.getElementById("login_1"),
      t = document.getElementById("loginName"),
      o = document.getElementById("password"),
      c = (document.getElementById("rd"), document.getElementById("error"));

  e.onclick = function () {
    var e = t.value;
    alert(e);
    var r = o.value;
    if (ec) {
      if (ec === rd) {
        var n = getCookie("registerUsers") ? getCookie("registerUsers") : "";
        (n = convertStrToObj(n))[e] == r ? (setCookie("loginedUsers", usn, 7), console.log("登录成功!"), location.href = "index.html") : c.style.display = "block";
      } else alert("验证码有误！");
    } else alert("验证码不能为空！");
  };
};