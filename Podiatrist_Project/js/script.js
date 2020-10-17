"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var runPageScript = function runPageScript() {
  var _Swiper;

  //open and close toggle btn on click
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

  ; //Sticky header section on scroll down

  function fixedHeader() {
    window.onscroll = function () {
      var scrollTop = document.documentElement.scrollTop;

      if (window.innerWidth > 1200) {
        if (scrollTop > 70) {
          document.querySelector(".navigation__items").classList.add("sticky");
        } else {
          document.querySelector(".navigation__items").classList.remove("sticky");
        }
      }
    };
  } //function which changes an active class of a navigation while scrolling to a specific section


  function changeActiveClassOnScroll() {
    var navigation = document.querySelectorAll(".navigation__link");
    var sections = document.querySelectorAll(".section");
    var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    navigation.forEach(function (link, index) {
      var activeSection = sections[index];
      var compare = activeSection.offsetTop <= scrollPosition && activeSection.offsetTop + activeSection.offsetHeight > scrollPosition;

      if (scrollPosition > 70) {
        compare ? link.classList.add("active") : link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", changeActiveClassOnScroll);

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
  } //Run preloader


  function runPreloader() {
    var preloader = document.querySelector(".preloader");
    preloader.classList.add("opacity-0");
    setTimeout(function () {
      preloader.style.display = "none";
    }, 1000);
  }

  window.addEventListener("load", runPreloader); //run modal (pop-up)

  function runModal() {
    var openModalButtons = document.querySelectorAll("[data-modal-target]");
    var closeModalButtons = document.querySelectorAll("[data-close-button]");
    var overlay = document.querySelector(".modal-overlay"); //open modal

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
        closeModal(modal);
      });
    }); //remove overlay by clcking outside modal window

    overlay.addEventListener("click", function () {
      var openModals = document.querySelectorAll(".scaled.active");
      openModals.forEach(function (modal) {
        closeModal(modal);
      });
    });
  } //slider inside a modal dialog


  function sliderModal() {
    var overlay = document.querySelector(".modal-services__overlay");
    var overlayBody = document.querySelector(".modal-services__body");
    var modalImg = document.querySelector(".modal-services__pic");
    var prevBtn = document.querySelector(".modal-services__icon-link--prev");
    var nextBtn = document.querySelector(".modal-services__icon-link--next");
    var slideTitle = document.querySelector(".modal-services__info-title");
    var slideCounter = document.querySelector(".modal-services__info-counter");
    var galleryItem = document.querySelectorAll(".gallery-service__item");
    var galleryItemLength = galleryItem.length;
    var galleryItemIndex = 0; // specify an index of gallery Item

    var _loop = function _loop(i) {
      galleryItem[i].addEventListener("click", function () {
        galleryItemIndex = i;
        toggleOverlay();
        changeImgSrc();
      });
    };

    for (var i = 0; i < galleryItemLength; i++) {
      _loop(i);
    }

    var toggleOverlay = function toggleOverlay() {
      overlay.classList.toggle("open");
      overlayBody.classList.toggle("open");
      document.body.classList.toggle("lock");
    };

    var changeImgSrc = function changeImgSrc() {
      // change image, title and counter depend on clicking gallery item
      var imgSrc = galleryItem[galleryItemIndex].querySelector(".gallery-service__pic").getAttribute("src"); // get src of img when click to a certain gallery item

      var imgAlt = galleryItem[galleryItemIndex].querySelector(".gallery-service__pic").getAttribute("alt"); // get value of alt attribute for each pic

      modalImg.src = imgSrc;
      modalImg.alt = imgAlt;
      slideTitle.innerHTML = galleryItem[galleryItemIndex].querySelector(".gallery-service__title").textContent; // get a text value of <h3> in gallery item

      slideCounter.innerHTML = "".concat(galleryItemIndex + 1, " of ").concat(galleryItemLength); // get a slider counter
    };

    prevBtn.addEventListener("click", function (event) {
      event.preventDefault();

      if (galleryItemIndex === 0) {
        galleryItemIndex === galleryItemLength - 1;
      } else {
        galleryItemIndex--;
      }

      changeImgSrc();
    });
    nextBtn.addEventListener("click", function (event) {
      event.preventDefault();

      if (galleryItemIndex === galleryItemLength - 1) {
        galleryItemIndex === 0;
      } else {
        galleryItemIndex++;
      }

      changeImgSrc();
    });
    overlay.addEventListener("click", function (event) {
      // close modal dilog on clicking outside it
      var target = event.target;

      if (!target.closest(".modal-services__body") || target.closest(".modal-services__close")) {
        event.preventDefault();
        toggleOverlay();
      }
    });
  } // run custom scrollbar


  var runCustomScrollbar = function runCustomScrollbar() {
    var progressbar = document.querySelector(".progressbar");
    var totaHeight = document.body.scrollHeight - window.innerHeight;
    window.addEventListener("scroll", function () {
      var progress = window.pageYOffset / totaHeight * 100;
      progressbar.style.height = progress + "%";
    });
  };

  var swiper1 = new Swiper('.swiper-container.slider-1', {
    // Team Section
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    loop: true,
    speed: 600,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 10,
    watchOverflow: true,
    lazy: {
      loadPrevNext: true
    },
    breakpoints: {
      550: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30
      }
    }
  });
  var swiper2 = new Swiper('.swiper-container.slider-2', {
    // Reviews Section
    loop: true,
    speed: 700,
    grabCursor: true,
    watchOverflow: true,
    lazy: {
      loadPrevNext: true
    }
  });
  var swiper3 = new Swiper('.swiper-container.slider-3', {
    // Partners Section
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    loop: true,
    speed: 700,
    grabCursor: true,
    watchOverflow: true,
    slidesPerView: 2,
    spaceBetween: 15,
    lazy: {
      loadPrevNext: true
    },
    breakpoints: {
      520: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 30
      },
      1450: {
        slidesPerView: 6,
        spaceBetween: 50
      }
    }
  });
  var swiper = new Swiper('.swiper-container.slider-4', (_Swiper = {
    // modal dilog for photogallery section
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    loop: true,
    speed: 600,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 8
  }, _defineProperty(_Swiper, "loop", true), _defineProperty(_Swiper, "lazy", {
    loadPrevNext: true
  }), _defineProperty(_Swiper, "navigation", {
    nextEl: '.swiper-button-next-custom',
    prevEl: '.swiper-button-prev-custom'
  }), _defineProperty(_Swiper, "breakpoints", {
    640: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 25
    }
  }), _Swiper));
  /* AOS animation*/

  AOS.init({
    offset: 200,
    duration: 600,
    once: true
  }); //call functions

  runModal();
  runPreloader();
  fixedHeader();
  sliderModal();
  runCustomScrollbar();
  runToggleBtn();
  runScrollToTopBtn();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runPageScript);
} else {
  runPageScript();
}