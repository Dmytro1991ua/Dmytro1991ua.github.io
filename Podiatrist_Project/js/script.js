
document.addEventListener("DOMContentLoaded", () => {

   // run accordion
   /* function runAccordion() {
       const accordions = document.querySelectorAll(".accordion__button");
       const accordionContents = document.querySelectorAll(".accordion__content");
 
       //iterate through each accordion btn
       accordions.forEach(button => {
          button.addEventListener("click", (event) => { //listen on click of each accordion btn
             event.preventDefault();
             const content = button.nextElementSibling; //get elements (text) right after a button element
 
             if (content.style.maxHeight) {
                content.style.maxHeight = "";
                button.classList.remove("is-open");
             } else {
                content.style.maxHeight = content.scrollHeight + "px";
                button.classList.add("is-open");
             }
 
             //if two accordions are opened at the same time, one of them should actually opened (only one should be active)
             accordionContents.forEach(accordionContent => {
                if (accordionContent !== content) {
                   accordionContent.style.maxHeight = null;
                }
 
                //iterate through each accordion btn in order to return back an icon (plus sign) when accordion is closing
                accordions.forEach(buttonAccordion => {
                   if (buttonAccordion !== button) {
                      buttonAccordion.classList.remove("is-open");
                   }
                });
             });
          });
       });
    }
 
 
    //run a counter
    function runCounter() {
       const counters = document.querySelectorAll("#counter");
       const speed = 800;
 
       counters.forEach(counter => {
          const updateCount = function () {
             const counterValue = +counter.getAttribute("data-target");
             const count = +counter.innerText;
             const increment = counterValue / speed;
             if (count < counterValue) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
             } else {
                count.innerText = counterValue;
             }
          }
 
          updateCount();
       });
    }
 
     //run a counter (another script of counter - анимация чисел и символов после них )
    runCounter = () => {
       const counters = document.querySelectorAll(".counter");
 
       counters.forEach((item) => {
          let count = 0;
          const value = Number(item.dataset.target);
          const speed = 10; //0.1
 
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
 
    runCounter();
 
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
 
    //Sticky header section on scroll down
    function fixedHeader() {
       window.onscroll = function () {
          const scrollTop = document.documentElement.scrollTop;
          if (window.innerWidth > 768) {
             if (scrollTop > 70) {
                document.querySelector(".header").classList.add("sticky");
             } else {
                document.querySelector(".header").classList.remove("sticky");
             }
          }
       }
    }
 
    // tabs buttons to open a specific card on click
    function runTabsFilter() {
       const tabsFilter = document.querySelector(".tabs-filter").children;
       const galleryItems = document.querySelector(".gallery__row").children;
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
             for (let k = 0; k < galleryItems.length; k++) {
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
    }
 
    //handle different independent tabs on one page
 function runTabsFilter2() {
    const tabsWrapper = document.querySelectorAll(".tab-wrapper"); // обворачиваем табы и контент табов в обвертку (можно назвать tab-wrapper), для того чтобы в JS работать с ней, и чтобы в конечном счёте табы были независимы друг от друга (Чтобы они работали независимо друг от друга, надо их обернуть в отдельные дивы и работать уже с каждой конкретной обёрткой:)
    tabsWrapper.forEach((wrapper) => { // итерируем по каждой обвертке, которая содержит табы и контент табов
       const tabsFilterBtns = wrapper.querySelectorAll(".tab-filters"); // для того чтобы работать с разными табами, нужно дать им один класс (например tab-filters для кнопок, tabs-content - для самого контента )
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
 
    //Run preloader
    function runPreloader() {
       const preloader = document.querySelector(".preloader-container");
       preloader.classList.add("opacity-0");
       setTimeout(function () {
          preloader.style.display = "none";
       }, 1000)
 
    }
    window.addEventListener("load", runPreloader);
 
    //ibg function allows to set some certain styles(as if it was inserted as a background) for an img which is inserted via <img> tag
    /*function ibg() {
 
       let ibg = document.querySelectorAll(".ibg");
       for (var i = 0; i < ibg.length; i++) {
          if (ibg[i].querySelector('img')) {
             ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
          }
       }
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
 
 //function resets values from inputs and textarea after submitting form
 
 
  //function which changes an active class of a vavigation while scrolling to a specific section
 function changeActiveClassOnScroll() {
    const navigation = document.querySelectorAll(".navigation__link");
    const sections = document.querySelectorAll(".section");
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // window.pageYOffset + 160 - получает значения в 160px от вверха страницы
 
    navigation.forEach((link,index) => {
       const activeSection = sections[index];
       const compare = activeSection.offsetTop <= scrollPosition && (activeSection.offsetTop + activeSection.offsetHeight > scrollPosition);
 
       if (scrollPosition > 70) {
          compare ? link.classList.add("active") : link.classList.remove("active");
       }
    });
 }
 
 window.addEventListener("scroll", changeActiveClassOnScroll);
 
    //function which shows input filed on click to a an icon
    function showInputSearch() {
       const inputIcon = document.querySelector(".header__search-icon");
       const inputField = document.querySelector(".header__search-input");
 
       inputIcon.addEventListener("click", () => {
          inputField.classList.toggle("active");
       });
    } */

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

   //call functions
   //runAccordion();
   //runCounter();
   runModal();
   runPreloader();
   fixedHeader();
   sliderModal();
   //runTabsFilter();
   //runTabsFilter2();
   runToggleBtn();
   runScrollToTopBtn();
   //ibg();
   //resetForm();
   //showInputSearch();
});

