import generateMap from "./map.js";

const getIpAdress = () => {
   const API_URL = 'https://geo.ipify.org/api/v1?apiKey=at_egabQtEeqaFJr0vVmojV5Ah5CKg6o&ipAddress';

   const formSearch = document.querySelector(".search__form");

   //get response from API in JSON format
   const getJSONData = (url, errorMessage = 'IP Not Found') => {
      return fetch(url)
         .then(response => {
            if (!response.ok) {
               throw new Error(`${errorMessage}: ${response.status}`)
            }
            return response.json();
         })
   };


   // get data from api based on respose
   const requestIpData = (ip) => {
      getJSONData(`${API_URL}=${ip}`)
         .then(data => {
            renderIpDetails(data);
         })
         .catch(error => {
            console.log(`${error.message}, Please Try Again!`)
         })
   };

   // render, destructure data from API and update UI
   const renderIpDetails = ({ ip, location, isp }) => {
      const { country, city, region, timezone } = location;
      const ipInfo = document.querySelector(".ip"),
         locationInfo = document.querySelector(".location"),
         timezoneInfo = document.querySelector(".timezone"),
         ispInfo = document.querySelector(".isp");

      ipInfo.textContent = `${ip}`;
      locationInfo.textContent = `${country}, ${city}, ${region}`;
      timezoneInfo.textContent = `${timezone}`;
      ispInfo.textContent = `${isp}`;

      generateMap(location);
   }

   // render an error when issue occurred
   // const renderError = (message) => {
   //    if (message) {
   //       searchDetailsBody.innerHTML = "";
   //       searchDetailsBody.style.minHeight = "10rem";
   //       searchDetailsBody.insertAdjacentHTML("beforeend", message);
   //    }
   // };

   // get a user's IP value from input
   const getUserIP = (event) => {
      event.preventDefault();
      const ipAddressValue = document.querySelector(".search__input").value.toLowerCase().trim();
      formSearch.reset();
      if (ipAddressValue) {
         requestIpData(ipAddressValue);
      }
   };


   formSearch.addEventListener("submit", getUserIP);

   // initially render a current IP(location) of a certain user
   window.addEventListener("DOMContentLoaded", requestIpData(API_URL));

};

const runPreloader = () => {
   const preloader = document.querySelector(".preloader-container");
   preloader.classList.add("opacity-0");

   setTimeout(() => {
      preloader.style.display = "none";
   }, 1000);
};

getIpAdress();
runPreloader();