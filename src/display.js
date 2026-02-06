import { processWeather } from "./logic.js";

const currentWeather = document.getElementById("current-weather");
const weekWeather = document.getElementById("week-weather");

async function main() {
  const weather = await processWeather();
  return weather;
}

const weather = main();

function displayCurrentWeather() {}
