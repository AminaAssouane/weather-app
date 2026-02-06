import * as logic from "./logic.js";

const cityInput = document.getElementById("city");

// Grabbing the elements that showcase the current weather in our chosen city
const currentWeather = document.getElementById("current-weather");
const currentTemp = document.getElementById("current-temp");
const description = document.getElementById("description");

// Grabbing the elements that showcase this week's weather in our chosen city
const weekWeather = document.getElementById("week-weather");

const loading = document.getElementById("loading");

// Displays the current day's weather
function displayCurrentWeather(weather) {
  currentTemp.textContent = weather.currentTempCelsius;
  description.textContent = weather.description;
  currentWeather.append(currentTemp, description);
}

// Displays one day of the week's weather
function displayDayWeather(weather, day) {
  const date = document.createElement("div");

  const temps = document.createElement("div");
  const tempMax = document.createElement("span");
  const tempMin = document.createElement("span");
  temps.classList.add("temps");
  temps.append(tempMax, tempMin);

  const dayContainer = document.createElement("span"); // The container of our temperatures of the day

  date.textContent = weather.days[day].date;
  tempMax.textContent = weather.days[day].tempmax;
  tempMin.textContent = weather.days[day].tempmin;

  dayContainer.append(date, temps);
  weekWeather.appendChild(dayContainer);
}

async function main(city) {
  loading.style.display = "block";
  try {
    const weather = await logic.processWeather(city);
    displayCurrentWeather(weather);
    for (let i = 0; i < 7; i++) {
      displayDayWeather(weather, i);
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.style.display = "none";
  }
}

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") main(cityInput.value);
});
