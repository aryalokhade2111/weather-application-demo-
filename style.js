// Get elements from the page
const cityInput   = document.getElementById("cityInput");
const searchBtn   = document.getElementById("searchBtn");
const message     = document.getElementById("message");
const result      = document.getElementById("result");
const cityName    = document.getElementById("cityName");
const icon        = document.getElementById("icon");
const temp        = document.getElementById("temp");
const description = document.getElementById("description");
const humidity    = document.getElementById("humidity");

// Weather code -> symbol and text (Open-Meteo codes)
function getWeatherInfo(code) {
  if (code === 0)  return { icon: "☀️", text: "Clear sky" };
  if (code <= 2)   return { icon: "⛅", text: "Partly cloudy" };
  if (code === 3)  return { icon: "☁️", text: "Cloudy" };
  if (code <= 48)  return { icon: "🌫️", text: "Fog" };
  if (code <= 57)  return { icon: "🌦️", text: "Drizzle" };
  if (code <= 67)  return { icon: "🌧️", text: "Rain" };
  if (code <= 77)  return { icon: "❄️", text: "Snow" };
  if (code <= 82)  return { icon: "🌧️", text: "Rain showers" };
  if (code <= 86)  return { icon: "🌨️", text: "Snow showers" };
  return { icon: "⛈️", text: "Thunderstorm" };
}

// Main function
async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    message.textContent = "Please enter a city name.";
    return;
  }

  message.textContent = "Loading...";

  try {
    // Step 1: city name -> latitude and longitude
    const geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city) + "&count=1";
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results) {
      message.textContent = "City not found. Try again.";
        return;
    }

    const place = geoData.results[0];

    // Step 2: latitude and longitude -> weather
    const weatherUrl =
      "https://api.open-meteo.com/v1/forecast?latitude=" + place.latitude +
      "&longitude=" + place.longitude +
      "&current=temperature_2m,relative_humidity_2m,weather_code";

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    const current = weatherData.current;

    // Step 3: show on the page
    const info = getWeatherInfo(current.weather_code);

    cityName.textContent    = place.name + ", " + place.country;
    icon.textContent        = info.icon;
    temp.textContent        = current.temperature_2m + "°C";
    description.textContent = info.text;
    humidity.textContent    = current.relative_humidity_2m + "%";

    message.textContent = "";

  } catch (error) {
    message.textContent = "Something went wrong. Check your internet.";
  }
}

// Events
searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") getWeather();
});