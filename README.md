# Simple Weather App

A one-page weather app built with **HTML, CSS and JavaScript**. Enter a city name to see its live temperature, a weather symbol and the humidity.

## Files

- `index.html` - page structure
- `style.css` - design (centred card, rounded corners, colours)
- `script.js` - logic (calls the API and shows the data)

## How to Run

1. Keep all three files in the same folder.
2. Open `index.html` in a browser (internet required).
3. Type a city name, e.g. `Nagpur`, and click **Search**.

## How It Works

1. The city name is sent to the Open-Meteo Geocoding API to get its latitude and longitude.
2. The latitude and longitude are sent to the Open-Meteo Weather API to get the temperature, humidity and weather code.
3. The weather code is converted to a symbol (☀️ ☁️ 🌧️ etc.) and everything is shown on the page.

## Concepts Used

- **HTML:** input box, button, divs
- **CSS:** flexbox, border-radius, box-shadow
- **JavaScript:** DOM, event listeners, `fetch()` with `async/await`, JSON, `try/catch`

## Limitations

- Needs an internet connection
- Shows only current weather, not a forecast

## Technologies

HTML5, CSS3, JavaScript, Open-Meteo API (free, no API key)
