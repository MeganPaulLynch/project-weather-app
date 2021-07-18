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

let findCity = document.querySelector("#searchForm");
findCity.addEventListener("submit", search);
let formattedDate = document.querySelector("#update");
let date = new Date();
formattedDate.innerHTML = formatDate(date);
searchCity("London");
