function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay} ${currentHour}:${currentMinutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-2">
                    <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
                    <div class="forecast-icon">
                      <img
                        src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png"
                        alt="weather icon"
                        class="forecast-icon"
                      />
                    </div>
                    <div class="forecast-temperature">
                      <span class="temperature-max-forecast">${Math.round(
                        forecastDay.temp.max
                      )} </span>
                      <span class="temperature-min-forecast">${Math.round(
                        forecastDay.temp.min
                      )}</span>
                    </div>
                  </div>
                `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "1f0ec59605e77b241bf0b174b889a407";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  console.log(response);
  let tempC = document.querySelector("#weatherMeasure");
  let cityElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#windElement");
  let humidityElement = document.querySelector("#humidityElement");
  let iconElement = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;
  tempC.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  getForecast(response.data.coord);
}
function searchCity(city) {
  let apiKey = "1f0ec59605e77b241bf0b174b889a407";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#explore").value;
  searchCity(city);
}
function displayLocation(position) {
  let apiKey = "1f0ec59605e77b241bf0b174b889a407";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayLocation);
}

let findCity = document.querySelector("#searchForm");
findCity.addEventListener("submit", search);
let formattedDate = document.querySelector("#update");
let date = new Date();
formattedDate.innerHTML = formatDate(date);
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", currentLocation);
searchCity("London");
