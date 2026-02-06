import * as logic from "./logic.js";

const currentWeather = document.getElementById("current-weather");
const weekWeather = document.getElementById("week-weather");

function displayCurrentWeather(weather) {
  let currentTemp = document.createElement("div");
  currentTemp.textContent = weather.currentTempCelsius;
  currentWeather.appendChild(currentTemp);
}
async function main() {
  const weather = await logic.processWeather();
  displayCurrentWeather(weather);
}

main();
