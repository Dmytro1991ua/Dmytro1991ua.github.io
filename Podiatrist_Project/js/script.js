const runPageScript = () => {

   //open and close toggle btn on click
   function runToggleBtn() {
      //open  and close (toggle) on click
      const toggleBtn = document.querySelector(".toggle__btn");
      toggleBtn.addEventListener("click", () => {
         document.querySelector(".navigation").classList.toggle("show");
         document.querySelector(".toggle__btn").classList.toggle("active");
         document.querySelector("body").classList.toggle("lock");
      });
      //close a navigation on specific link
      const links = document.querySelectorAll(".navigation__link");

      links.forEach(link => {
         link.addEventListener("click", () => {
            document.querySelector(".navigation").classList.remove("show");
            document.querySelector(".toggle__btn").classList.toggle("active");
            document.querySelector("body").classList.remove("lock");
         });
      });
   };

   //Sticky header section on scroll down
   function fixedHeader() {
      window.onscroll = function () {
         const scrollTop = document.documentElement.scrollTop;
         if (window.innerWidth > 1200) {
            if (scrollTop > 70) {
               document.querySelector(".navigation__items").classList.add("sticky");

            } else {
               document.querySelector(".navigation__items").classList.remove("sticky");
            }
         }
      }
   }

   //function which changes an active class of a navigation while scrolling to a specific section
   function changeActiveClassOnScroll() {
      const navigation = document.querySelectorAll(".navigation__link");
      const sections = document.querySelectorAll(".section");
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      navigation.forEach((link, index) => {
         const activeSection = sections[index];
         const compare = activeSection.offsetTop <= scrollPosition && (activeSection.offsetTop + activeSection.offsetHeight > scrollPosition);

         if (scrollPosition > 70) {
            compare ? link.classList.add("active") : link.classList.remove("active");
         }
      });
   }

   window.addEventListener("scroll", changeActiveClassOnScroll);

   function runScrollToTopBtn() {
      const offset = 100; //indecator after which a button will be shown or be hidden
      const scrollUpBtn = document.querySelector(".scroll-up-btn");
      const scrollUpSvgPath = document.querySelector(".scroll-up-btn__svg-path");
      const pathLength = scrollUpSvgPath.getTotalLength();

      //styles for SVG icon
      scrollUpBtn.style.strokeDasharray = `${pathLength} ${pathLength}`;
      scrollUpBtn.style.transition = 'stroke-dashoffset 500ms';

      //function return a value of element while window is scrollung
      const getTop = () => {
         return window.pageYOffset || document.documentElement.sccollTop;
      };

      //function is in charge of pressing and running a scroll up btn
      const updateDashoffset = () => {
         const scrollheight = document.documentElement.scrollHeight - window.innerHeight; // calculate difference between scroll height
         const dashoffset = pathLength - (getTop() * pathLength / scrollheight);
         scrollUpSvgPath.style.strokeDashoffset = dashoffset;
      };

      // toggle active class
      window.addEventListener("scroll", (e) => {
         updateDashoffset();
         if (getTop() > offset) {
            scrollUpBtn.classList.add("active");
         } else {
            scrollUpBtn.classList.remove("active");
         }
      });

      scrollUpBtn.addEventListener("click", () => {
         window.scrollTo({
            top: 0,
            behavior: "smooth",
         });
      });
   }

   function runScrollToTopBtn() {
      const offset = 100; //indecator after which a button will be shown or be hidden
      const scrollUpBtn = document.querySelector(".scroll-up-btn");
      const scrollUpSvgPath = document.querySelector(".scroll-up-btn__svg-path");
      const pathLength = scrollUpSvgPath.getTotalLength();

      //styles for SVG icon
      scrollUpBtn.style.strokeDasharray = `${pathLength} ${pathLength}`;
      scrollUpBtn.style.transition = 'stroke-dashoffset 500ms';

      //function return a value of element while window is scrollung
      const getTop = () => {
         return window.pageYOffset || document.documentElement.sccollTop;
      };

      //function is in charge of pressing and running a scroll up btn
      const updateDashoffset = () => {
         const scrollheight = document.documentElement.scrollHeight - window.innerHeight; // calculate difference between scroll height
         const dashoffset = pathLength - (getTop() * pathLength / scrollheight);
         scrollUpSvgPath.style.strokeDashoffset = dashoffset;
      };

      // toggle active class
      window.addEventListener("scroll", (e) => {
         updateDashoffset();
         if (getTop() > offset) {
            scrollUpBtn.classList.add("active");
         } else {
            scrollUpBtn.classList.remove("active");
         }
      });

      scrollUpBtn.addEventListener("click", () => {
         window.scrollTo({
            top: 0,
            behavior: "smooth",
         });
      });
   }

   //Run preloader
   function runPreloader() {
      const preloader = document.querySelector(".preloader");
      preloader.classList.add("opacity-0");
      setTimeout(function () {
         preloader.style.display = "none";
      }, 1000)

   }

   window.addEventListener("load", runPreloader);

   //run modal (pop-up)
   function runModal() {
      const openModalButtons = document.querySelectorAll("[data-modal-target]");
      const closeModalButtons = document.querySelectorAll("[data-close-button]");
      const overlay = document.querySelector(".modal-overlay");

      //open modal
      function openModal(modal) {
         if (modal === null) return;
         modal.classList.add("active");
         overlay.classList.add("active");
         document.querySelector("body").classList.add("lock");
      }

      //close modal
      function closeModal(modal) {
         if (modal === null) return;
         modal.classList.remove("active");
         overlay.classList.remove("active");
         document.querySelector("body").classList.remove("lock");
      }

      openModalButtons.forEach(btn => {
         btn.addEventListener("click", (event) => {
            event.preventDefault();
            const modal = document.querySelector(btn.dataset.modalTarget);
            openModal(modal);
         })
      });

      closeModalButtons.forEach(btn => {
         btn.addEventListener("click", (event) => {
            event.preventDefault();
            const modal = btn.closest(".scaled");
            closeModal(modal);
         })
      });

      //remove overlay by clcking outside modal window
      overlay.addEventListener("click", () => {
         const openModals = document.querySelectorAll(".scaled.active");
         openModals.forEach(modal => {
            closeModal(modal);
         });
      });
   }

   //slider inside a modal dialog
   function sliderModal() {
      const overlay = document.querySelector(".modal-services__overlay");
      const overlayBody = document.querySelector(".modal-services__body");
      const modalImg = document.querySelector(".modal-services__pic");
      const prevBtn = document.querySelector(".modal-services__icon-link--prev");
      const nextBtn = document.querySelector(".modal-services__icon-link--next");
      const slideTitle = document.querySelector(".modal-services__info-title");
      const slideCounter = document.querySelector(".modal-services__info-counter");
      const galleryItem = document.querySelectorAll(".gallery-service__item");
      const galleryItemLength = galleryItem.length;



      let galleryItemIndex = 0; // specify an index of gallery Item

      for (let i = 0; i < galleryItemLength; i++) {
         galleryItem[i].addEventListener("click", () => {
            galleryItemIndex = i;
            toggleOverlay();
            changeImgSrc();
         });
      }

      const toggleOverlay = () => {
         overlay.classList.toggle("open");
         overlayBody.classList.toggle("open");
         document.body.classList.toggle("lock");
      }

      const changeImgSrc = () => { // change image, title and counter depend on clicking gallery item
         imgSrc = galleryItem[galleryItemIndex].querySelector(".gallery-service__pic").getAttribute("src");// get src of img when click to a certain gallery item
         imgAlt = galleryItem[galleryItemIndex].querySelector(".gallery-service__pic").getAttribute("alt"); // get value of alt attribute for each pic

         modalImg.src = imgSrc;
         modalImg.alt = imgAlt;

         slideTitle.innerHTML = galleryItem[galleryItemIndex].querySelector(".gallery-service__title").textContent; // get a text value of <h3> in gallery item
         slideCounter.innerHTML = `${galleryItemIndex + 1} of ${galleryItemLength}`; // get a slider counter

      };

      prevBtn.addEventListener("click", (event) => {
         event.preventDefault();
         if (galleryItemIndex === 0) {
            galleryItemIndex === galleryItemLength - 1;
         } else {
            galleryItemIndex--;
         }
         changeImgSrc();
      });

      nextBtn.addEventListener("click", (event) => {
         event.preventDefault();
         if (galleryItemIndex === galleryItemLength - 1) {
            galleryItemIndex === 0;
         } else {
            galleryItemIndex++;
         }
         changeImgSrc();
      });

      overlay.addEventListener("click", (event) => { // close modal dilog on clicking outside it
         const target = event.target;

         if (!target.closest(".modal-services__body") || target.closest(".modal-services__close")) {
            event.preventDefault();
            toggleOverlay();
         }
      });
   }

   // run custom scrollbar
   const runCustomScrollbar = () => {
      const progressbar = document.querySelector(".progressbar");

      let totaHeight = document.body.scrollHeight - window.innerHeight;

      window.addEventListener("scroll", function () {
         let progress = (window.pageYOffset / totaHeight) * 100;
         progressbar.style.height = progress + "%";
      });

   };

   const swiper1 = new Swiper('.swiper-container.slider-1', { // Team Section
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
         loadPrevNext: true,
      },

      breakpoints: {
         550: {
            slidesPerView: 2,
            spaceBetween: 10,
         },
         768: {
            slidesPerView: 3,
            spaceBetween: 20,
         },
         992: {
            slidesPerView: 4,
            spaceBetween: 30,
         },
      }
   });

   const swiper2 = new Swiper('.swiper-container.slider-2', { // Reviews Section
      loop: true,
      speed: 700,
      grabCursor: true,
      watchOverflow: true,
      lazy: {
         loadPrevNext: true,
      },
   });

   const swiper3 = new Swiper('.swiper-container.slider-3', { // Partners Section
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
         loadPrevNext: true,
      },
      breakpoints: {
         520: {
            slidesPerView: 3,
            spaceBetween: 10,
         },
         768: {
            slidesPerView: 3,
            spaceBetween: 20,
         },
         992: {
            slidesPerView: 4,
            spaceBetween: 30,
         },

         1200: {
            slidesPerView: 5,
            spaceBetween: 30,
         },

         1450: {
            slidesPerView: 6,
            spaceBetween: 50,
         }
      }
   });

   const swiper = new Swiper('.swiper-container.slider-4', { // modal dilog for photogallery section
      autoplay: {
         delay: 4000,
         disableOnInteraction: false
      },
      loop: true,
      speed: 600,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 8,
      loop: true,
      lazy: {
         loadPrevNext: true,
      },
      navigation: {
         nextEl: '.swiper-button-next-custom',
         prevEl: '.swiper-button-prev-custom',
      },
      breakpoints: {
         640: {
            slidesPerView: 2,
            spaceBetween: 10,
         },
         992: {
            slidesPerView: 3,
            spaceBetween: 15,
         },
         1200: {
            slidesPerView: 4,
            spaceBetween: 25,
         },
      }
   });

/* AOS animation*/
   
   AOS.init({
      offset: 200,
      duration: 600,
      once: true,
   });

   //call functions
   runModal();
   runPreloader();
   fixedHeader();
   sliderModal();
   runCustomScrollbar();
   runToggleBtn();
   runScrollToTopBtn();
}

if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", runPageScript);
} else {
   runPageScript();
}


