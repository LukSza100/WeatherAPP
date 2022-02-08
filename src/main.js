import { getWetherByCity } from "./apiService.js";

const vievElems = {};

const getDOMElem = (id) => {
  return document.getElementById(id);
};

const connectHTMLElems = () => {
  vievElems.mainContainer = getDOMElem("mainContainer");
  vievElems.weatherSearchView = getDOMElem("weatherSearchView");
  vievElems.weatherForecastView = getDOMElem("weatherForecastView");

  vievElems.searchInput = getDOMElem("searchInput");
  vievElems.searchButton = getDOMElem("searchButton");
  vievElems.weatherCityContainer = getDOMElem("weatherCityContainer");

  vievElems.weatherCity = getDOMElem("weatherCity");
  vievElems.weatherIcon = getDOMElem("weatherIcon");

  vievElems.weatherCurrentTemp = getDOMElem("weatherCurrentTemp");
  vievElems.weatherMaxTemp = getDOMElem("weatherMaxTemp");
  vievElems.weatherMinTemp = getDOMElem("weatherMinTemp");

  vievElems.returnToSearchBtn = getDOMElem("returnToSearchBtn");
};

const setupListenners = () => {
  vievElems.searchInput.addEventListener("keydown", onEnterSubmit);
  vievElems.searchButton.addEventListener("click", onClickSubmit);
  vievElems.returnToSearchBtn.addEventListener("click", returnToSearch);
};

const initializeApp = () => {
  connectHTMLElems();
  setupListenners();
};

const onEnterSubmit = (event) => {
  if (event.key === "Enter") {
    fadeInOut();
    let query = vievElems.searchInput.value;
    getWetherByCity(query).then((data) => {
      displayWeatherData(data);
    });
  }
};
const onClickSubmit = () => {
  fadeInOut();
  let query = vievElems.searchInput.value;
  getWetherByCity(query).then((data) => {
    displayWeatherData(data);
  });
};

const displayWeatherData = (data) => {
  switchViev();
  fadeInOut();

  const weather = data.consolidated_weather[0];
  vievElems.weatherCity.innerText = data.title;
  vievElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
  vievElems.weatherIcon.alt = weather.weather_state_name;

  const currTemp = weather.the_temp.toFixed(2);
  const maxTemp = weather.max_temp.toFixed(2);
  const minTemp = weather.min_temp.toFixed(2);

  vievElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp} °C`;
  vievElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} °C`;
  vievElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} °C`;
};

const fadeInOut = () => {
  if (
    vievElems.mainContainer.style.opacity === "1" ||
    vievElems.mainContainer.style.opacity === ""
  ) {
    vievElems.mainContainer.style.opacity = "0";
  } else {
    vievElems.mainContainer.style.opacity = "1";
  }
};

const switchViev = () => {
  if (vievElems.weatherSearchView.style.display !== "none") {
    vievElems.weatherSearchView.style.display = "none";
    vievElems.weatherForecastView.style.display = "block";
  } else {
    vievElems.weatherForecastView.style.display = "none";
    vievElems.weatherSearchView.style.display = "flex";
  }
};

const returnToSearch = () => {
  fadeInOut();
  setTimeout(() => {
    switchViev();
    fadeInOut();
  }, 500);
};

document.addEventListener("DOMContentLoaded", initializeApp);
