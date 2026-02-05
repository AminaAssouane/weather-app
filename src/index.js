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

export async function processWeather() {
  const data = await getWeather();
  console.log(data);
  const weather = {
    currentTempCelsius: Math.floor(data.currentConditions.temp),
    currentTempFahrenheit: Math.floor(
      (data.currentConditions.temp * 9) / 5 + 32,
    ),
    icon: data.currentConditions.icon,
    description: data.description,
    days: data.days.slice(1, 8).map((element) => {
      return {
        date: element.datetime,
        tempmax: element.tempmax,
        tempmin: element.tempmin,
        tempmaxF: Math.floor((element.tempmax * 9) / 5 + 32),
        tempminF: Math.floor((element.tempmin * 9) / 5 + 32),
        icon: element.icon,
      };
    }),
  };
  return weather;
}

async function main() {
  const processed = await processWeather();
  console.log(processed);
}

main();
