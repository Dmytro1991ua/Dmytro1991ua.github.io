
//run modal (pop-up)
/*function runModal() {
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
      btn.addEventListener("click", (event) =>{
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

runModal(); */;
// tabs buttons to open a specific card on click
/*function runTabsFilter() {
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

runTabsFilter(); ;
//Run preloader
/*function runPreloader() {
   const preloader = document.querySelector(".preloader-container");
   preloader.classList.add("opacity-0");
   setTimeout(function () {
      preloader.style.display = "none";
   }, 1000)

}
window.addEventListener("load", runPreloader);
runPreloader();*/;


//Slider for Service section
var swiper = new Swiper('.slider-1', {
   autoplay: {
      delay: 4000,
      disableOnInteraction: false
   },
   loop: true,
   speed: 600,
   grabCursor: true,
   slidesPerView: 1,
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
var swiper = new Swiper('.slider-2', {
   autoplay: {
      delay: 4000,
      disableOnInteraction: false
   },
   loop: true,
   speed: 600,
   grabCursor: true,
   slidesPerView: 1,
   spaceBetween: 20,
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


function runParallaxEfect() {

   function parallax(e) {
      this.querySelectorAll("#icon").forEach(icon => {
         const speed = icon.getAttribute("data-speed");

         const horizontal = (window.innerWidth - e.pageX * speed) / 100;
         const vertical = (window.innerHeight - e.pageY * speed) / 100;

         icon.style.transform = `translateX(${horizontal}px) translateY(${vertical}px)`;
         icon.style.webkitTransform = `translateX(${horizontal}px) translateY(${vertical}px)`;

      });
   }


   document.addEventListener("mousemove", parallax);
}


//call functions
runAccordion();
runParallaxEfect();
runCounter();
fixedHeader();
runToggleBtn(); 