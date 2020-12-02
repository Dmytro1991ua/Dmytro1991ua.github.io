"use strict";

document.addEventListener("DOMContentLoaded", function () {
  //Sticky header section on scroll down
  var fixedHeader = function fixedHeader() {
    var header = document.querySelector(".header");

    window.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop;

      if (window.innerWidth > 992) {
        if (scrollTop > 70) {
          header.classList.add("sticky");
        } else {
          header.classList.remove("sticky");
        }
      }
    };
  }; //open and close toggle btn on click


  var runToggleBtn = function runToggleBtn() {
    //open  and close (toggle) on click
    var toggleBtn = document.querySelector(".toggle__btn");
    toggleBtn.addEventListener("click", function () {
      document.querySelector(".navigation").classList.toggle("show");
      document.querySelector(".toggle__btn").classList.toggle("active");
      document.querySelector("body").classList.toggle("lock");
    }); //close a navigation on specific link

    var links = document.querySelectorAll(".navigation__link");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        document.querySelector(".navigation").classList.remove("show");
        document.querySelector(".toggle__btn").classList.toggle("active");
        document.querySelector("body").classList.remove("lock");
      });
    });
  };

  fixedHeader();
  runToggleBtn();
});