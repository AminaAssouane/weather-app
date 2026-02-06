import * as logic from "./logic.js";

const currentWeather = document.getElementById("current-weather");
const weekWeather = document.getElementById("week-weather");
let currentTemp = document.getElementById("current-temp");

let cityInput = document.getElementById("city");

function displayCurrentWeather(weather) {
  currentTemp.textContent = weather.currentTempCelsius;
  currentWeather.appendChild(currentTemp);
}

async function main(city) {
  const weather = await logic.processWeather(city);
  displayCurrentWeather(weather);
}

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") main(cityInput.value);
});
