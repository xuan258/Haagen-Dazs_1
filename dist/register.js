"use strict";

function convertStrToObj(e) {
  if (!e) return {};

  for (var t = e.split(":"), r = {}, n = 0; n < t.lenght; n++) {
    var o = t[n].split(",");
    r[o[0]] = o[1];
  }

  return r;
}

function convertObjToStr(e) {
  var t = "";

  for (var r in e) {
    t && (t += ":"), t += r + "," + e[r];
  }

  return t;
}

function checkForm() {
  var e = checkPhone(),
      t = checkPassword(),
      r = ConfirmPassword();
  return e && t && r;
}

function checkPhone() {
  var e = document.getElementById("txt"),
      t = document.getElementById("phoneErr");
  return /^1\d{10}$/.test(e.value) ? (t.innerHTML = "OK", t.className = "success", !0) : (t.innerHTML = "手机号码不合规范", !(t.className = "error"));
}

function checkPassword() {
  var e = document.getElementById("password"),
      t = document.getElementById("passwordErr");
  return /^\w{6,12}$/.test(e.value) ? (t.innerHTML = "OK", t.className = "success", !0) : (t.innerHTML = "密码不合规范", !(t.className = "error"));
}

function ConfirmPassword() {
  var e = document.getElementById("password"),
      t = document.getElementById("confirmPassword"),
      r = document.getElementById("conPasswordErr");
  return e.value != t.value || 0 == t.value.length ? (r.innerHTML = "上下密码不一致", !(r.className = "error")) : (r.innerHTML = "OK", r.className = "success", !0);
}

window.onload = function () {
  var l = document.getElementById("txt"),
      d = document.getElementById("erificationcCode"),
      i = document.getElementById("SMSerificationcCode"),
      u = document.getElementById("password"),
      m = document.getElementById("confirmPassword"),
      e = document.getElementById("rgt"),
      v = document.getElementById("rd");

  e.onclick = function () {
    var e = l.value,
        t = u.value,
        r = m.value,
        n = d.value,
        o = i.value,
        s = v.innerHTML;
    if (e) {
      if (n) {
        if (n === s) {
          if (o) {
            if (t === r) {
              var c = getCookie("registerUsers") ? getCookie("registerUsers") : "";
              if (e in (c = convertStrToObj(c))) alert("手机号已经被注册");else {
                c[e] = t;
                var a = convertObjToStr(c);
                setCookie("registerUsers", a, 7), console.log(decodeURIComponent(document.cookie)), alert("注册成功！");
              }
            } else alert("两次输入的密码不相同，请重试！");
          } else alert("短信验证码不能为空！");
        } else alert("验证码有误！");
      } else alert("验证码不能为空！");
    } else alert("手机号不能为空！");
  };
};