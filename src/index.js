const API_KEY = "2XLEZRM3LMZKL7KWR2FTHXL7M";
const city = "London,UK";

async function getWeather() {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}`,
    );
    const data = await response.json();
    return data; // check the full object
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

async function processWeather() {
  const data = await getWeather();
  console.log(data);
  const weather = {
    currentTempCelsius: data.currentConditions.temp,
    currentTempFahrenheit: (data.currentConditions.temp * 9) / 5 + 32,
    icon: data.currentConditions.icon,
    description: data.currentConditions.description,
    days: data.days.slice(1, 7).map((element) => {
      return {
        date: element.datetime,
        tempmax: element.tempmax,
        tempmin: element.tempmin,
        icon: element.icon,
      };
    }),
  };
  return weather;
}

processWeather();
