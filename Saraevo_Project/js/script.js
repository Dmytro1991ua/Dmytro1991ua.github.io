
document.addEventListener("DOMContentLoaded", () => {
   //swipe js
   var swiper = new Swiper('.swiper-container', {
      autoplay: {
         delay: 4000,
         disableOnInteraction: false
      },
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
      },
      breakpoints: {
        
         768: {
            slidesPerView: 2,
            spaceBetween: 10,
         },

         992: {
            slidesPerView: 3,
            spaceBetween: 10,
         },

         1200: {
            slidesPerView: 4,
            spaceBetween: 10,
         },

         1600: {
            slidesPerView: 4,
            spaceBetween: 40,
         }

      }
   });
   
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
               setTimeout(updateCount, 10);
            } else {
               count.innerText = counterValue;
            }
         }

         updateCount();
      });
   }

   //run modal (pop-up)
   function runModal() {
      const openModalButtons = document.querySelectorAll("[data-modal-target]");
      const closeModalButtons = document.querySelectorAll("[data-close-button]");
      const modalBtns = document.querySelectorAll(".modal__btn");
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

      //prevent default behaviour on all links in modal window
      modalBtns.forEach(modalBtn => {
         modalBtn.addEventListener("click", event => {
            event.preventDefault();
         })
      })
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
      const galleryItems = document.querySelector(".gallery__body").children;
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
            //loop through children elements of gallery_body
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
  
  
   //call functions
   runCounter();
   runModal(); 
   runPreloader();
   runTabsFilter(); 
   runToggleBtn();
   fixedHeader(); 

});
