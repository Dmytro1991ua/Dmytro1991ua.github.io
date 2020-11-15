"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener("DOMContentLoaded", function () {
  //run  Preloader
  function runPreloader() {
    var preloader = document.querySelector(".preloader-container");
    preloader.classList.add("opacity-0");
    setTimeout(function () {
      preloader.style.display = "none";
    }, 1000);
  }

  window.addEventListener("load", runPreloader); //Slider for Service section

  var swiper = new Swiper('.swiper-container.slider-1', {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    loop: true,
    speed: 600,
    grabCursor: true,
    slidesPerView: 1,
    lazyLoading: true,
    spaceBetween: 10,
    centeredSlides: true,
    //init: false,
    navigation: {
      nextEl: '.swiper-button-next-custom',
      prevEl: '.swiper-button-prev-custom'
    },
    breakpoints: {
      550: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    }
  }); //Slider for a types of Credit Cards Section

  var swiper = new Swiper('.swiper-container.slider-2', {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    loop: true,
    speed: 600,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 20,
    lazyLoading: true,
    //init: false,
    navigation: {
      nextEl: '.swiper-button-next-custom-2',
      prevEl: '.swiper-button-prev-custom-2'
    },
    breakpoints: {
      550: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      1600: {
        slidesPerView: 4,
        spaceBetween: 50,
        centeredSlides: true
      },
      1900: {
        slidesPerView: 4,
        spaceBetween: 70
      }
    }
  }); //Sticky header section on scroll down

  function fixedHeader() {
    window.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop;

      if (window.innerWidth > 790) {
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
  }

  ; // run accordion

  function runAccordion() {
    var accordions = document.querySelector(".accordion").children; // iterate over each accodrion item

    var _iterator = _createForOfIteratorHelper(accordions),
        _step;

    try {
      var _loop = function _loop() {
        var item = _step.value;
        var btn = item.querySelector(".accordion__button"); //open one of accordion items by default

        if (item.classList.contains("active")) {
          item.querySelector(".accordion__content").style.maxHeight = item.querySelector(".accordion__content").scrollHeight + "px"; //get a height of a content of accordion

          item.querySelector(".accordion__button").classList.add("is-open"); //change an icon when class is active
        } //changes on click to a btn in each accordion item


        btn.addEventListener("click", function () {
          var _iterator2 = _createForOfIteratorHelper(accordions),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _item = _step2.value;
              _item.querySelector(".accordion__content").style.maxHeight = "0px";

              _item.querySelector(".accordion__button").classList.remove("is-open");
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          item.querySelector(".accordion__content").style.maxHeight = item.querySelector(".accordion__content").scrollHeight + "px"; //get a height of a content of accordion

          item.querySelector(".accordion__button").classList.add("is-open"); //change an icon when class is active
        });
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } // tabs buttons to open a specific card on click


  function runTabsFilter() {
    var tabsFilter = document.querySelector(".tabs-filter").children;
    var accordionItems = document.querySelector(".fag__accordion-row").children; //loop through each tab (filter) btn

    for (var i = 0; i < tabsFilter.length; i++) {
      tabsFilter[i].addEventListener("click", function () {
        //remove active class from other btn which are not clicked at the moment
        for (var j = 0; j < tabsFilter.length; j++) {
          tabsFilter[j].classList.remove("active");
        } //add active class to a clicked btn


        this.classList.add("active");
        var target = this.getAttribute("data-target"); // get a certain value from data-target attribute
        //loop through children elements of fag__accordion-row (all accrodions elements)

        for (var k = 0; k < accordionItems.length; k++) {
          if (target === accordionItems[k].getAttribute("data-category")) {
            accordionItems[k].classList.remove("hide");
            accordionItems[k].classList.add("show");
          } else {
            accordionItems[k].classList.add("hide");
            accordionItems[k].classList.remove("show");
          }
          /*if (target === "all") {
             accordionItems[k].classList.remove("hide");
             accordionItems[k].classList.add("show");
          } */

        }
      });
    }
  } //run a counter


  var runCounter = function runCounter() {
    var counters = document.querySelectorAll(".counter");
    counters.forEach(function (item) {
      var count = 0;
      var value = Number(item.dataset.target);
      var speed = 15; //0.1

      var updateCounter = function updateCounter() {
        item.querySelector(".counter__value").innerText = count;
        count++;

        if (count > value) {
          clearInterval(counter);
        }
      };

      var counter = setInterval(function () {
        return updateCounter();
      }, speed);
    });
  }; //run modal (pop-up)


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
        var modal = btn.closest(".modal__body");
        closeModal(modal);
      });
    }); //remove overlay by clcking outside modal window

    overlay.addEventListener("click", function () {
      var openModals = document.querySelectorAll(".modal__body.active");
      openModals.forEach(function (modal) {
        closeModal(modal);
      });
    });
  }

  function runParallaxEfect() {
    function parallax(e) {
      this.querySelectorAll(".icon").forEach(function (icon) {
        var speed = icon.getAttribute("data-speed");
        var horizontal = (window.innerWidth - e.pageX * speed) / 100;
        var vertical = (window.innerHeight - e.pageY * speed) / 100;
        icon.style.transform = "translateX(".concat(horizontal, "px) translateY(").concat(vertical, "px)");
        icon.style.webkitTransform = "translateX(".concat(horizontal, "px) translateY(").concat(vertical, "px)");
      });
    }

    document.addEventListener("mousemove", parallax);
  }

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


    window.addEventListener("scroll", function () {
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
  } //function resets values from inputs and textarea after submitting form


  function resetFormItems() {
    var form = document.querySelector(".form-reset");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.reset();
    });
  } //function which changes an active class of a vavigation while scrolling to a specific section


  function changeActiveClassOnScroll() {
    var navLinks = document.querySelectorAll(".navigation__link");
    var sections = document.querySelectorAll(".section");
    var scrollPosition = window.pageYOffset || document.documentElement.sccollTop; // window.pageYOffset + 160 - получает значения в 160px от вверха страницы

    navLinks.forEach(function (link, index) {
      var activeSection = sections[index];
      var compare = activeSection.offsetTop <= scrollPosition && activeSection.offsetTop + activeSection.offsetHeight > scrollPosition;

      if (scrollPosition > 50) {
        compare ? link.classList.add("active") : link.classList.remove("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", changeActiveClassOnScroll); //call functions

  runAccordion();
  runParallaxEfect();
  runCounter();
  fixedHeader();
  runToggleBtn();
  runTabsFilter();
  runModal();
  runScrollToTopBtn();
  resetFormItems();
});