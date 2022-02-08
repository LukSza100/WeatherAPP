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
      vievElems.searchInput.addEventListener('keydown', onEnterSubmit)
      vievElems.searchButton.addEventListener("click", onClickSubmit);
}

const initializeApp = () => {
  connectHTMLElems();
  setupListenners();
};

const onClickSubmit = () => {};

const onEnterSubmit = () => {};


document.addEventListener("DOMContentLoaded", initializeApp);
