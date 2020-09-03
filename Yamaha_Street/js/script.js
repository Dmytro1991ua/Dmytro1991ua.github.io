
document.addEventListener("DOMContentLoaded", () => {
   //Sticky header section on scroll down
   function fixedHeader() {
      window.onscroll = function () {
         const scrollTop = document.documentElement.scrollTop;
         if (window.innerWidth > 1040) {
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
         document.querySelector(".header__info").classList.toggle("show");
         document.querySelector(".toggle__btn").classList.toggle("active");
         document.querySelector("body").classList.toggle("lock");

      });
      //close a navigation on specific link
      const links = document.querySelectorAll(".navigation__link");

      links.forEach(link => {
         link.addEventListener("click", () => {
            document.querySelector(".navigation").classList.remove("show");
            document.querySelector(".header__info").classList.remove("show");
            document.querySelector(".toggle__btn").classList.toggle("active");
            document.querySelector("body").classList.remove("lock");
         });
      });
   };

   //function which shows input filed on click to a an icon
   function showInputSearch() {
      const inputIcon = document.querySelector(".header__search-icon");
      const inputField = document.querySelector(".header__search-input");

      inputIcon.addEventListener("click", () => {
         inputField.classList.toggle("active");
      });
   }

   // tabs buttons to open a specific card on click
   /*function runTabsFilter() {
      const tabsFilter = document.querySelectorAll(".tabs");
      const tabsContent = document.querySelectorAll(".tabs-content");

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
            
            //loop through children elements of gallery_row
            for (let k = 0; k < tabsContent.length; k++) {
               //galleryItems[k].style.display = "none";

               if (target === tabsContent[k].getAttribute("data-category")) {
                  tabsContent[k].classList.remove("hide");
                  tabsContent[k].classList.add("show");
               } else {
                  tabsContent[k].classList.add("hide");
                  tabsContent[k].classList.remove("show");
               }
            }
         });
      }
   } */

   //handle different independent tabs on one page
   function runTabsFilter() {
      const tabsWrapper = document.querySelectorAll(".tab-wrapper"); // оборачиваем табы и контент табов в обвертку, для того чтобы в JS работать с ней, и чтобы в конечсном счёте табы были независимы друг отдруга (Чтобы они работали независимо друг от друга, надо их обернуть в отдельные дивы и работать уже с каждой конкретной обёрткой:)
      tabsWrapper.forEach((wrapper) => {
         const tabsFilterBtns = wrapper.querySelectorAll(".tab-filters");
         const tabsContent = wrapper.querySelectorAll(".tabs-content");
         for (let i = 0; i < tabsFilterBtns.length; i++) {
           // tabsFilterBtns[0].click(); // можем выбирать какая кнопка актинка для всех кнопок(tab filter btn -- элемент с индексом 1). Допустим у нас есть 2 разных таба на странице, активный класс для кнопки таба будет одинаковый для обоих табов
            
            tabsFilterBtns[i].onclick = function () {
               tabsFilterBtns.forEach((tablink) => {
                  tablink.classList.remove("active");
               })
               tabsContent.forEach((tabContent) => {
                  tabContent.classList.remove("show");
                  tabContent.classList.add("hide");
               })
               tabsFilterBtns[i].classList.add("active");
               tabsContent[i].classList.remove("hide");
               tabsContent[i].classList.add("show");
            }
         }

      });
   }

   //function which changes an active class of a navigation while scrolling to a specific section
   function changeActiveClassOnScroll() {
      const navigation = document.querySelectorAll(".navigation__link");
      const sections = document.querySelectorAll(".section");
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // window.pageYOffset + 160 - получает значения в 160px от вверха страницы

      navigation.forEach((link, index) => {
         const activeSection = sections[index];
         const compare = activeSection.offsetTop <= scrollPosition && (activeSection.offsetTop + activeSection.offsetHeight > scrollPosition);

         if (scrollPosition > 160) {
            compare ? link.classList.add("active") : link.classList.remove("active");
         }
      });
   }

   window.addEventListener("scroll", changeActiveClassOnScroll);

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


   //Run preloader
   function runPreloader() {
      const preloader = document.querySelector(".preloader-container");
      preloader.classList.add("opacity-0");
      setTimeout(function () {
         preloader.style.display = "none";
      }, 1000)

   }
   window.addEventListener("load", runPreloader);


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


   //call functions
   runModal();
   // runPreloader();
   fixedHeader();
   runTabsFilter();
   runToggleBtn();
   showInputSearch();
   // runScrollToTopBtn();
}); 
