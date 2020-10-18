"use strict";

document.addEventListener("DOMContentLoaded", function () {
  //Swiper for Hero section
  var swiper = new Swiper('.slider-1', {
    spaceBetween: 30,
    effect: 'fade',
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  }); //run a counter

  function runCounter() {
    var counters = document.querySelectorAll(".counter");
    var speed = 800;
    counters.forEach(function (counter) {
      var updateCount = function updateCount() {
        var counterValue = +counter.getAttribute("data-target");
        var count = +counter.innerText;
        var increment = counterValue / speed;

        if (count < counterValue) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 10);
        } else {
          count.innerText = counterValue;
        }
      };

      updateCount();
    });
  } //run modal (pop-up)


  function runModal() {
    var openModalButtons = document.querySelectorAll("[data-modal-target]");
    var closeModalButtons = document.querySelectorAll("[data-close-button]");
    var modalBtns = document.querySelectorAll(".modal__btn");
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
    }); //prevent default behaviour on all links in modal window

    modalBtns.forEach(function (modalBtn) {
      modalBtn.addEventListener("click", function (event) {
        event.preventDefault();
      });
    });
  } //Sticky header section on scroll down


  function fixedHeader() {
    window.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop;

      if (window.innerWidth > 768) {
        if (scrollTop > 70) {
          document.querySelector(".header").classList.add("sticky");
        } else {
          document.querySelector(".header").classList.remove("sticky");
        }
      }
    };
  } // tabs buttons to open a specific card on click


  function runTabsFilter() {
    var tabsFilter = document.querySelector(".tabs-filter").children;
    var galleryItems = document.querySelector(".gallery__body").children; //loop through each tab (filter) btn

    for (var i = 0; i < tabsFilter.length; i++) {
      tabsFilter[i].addEventListener("click", function () {
        //remove active class from other btn which are not clicked at the moment
        for (var j = 0; j < tabsFilter.length; j++) {
          tabsFilter[j].classList.remove("active");
        } //add active class to a clicked btn


        this.classList.add("active");
        var target = this.getAttribute("data-target"); // get a certain value from data-target attribute
        //loop through children elements of gallery_body

        for (var k = 0; k < galleryItems.length; k++) {
          //galleryItems[k].style.display = "none";
          if (target === galleryItems[k].getAttribute("data-category")) {
            galleryItems[k].classList.remove("hide");
            galleryItems[k].classList.add("show");
          } else {
            galleryItems[k].classList.add("hide");
            galleryItems[k].classList.remove("show");
          }

          if (target === "all") {
            galleryItems[k].classList.remove("hide");
            galleryItems[k].classList.add("show");
          }
        }
      });
    }
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

  ; //Run preloader

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
  } //function resets values from inputs and textarea after submitting form


  function resetForm() {
    var forms = document.querySelector(".form-reset");
    forms.addEventListener("submit", function (event) {
      event.preventDefault();
      forms.reset();
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

  runCounter();
  runModal();
  runPreloader();
  runTabsFilter();
  runToggleBtn();
  fixedHeader();
  runScrollToTopBtn();
  resetForm();
});