import { getWetherByCity } from "./apiService.js";
import { mapListToDOMElements } from "./DOMActions.js";

class WeatherApp {
  constructor() {
    this.vievElems = {};
    this.initializeApp();
  }

  initializeApp = () => {
    this.connectDOMElements();
    this.setupListeners();
  };

  connectDOMElements = () => {
    const listOfIds = Array.from(document.querySelectorAll("[id")).map(
      (elem) => elem.id
    );
    this.vievElems = mapListToDOMElements(listOfIds);
  };

  setupListeners = () => {
    this.vievElems.searchInput.addEventListener("keydown", this.handleSubmit);
    this.vievElems.searchButton.addEventListener("click", this.handleSubmit);
    this.vievElems.returnToSearchBtn.addEventListener(
      "click",
      this.returnToSearch
    );
  };

  handleSubmit = () => {
    if (event.type === "click" || event.key === "Enter") {
      this.fadeInOut();
      let query = this.vievElems.searchInput.value;
     getWetherByCity(query).then((data) => {
        this.displayWeatherData(data);
      });
    }
  };

  fadeInOut = () => {
    if (
      this.vievElems.mainContainer.style.opacity === "1" ||
      this.vievElems.mainContainer.style.opacity === ""
    ) {
      this.vievElems.mainContainer.style.opacity = "0";
    } else {
      this.vievElems.mainContainer.style.opacity = "1";
    }
  };

  switchViev = () => {
    if (this.vievElems.weatherSearchView.style.display !== "none") {
      this.vievElems.weatherSearchView.style.display = "none";
      this.vievElems.weatherForecastView.style.display = "block";
    } else {
      this.vievElems.weatherForecastView.style.display = "none";
      this.vievElems.weatherSearchView.style.display = "flex";
    }
  };

  returnToSearch = () => {
    this.fadeInOut();
    setTimeout(() => {
      this.switchViev();
      this.fadeInOut();
    }, 500);
  };

  displayWeatherData = (data) => {
    this.switchViev();
    this.fadeInOut();

    const weather = data.consolidated_weather[0];
    this.vievElems.weatherCity.innerText = data.title;
    this.vievElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
    this.vievElems.weatherIcon.alt = weather.weather_state_name;

    const currTemp = weather.the_temp.toFixed(2);
    const maxTemp = weather.max_temp.toFixed(2);
    const minTemp = weather.min_temp.toFixed(2);

    this.vievElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp} °C`;
    this.vievElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp} °C`;
    this.vievElems.weatherMinTemp.innerText = `Min temperature: ${minTemp} °C`;
  };
}

document.addEventListener("DOMContentLoaded", new WeatherApp());
