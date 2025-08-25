import React, { useState } from "react";
const api = {
  key: "e625e40eac0ddbb2680a3f73ec406b2c",
  base: "https://api.openweathermap.org/data/2.5/",
  geobase: "http://api.openweathermap.org/geo/1.0/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (evt) => {
    if (evt.key === "Enter" && query.trimEnd() !== "") {
      const geoRes = await fetch(
        `${api.geobase}direct?q=${query}&limit=1&appid=${api.key}`
      );
      const geoData = await geoRes.json();
      if (geoData.length === 0) {
        alert("City not found!");
        return;
      }
      const { lat, lon } = geoData[0];

      const weatherRes = await fetch(
        `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`
      );
      const weatherData = await weatherRes.json();
      setQuery("");
      setWeather(weatherData);
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="location-box">
            <div>
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
