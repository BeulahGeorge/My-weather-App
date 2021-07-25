function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function searchTemperature(response) {
  let wfstemperature = Math.round(response.data.main.temp);
  console.log(response);
  console.log(wfstemperature);
  let wfsCity = response.data.name;
  let wfsDesc = response.data.weather[0].description;
  let wfsTemp = document.querySelector("#cityTemp");
  wfsTemp.innerHTML = `${wfstemperature}`;
  let wfCity = document.querySelector("#cityname");
  wfCity.innerHTML = `${wfsCity}`;
  let fsDesc = document.querySelector("#description");
  fsDesc.innerHTML = `${wfsDesc}`;
  let wfsmaxtemp = Math.round(response.data.main.temp_max);
  console.log(wfsmaxtemp);
  let wfsmtemp = document.querySelector("#highTemp");
  wfsmtemp.innerHTML = `${wfsmaxtemp}`;
}

function searchcity(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#city");

  let cityname = document.querySelector("#cityname");
  /*alert(`temperature ${searchinput.value}`);*/
  cityname.innerHTML = `${searchinput.value}`;
  let keyapi = "b9fe6911542128bca5d3273719c2d53d";
  let apiwfc = `https://api.openweathermap.org/data/2.5/weather?q=${searchinput.value}&appid=${keyapi}&units=metric`;
  axios.get(apiwfc).then(searchTemperature);
}

let wcitysearch = document.querySelector("#search-form");
wcitysearch.addEventListener("submit", searchcity);

let dateElement = document.querySelector("#daytime");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

/*console.log(formatDate(date));*/

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  console.log(temperature);
  let currentCity = response.data.name;
  let weatherDesc = response.data.weather[0].description;
  let currentTemp = document.querySelector("#cityTemp");
  currentTemp.innerHTML = `${temperature}`;
  let geoCity = document.querySelector("#cityname");
  geoCity.innerHTML = `${currentCity}`;
  let desc = document.querySelector("#description");
  desc.innerHTML = `${weatherDesc}`;
  let maxtemp = Math.round(response.data.main.temp_max);
  console.log(maxtemp);
  let mtemp = document.querySelector("#highTemp");
  mtemp.innerHTML = `${maxtemp}`;
}

function showPosition(position) {
  console.log(position);
  let apiKey = "b9fe6911542128bca5d3273719c2d53d";
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);
  let apigeoloc = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apigeoloc).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentGeolocation = document.querySelector("#currentGeolocation");
currentGeolocation.addEventListener("click", getCurrentPosition);
