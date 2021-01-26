const runWeatherAppScript = () => {
   //Weather API info
   const weatherApi = {
      apiKey: "991b53c438c4367255ef8979c7741abd",
      baseUrl: `https://api.openweathermap.org/data/2.5/weather`,
   };

   // Global variables
   const formSearch = document.querySelector(".weather-app__search-input"),
      citySearchInput = document.querySelector(".weather-app__city-search"),
      weatherDetails = document.querySelector('.weather-app__bottom'),
      geolocationError = document.querySelector(".weather-app__geolocation-error");


   // get a current user's geolocation (check if browser supports a Geolocation API)
   const geolocation = () => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(setPosition, showError);
      } else {
         geolocationError.style.display = "block";
         geolocationError.innerHTML = `<p>Browser doesn't support geolocation</p>`
      }
   };

   // set a current user location (latitude and longitude )
   const setPosition = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      requestCoordinates(latitude, longitude)
   };

   // show an error if browser doen't support Geolocation or it's blocked in the browser
   const showError = (error) => {
      geolocationError.style.display = "block";
      geolocationError.innerHTML = `<p>${error.message}</p>`
   };

   // get a data from weather API
   const requestCity = (city) => {
      axios.get(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.apiKey}`)
         .then(response => {
            renderWeatherData(response.data);
         })
         .catch(error => {
            const errorMessage = `<h3>Something went wrong with your request: ${error.message}, Please Try Again!</h3>`;

            if (error) {
               weatherDetails.innerHTML = "";
               weatherDetails.insertAdjacentHTML('beforeend', errorMessage);
            }
         });
   };

   // get a latitude, longitude coordinates of user's position
   const requestCoordinates = (latitude, longitude) => {
      axios.get(`${weatherApi.baseUrl}?lat=${latitude}&lon=${longitude}&appid=${weatherApi.apiKey}`)
         .then(response => {
            renderWeatherData(response.data);
            weatherDetails.classList.add("active");
         });
   };

   // convert Kelvin to Celsius
   const kelvinToCelcius = (kelvin) => {
      return Math.round(kelvin - 273, 15);
   };

   // render recieved weather data and update UI
   const renderWeatherData = ({ weather, name, sys, main }) => {
      const iconPath = weather[0].icon;
      const weatherIconSrc = `http://openweathermap.org/img/wn/${iconPath}@2x.png`;

      weatherDetails.innerHTML = `
          <div class="weather-app__bottom-body">
               <p class="weather-app__bottom-heading-2">${name},<span class="weather-app__bottom-heading-2--diff">${sys.country}</span></p>
               <!--First row starts-->
               <div class="weather-app__row">
                  <span class="weather-app__temperature">${kelvinToCelcius(main.temp)}°C</span>
                  <div class="weather-app__temperature-details">
                     <span class="weather-app__weather-condition">${weather[0].description}</span>
                     <span class="weather-app__temperature-max">${kelvinToCelcius(main.temp_max)}°C</span>
                     <span class="weather-app__temperature-min">${kelvinToCelcius(main.temp_min)}°C</span>
                  </div>
               </div>
               <!--First row ends-->
               <!--Second row starts-->
               <div class="weather-app__row">
                  <figure class="weather-app__icon-box">
                     <img src="${weatherIconSrc}" alt="weather icon" class="weather-app__icon">
                  </figure>
               </div>
               <!--Second row ends-->
               <!--Third row starts-->
               <div class="weather-app__row">
                  <div class="weather-app__temperature-additional">
                     <div class="weather-app__temperature-additional-box">
                        <span class="weather-app__temperature-feeling">${kelvinToCelcius(main.feels_like)}°C</span>
                        <p class="weather-app__temperature-additional-title">Feels like</p>
                     </div>
                     <div class="weather-app__temperature-additional-box">
                        <span class="weather-app__temperature-feeling">${main.humidity}%</span>
                        <p class="weather-app__temperature-additional-title">Humidity</p>
                     </div>
                  </div>
               </div>
               <!--Third row ends-->
          </div>
      `
   };

   //get a searched city
   const getSearchedCity = (event) => {
      event.preventDefault();

      const searchedCity = citySearchInput.value.toLowerCase().trim();
      formSearch.reset();
      weatherDetails.innerHTML = ""; // clear weather app details card before searching a new city;

      weatherDetails.classList.add("active");

      requestCity(searchedCity);
   };

   //event listeners;
   formSearch.addEventListener("submit", getSearchedCity);
   window.addEventListener("load", geolocation);
};

runWeatherAppScript();