import * as logic from "./logic.js";

const cityInput = document.getElementById("city");

// Grabbing the elements that showcase the current weather in our chosen city
const currentWeather = document.getElementById("current-weather");
const iconContainer = document.getElementById("icon-container");
const currentTemp = document.getElementById("current-temp");
const description = document.getElementById("description");

// Grabbing the elements that showcase this week's weather in our chosen city
const weekWeather = document.getElementById("week-weather");

const loading = document.getElementById("loading");

// loadIcon fetches the SVG file as text
async function loadIcon(path) {
  const res = await fetch(path); // fetch the SVG file
  return await res.text(); // return SVG code as string
}

async function renderWeatherIcon(iconName, container) {
  const svgHTML = await loadIcon(`/assets/weather-icons/${iconName}.svg`);
  container.innerHTML = svgHTML;
}

// Displays the current day's weather
async function displayCurrentWeather(weather) {
  iconContainer.classList.add("weather-icon-container");
  await renderWeatherIcon(weather.icon, iconContainer);

  currentTemp.textContent = weather.currentTempCelsius;
  description.textContent = weather.description;
  currentWeather.append(currentTemp, description);
}

// Displays one day of the week's weather
async function displayDayWeather(weather, day) {
  const date = document.createElement("div");

  const weekIconContainer = document.createElement("div");
  weekIconContainer.classList.add("week-icon");
  await renderWeatherIcon(weather.days[day].icon, weekIconContainer);

  const temps = document.createElement("div");
  const tempMax = document.createElement("span");
  const tempMin = document.createElement("span");
  temps.classList.add("temps");
  temps.append(tempMax, tempMin);

  const dayContainer = document.createElement("span"); // The container of our temperatures of the day

  date.textContent = weather.days[day].date;
  tempMax.textContent = weather.days[day].tempmax;
  tempMin.textContent = weather.days[day].tempmin;

  dayContainer.append(date, weekIconContainer, temps);
  weekWeather.appendChild(dayContainer);
}

function clearWeek() {}

async function main(city) {
  loading.style.display = "block";
  try {
    const weather = await logic.processWeather(city);
    await displayCurrentWeather(weather);
    for (let i = 0; i < 7; i++) {
      console.log(i);
      await displayDayWeather(weather, i);
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
