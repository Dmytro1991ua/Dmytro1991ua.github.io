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

runAccordion();;
;
//ibg function allows to set some certain styles(as if it was inserted as a background) for an img which is inserted via <img> tag
/*function ibg() {

   let ibg = document.querySelectorAll(".ibg");
   for (var i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img')) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
   }
}

ibg(); */;
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

runCounter();;
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

runTabsFilter(); */;
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

//call function
runToggleBtn(); ;
//Run preloader
function runPreloader() {
   const preloader = document.querySelector(".preloader-container");
   preloader.classList.add("opacity-0");
   setTimeout(function () {
      preloader.style.display = "none";
   }, 1000)

}
window.addEventListener("load", runPreloader);
runPreloader();;
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

//call function
fixedHeader(); 
;

