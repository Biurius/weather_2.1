function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ce42a02472a5d3bb424243005811a2d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showcurrentTemp);
}

function showcurrentTemp(response) {
  let actualtemp = Math.round(response.data.main.temp);
  let heading = document.querySelector("#temp-now");
  heading.innerHTML = `${actualtemp}`;
  let dateElement = document.querySelector("#current-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let currentcity = response.data.name;
  let changecity = document.querySelector("#city-now");
  changecity.innerHTML = `${currentcity}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

navigator.geolocation.getCurrentPosition(showPosition);

function search(event) {
  event.preventDefault();
  let unit = "metric";
  let apiKey = "ce42a02472a5d3bb424243005811a2d3";
  let searchInput = document.querySelector("#search-city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}`).then(selectCity);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function selectCity(response) {
  let currentcity = response.data.name;
  let changecity = document.querySelector("#city-now");
  changecity.innerHTML = `${currentcity}`;
  let currenttemp = Math.round(response.data.main.temp);
  let changeTemp = document.querySelector("#temp-now");
  changeTemp.innerHTML = `${currenttemp}`;
  let currentmax = Math.round(response.data.main.temp_max);
  let changecurrentmax = document.querySelector("#temp-max");
  changecurrentmax.innerHTML = `${currentmax}`;
  let currentmin = Math.round(response.data.main.temp_min);
  let changecurrentmin = document.querySelector("#temp-min");
  changecurrentmin.innerHTML = `${currentmin}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let dateElement = document.querySelector("#current-time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  celsiusTemperature = response.data.main.temp;
}

function showgeoTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ce42a02472a5d3bb424243005811a2d3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showcurrentTemp);
}

function changeCel(event) {
  event.preventDefault();
  let temperaturecelsius = document.querySelector("#temp-now");
  temperaturecelsius.innerHTML = Math.round(celsiusTemperature);
  tempDegrees.classList.add("active");
  tempFaren.classList.remove("active");
}

function changeFar(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  let temperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(temperature);
  tempDegrees.classList.remove("active");
  tempFaren.classList.add("active");
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", search);

let getcurrentLocation = document.querySelector("#geolocation");
getcurrentLocation.addEventListener("click", showgeoTemp);

let tempDegrees = document.querySelector("#centi");
tempDegrees.addEventListener("click", changeCel);

let temperatureElement = document.querySelector("#temp-now");
let temperature = temperatureElement.innerHTML;

let tempFaren = document.querySelector("#far");
tempFaren.addEventListener("click", changeFar);

let celsiusTemperature = null;
