const API_KEY = "2XLEZRM3LMZKL7KWR2FTHXL7M";

async function getWeather(city) {
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

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export async function processWeather(city) {
  const data = await getWeather(city);
  console.log(data);
  const weather = {
    address: data.address,
    currentTempCelsius: Math.floor(data.currentConditions.temp),
    currentTempFahrenheit: Math.floor(
      celsiusToFahrenheit(data.currentConditions.temp),
    ),
    icon: data.currentConditions.icon,
    description: data.description,
    days: data.days.slice(1, 8).map((day) => {
      const dateObj = new Date(day.datetime);
      return {
        date: dateObj
          .toLocaleDateString("en-GB", { weekday: "short", day: "numeric" })
          .replace(",", ""),
        tempmax: Math.floor(day.tempmax),
        tempmin: Math.floor(day.tempmin),
        tempmaxF: Math.floor(celsiusToFahrenheit(day.tempmax)),
        tempminF: Math.floor(celsiusToFahrenheit(day.tempmin)),
        icon: day.icon,
      };
    }),
  };
  return weather;
}

export function toggleUnit() {}
