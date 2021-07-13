function search(event) {
  event.preventDefault();
  let exploreCity = document.querySelector("#explore");
  let h1 = document.querySelector("h1");
  h1.innerHTML = exploreCity.value;
  let apiKey = "1f0ec59605e77b241bf0b174b889a407";
  let city = exploreCity.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
let findCity = document.querySelector("#searchForm");
findCity.addEventListener("submit", search);
function displayTemperature(response) {
  let temperature = Math.round(response.data.list[0].main.temp);
  let tempC = document.querySelector("#weatherMeasure");
  tempC.innerHTML = temperature;
}
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
let formattedDate = document.querySelector("#update");
let date = new Date();
formattedDate.innerHTML = formatDate(date);
