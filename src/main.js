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
    getWetherByCity(query).then((data) => console.log(data));
    switchViev();
    fadeInOut();
  }
};

const onClickSubmit = () => {
  let query = vievElems.searchInput.value;
  getWetherByCity(query).then((data) => console.log(data));
  switchViev();
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
  fadeInOut();
};

document.addEventListener("DOMContentLoaded", initializeApp);
