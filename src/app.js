function displayTemperature(response) {
  console.log(response);
  let tempC = document.querySelector("#weatherMeasure");
  let cityElement = document.querySelector("h1");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#windElement");
  let humidityElement = document.querySelector("#humidityElement");
  tempC.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
}
function searchCity(city) {
  let apiKey = "1f0ec59605e77b241bf0b174b889a407";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
searchCity("Seoul");
