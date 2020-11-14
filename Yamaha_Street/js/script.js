"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // AOS animation library initialization
  AOS.init({
    offset: 200,
    duration: 600,
    once: true,
    easing: 'ease-in-sine',
    delay: 100
  }); // Swiper Slider(header-bottom section)

  var slider = function slider() {
    var swiper = document.querySelector(".header-bottom");
    var mySwiper;

    function mobileSlider() {
      if (window.innerWidth <= 600 && swiper.dataset.mobile === "false") {
        mySwiper = new Swiper(swiper, {
          slidesPerView: "auto",
          spaceBetween: 10,
          centeredSlides: true,
          loop: true,
          slideClass: "header-bottom__item",
          autoplay: {
            delay: 3200,
            disableOnInteraction: false
          }
        });
        swiper.dataset.mobile = "true";
      }

      if (window.innerWidth > 600) {
        swiper.dataset.mobile = "false";

        if (swiper.classList.contains('swiper-container-initialized')) {
          mySwiper.destroy();
        }
      }
    }

    mobileSlider();
    window.addEventListener("resize", function () {
      mobileSlider();
    });
  }; //Sticky header section on scroll down


  function fixedHeader() {
    window.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop;

      if (window.innerWidth > 1040) {
        if (scrollTop > 70) {
          document.querySelector(".header").classList.add("sticky");
        } else {
          document.querySelector(".header").classList.remove("sticky");
        }
      }
    };
  } //open and close toggle btn on click


  function runToggleBtn() {
    //open  and close (toggle) on click
    var toggleBtn = document.querySelector(".toggle__btn");
    toggleBtn.addEventListener("click", function () {
      document.querySelector(".navigation").classList.toggle("show");
      document.querySelector(".header__info").classList.toggle("show");
      document.querySelector(".toggle__btn").classList.toggle("active");
      document.querySelector("body").classList.toggle("lock");
    }); //close a navigation on specific link

    var links = document.querySelectorAll(".navigation__link");
    links.forEach(function (link) {
      link.addEventListener("click", function () {
        document.querySelector(".navigation").classList.remove("show");
        document.querySelector(".header__info").classList.remove("show");
        document.querySelector(".toggle__btn").classList.toggle("active");
        document.querySelector("body").classList.remove("lock");
      });
    });
  }

  ; //function which shows input filed on click to a an icon

  function showInputSearch() {
    var inputIcon = document.querySelector(".header__search-icon");
    var inputField = document.querySelector(".header__search-input");
    inputIcon.addEventListener("click", function () {
      inputField.classList.toggle("active");
    });
  } //handle different independent tabs on one page


  function runTabsFilter() {
    var tabsWrapper = document.querySelectorAll(".tab-wrapper"); // select wrappers that hold tabs btns and content

    tabsWrapper.forEach(function (wrapper) {
      var tabsFilterBtns = wrapper.querySelectorAll(".tab-filters");
      var tabsContent = wrapper.querySelectorAll(".tabs-content");

      var _loop = function _loop(i) {
        tabsFilterBtns[i].onclick = function () {
          tabsFilterBtns.forEach(function (tablink) {
            tablink.classList.remove("active");
          });
          tabsContent.forEach(function (tabContent) {
            tabContent.classList.remove("show");
            tabContent.classList.add("hide");
          });
          tabsFilterBtns[i].classList.add("active");
          tabsContent[i].classList.remove("hide");
          tabsContent[i].classList.add("show");
        };
      };

      for (var i = 0; i < tabsFilterBtns.length; i++) {
        _loop(i);
      }
    });
  } //function which changes an active class of a navigation while scrolling to a specific section


  function changeActiveClassOnScroll() {
    var navigation = document.querySelectorAll(".navigation__link");
    var sections = document.querySelectorAll(".section");
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // window.pageYOffset + 160 - получает значения в 160px от вверха страницы

    navigation.forEach(function (link, index) {
      var activeSection = sections[index];
      var compare = activeSection.offsetTop <= scrollPosition && activeSection.offsetTop + activeSection.offsetHeight > scrollPosition;

      if (scrollPosition > 160) {
        compare ? link.classList.add("active") : link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", changeActiveClassOnScroll); //run modal (pop-up)

  function runModal() {
    var openModalButtons = document.querySelectorAll("[data-modal-target]");
    var closeModalButtons = document.querySelectorAll("[data-close-button]");
    var overlay = document.querySelector(".modal__overlay"); //open modal

    function openModal(modal) {
      if (modal === null) return;
      modal.classList.add("active");
      overlay.classList.add("active");
      document.querySelector("body").classList.add("lock");
    } //close modal 


    function closeModal(modal) {
      if (modal === null) return;
      modal.classList.remove("active");
      overlay.classList.remove("active");
      document.querySelector("body").classList.remove("lock");
    }

    openModalButtons.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        var modal = document.querySelector(btn.dataset.modalTarget);
        openModal(modal);
      });
    });
    closeModalButtons.forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        var modal = btn.closest(".scaled");
        console.log(modal);
        closeModal(modal);
      });
    }); //remove overlay by clcking outside modal window

    overlay.addEventListener("click", function () {
      var openModals = document.querySelectorAll(".scaled.active");
      openModals.forEach(function (modal) {
        closeModal(modal);
      });
    });
  } //Run preloader


  function runPreloader() {
    var preloader = document.querySelector(".preloader-container");
    preloader.classList.add("opacity-0");
    setTimeout(function () {
      preloader.style.display = "none";
    }, 1000);
  }

  window.addEventListener("load", runPreloader);

  function runScrollToTopBtn() {
    var offset = 100; //indecator after which a button will be shown or be hidden

    var scrollUpBtn = document.querySelector(".scroll-up-btn");
    var scrollUpSvgPath = document.querySelector(".scroll-up-btn__svg-path");
    var pathLength = scrollUpSvgPath.getTotalLength(); //styles for SVG icon

    scrollUpBtn.style.strokeDasharray = "".concat(pathLength, " ").concat(pathLength);
    scrollUpBtn.style.transition = 'stroke-dashoffset 500ms'; //function return a value of element while window is scrollung

    var getTop = function getTop() {
      return window.pageYOffset || document.documentElement.sccollTop;
    }; //function is in charge of pressing and running a scroll up btn


    var updateDashoffset = function updateDashoffset() {
      var scrollheight = document.documentElement.scrollHeight - window.innerHeight; // calculate difference between scroll height

      var dashoffset = pathLength - getTop() * pathLength / scrollheight;
      scrollUpSvgPath.style.strokeDashoffset = dashoffset;
    }; // toggle active class


    window.addEventListener("scroll", function (e) {
      updateDashoffset();

      if (getTop() > offset) {
        scrollUpBtn.classList.add("active");
      } else {
        scrollUpBtn.classList.remove("active");
      }
    });
    scrollUpBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  } // function to change active class and images on click to a button


  function changeImgOnClick() {
    var colorBtns = document.querySelectorAll(".about__modal-colors");
    var images = document.querySelectorAll(".images");

    var _loop2 = function _loop2(i) {
      colorBtns[i].onclick = function () {
        colorBtns.forEach(function (btn) {
          btn.classList.remove("active");
        });
        images.forEach(function (img) {
          img.classList.remove("show");
          img.classList.add("hide");
        });
        colorBtns[i].classList.add("active");
        images[i].classList.add("show");
        images[i].classList.remove("hide");
      };
    };

    for (var i = 0; i < colorBtns.length; i++) {
      _loop2(i);
    }
  } //call functions


  runModal();
  runPreloader();
  fixedHeader();
  runTabsFilter();
  runToggleBtn();
  showInputSearch();
  runScrollToTopBtn();
  changeImgOnClick();
  slider();
});