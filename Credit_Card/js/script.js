

document.addEventListener("DOMContentLoaded", () => {
   //run  Preloader
   function runPreloader() {
      const preloader = document.querySelector(".preloader-container");
      preloader.classList.add("opacity-0");
      setTimeout(function () {
         preloader.style.display = "none";
      }, 1000)

   }

   window.addEventListener("load", runPreloader);

   //Slider for Service section
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
      //init: false,
      navigation: {
         nextEl: '.swiper-button-next-custom',
         prevEl: '.swiper-button-prev-custom',
      },
      breakpoints: {
         550: {
            slidesPerView: 1,
            spaceBetween: 10,
         },
         768: {
            slidesPerView: 2,
            spaceBetween: 20,
         },
         992: {
            slidesPerView: 3,
            spaceBetween: 30,
         },
         1024: {
            slidesPerView: 4,
            spaceBetween: 30,
         },
      }
   });

   //Slider for a types of Credit Cards Section
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
         prevEl: '.swiper-button-prev-custom-2',
      },
      breakpoints: {
         550: {
            slidesPerView: 1,
            spaceBetween: 20,
         },
         768: {
            slidesPerView: 2,
            spaceBetween: 15,
         },
         992: {
            slidesPerView: 3,
            spaceBetween: 40,
         },
         1600: {
            slidesPerView: 4,
            spaceBetween: 50,
         },

         1920: {
            slidesPerView: 4,
            spaceBetween: 70,
         },
      }
   });


   //Sticky header section on scroll down
   function fixedHeader() {
      window.onscroll = function () {
         const scrollTop = document.documentElement.scrollTop;
         if (window.innerWidth > 790) {
            if (scrollTop > 70) {
               document.querySelector(".header").classList.add("sticky");
            } else {
               document.querySelector(".header").classList.remove("sticky");
            }
         }
      }
   }

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

   // run accordion
   function runAccordion() {
      const accordions = document.querySelector(".accordion").children;

      // iterate over each accodrion item
      for (let item of accordions) {
         const btn = item.querySelector(".accordion__button");

         //open one of accordion items by default
         if (item.classList.contains("active")) {
            item.querySelector(".accordion__content").style.maxHeight = item.querySelector(".accordion__content").scrollHeight + "px"; //get a height of a content of accordion
            item.querySelector(".accordion__button").classList.add("is-open"); //change an icon when class is active
         }

         //changes on click to a btn in each accordion item
         btn.addEventListener("click", () => {
            for (let item of accordions) {
               item.querySelector(".accordion__content").style.maxHeight = "0px";
               item.querySelector(".accordion__button").classList.remove("is-open");
            }
            item.querySelector(".accordion__content").style.maxHeight = item.querySelector(".accordion__content").scrollHeight + "px"; //get a height of a content of accordion
            item.querySelector(".accordion__button").classList.add("is-open"); //change an icon when class is active
         });
      }

   }

   // tabs buttons to open a specific card on click
   function runTabsFilter() {
      const tabsFilter = document.querySelector(".tabs-filter").children;
      const accordionItems = document.querySelector(".fag__accordion-row").children;

      //loop through each tab (filter) btn
      for (let i = 0; i < tabsFilter.length; i++) {
         tabsFilter[i].addEventListener("click", function () {
            //remove active class from other btn which are not clicked at the moment
            for (let j = 0; j < tabsFilter.length; j++) {
               tabsFilter[j].classList.remove("active");
            }
            //add active class to a clicked btn
            this.classList.add("active");
            const target = this.getAttribute("data-target"); // get a certain value from data-target attribute
            //loop through children elements of fag__accordion-row (all accrodions elements)
            for (let k = 0; k < accordionItems.length; k++) {

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
   }

   //run a counter
   runCounter = () => {
      const counters = document.querySelectorAll(".counter");

      counters.forEach((item) => {
         let count = 0;
         const value = Number(item.dataset.target);
         const speed = 15; //0.1

         const updateCounter = () => {
            item.querySelector(".counter__value").innerText = count;
            count++;
            if (count > value) {
               clearInterval(counter);
            }
         };

         const counter = setInterval(() => updateCounter(), speed);
      });
   };


   //run modal (pop-up)
   function runModal() {
      const openModalButtons = document.querySelectorAll("[data-modal-target]");
      const closeModalButtons = document.querySelectorAll("[data-close-button]");
      const overlay = document.querySelector(".modal__overlay");

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
            const modal = btn.closest(".modal__body");
            closeModal(modal);
         })
      });

      //remove overlay by clcking outside modal window
      overlay.addEventListener("click", () => {
         const openModals = document.querySelectorAll(".modal__body.active");
         openModals.forEach(modal => {
            closeModal(modal);
         });
      });
   }


   function runParallaxEfect() {

      function parallax(e) {
         this.querySelectorAll(".icon").forEach(icon => {
            const speed = icon.getAttribute("data-speed");

            const horizontal = (window.innerWidth - e.pageX * speed) / 100;
            const vertical = (window.innerHeight - e.pageY * speed) / 100;

            icon.style.transform = `translateX(${horizontal}px) translateY(${vertical}px)`;
            icon.style.webkitTransform = `translateX(${horizontal}px) translateY(${vertical}px)`;

         });
      }

      document.addEventListener("mousemove", parallax);
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
      window.addEventListener("scroll", () => {
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

   //function resets values from inputs and textarea after submitting form
   function resetFormItems() {
      const form = document.querySelector(".form-reset");

      form.addEventListener("submit", (event) => {
         event.preventDefault();
         form.reset();
      });
   }

   //function which changes an active class of a vavigation while scrolling to a specific section
   function changeActiveClassOnScroll() {
      const navLinks = document.querySelectorAll(".navigation__link");
      const sections = document.querySelectorAll(".section");
      console.log(sections);
      const scrollPosition = window.pageYOffset || document.documentElement.sccollTop; // window.pageYOffset + 160 - получает значения в 160px от вверха страницы

      navLinks.forEach((link, index) => {
         const activeSection = sections[index];
         const compare = activeSection.offsetTop <= scrollPosition && (activeSection.offsetTop + activeSection.offsetHeight > scrollPosition);

         if (scrollPosition > 50) {
            compare ? link.classList.add("active") : link.classList.remove("active");
         } else {
            link.classList.remove("active");
         }
      });
   }

   window.addEventListener("scroll", changeActiveClassOnScroll);


   //call functions
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