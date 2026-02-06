import * as logic from "./logic.js";

const currentWeather = document.getElementById("current-weather");
const weekWeather = document.getElementById("week-weather");
let currentTemp = document.getElementById("current-temp");
const loading = document.getElementById("loading");

let cityInput = document.getElementById("city");

function displayCurrentWeather(weather) {
  currentTemp.textContent = weather.currentTempCelsius;
  currentWeather.appendChild(currentTemp);
}

async function main(city) {
  loading.style.display = "block";
  currentTemp.style.display = "none";
  try {
    const weather = await logic.processWeather(city);
    displayCurrentWeather(weather);
  } catch (err) {
    console.error(err);
  } finally {
    currentTemp.style.display = "block";
    loading.style.display = "none";
  }
}

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") main(cityInput.value);
});
