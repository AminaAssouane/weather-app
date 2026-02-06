import { processWeather } from "./logic";

async function main() {
  const weather = await processWeather();
  console.log(weather);
}

main();
