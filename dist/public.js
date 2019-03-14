"use strict";

$(document).ready(function () {
  $("#shop_classify").mouseenter(function () {
    $(this).children(".nav-layer").css("display", "block");
  }), $(".nav-layer").mouseleave(function () {
    $(this).css("display", "none");
  }), $("#shopping_1").mouseenter(function () {
    $(this).children(".shopping_trolley").css("display", "block");
  }), $("#shopping_1").mouseleave(function () {
    $(this).children(".shopping_trolley").css("display", "none");
  });
});