document.addEventListener("DOMContentLoaded", () => {

   const API_KEY = '3f42cb974635f0f6e4deae85cbfd4c53';
   const MOVIE_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=';
   const IMG_URL = "https://image.tmdb.org/t/p/original"
   const movieBody = document.querySelector(".movies__body");
   const modal = document.querySelector(".movie-modal");
   const modalBtnClose = document.querySelector(".movie-modal__close");

   const preloader = () => {
      const preloader = document.querySelector(".preloader-container");
      preloader.classList.add("opacity-0");
      setTimeout(() => {
         preloader.style.display = "none";
      }, 1000);
   };

   const toggleModal = () => {
      modal.classList.toggle("show");
      document.querySelector("body").classList.toggle("lock");
   };

   const closeModal = (event) => {
      const target = event.target;
      if (target.classList.contains("show")) {
         toggleModal();
      }
   }


   const getMovieData = () => {
      axios.get(`${MOVIE_URL}${API_KEY}`)
         .then(response => {
            renderMovieCard(response.data.results)
         })
         .catch(error => {
            renederError(`Something went wrong with your response: ${error.message}, Please Try Again!`)
         })
   };

   const renderMovieCard = (movies) => {
      movies.forEach(movie => {
         const movieDeatils = document.createElement("a");
         movieDeatils.classList.add('movies__item');

         movieDeatils.innerHTML = `
            <figure class="movies__poster">
                <img src="${IMG_URL + movie.poster_path}" alt="" class="movies__img" data-movie-id="${movie.id}" loading="lazy">
            </figure>
            <div class="movies__info">
                <p class="movies__title">${movie.title}</p>
                <p class="movies__subtitle">${movie.vote_average}</p>
            </div>
         `;
         movieBody.appendChild(movieDeatils);
         movieDeatils.addEventListener("click", () => {
            toggleModal();
            renderMovieDetails(movie);
         });
      })
   };

   const renderMovieDetails = (movie) => {

      const modalBody = document.querySelector(".movie-modal__info");
      const moviePoster = document.querySelector(".movie-modal__img");
      moviePoster.src = IMG_URL + movie.poster_path;
      
      modalBody.innerHTML = `
         <h3 class="movie-modal__name">${movie.title}</h3>
         <p class="movie-modal__movie-info">Description:<span class="movie-modal__movie-info--description">${movie.overview}</span></p>
         <p class="movie-modal__movie-info">Release Date:<span class="movie-modal__movie-info--description">${movie.release_date}</span></p>
          <p class="movie-modal__movie-info">Rating:<span class="movie-modal__movie-info--description">${movie.vote_average}</span></p>
      `;

   }

   const renederError = (message) => {
      if (message) {
         movieBody.innerHTML = "";
         movieBody.insertAdjacentHTML("beforeend", message);
      }
   }

   modalBtnClose.addEventListener("click", toggleModal);
   modal.addEventListener("click", closeModal);
   window.addEventListener("keydown", (event) => {
      if (event.code === "Escape" && modal.classList.contains("show")) {
         toggleModal();
      }
   });
   window.addEventListener("load", preloader);

});
