let buttonSubmit = document.querySelector(".input-button");
let answer = document.querySelector(".answer");

const iconImg = document.getElementById("weather-icon");

let formCity = document.querySelector("#form");
formCity.addEventListener("submit", sendForm);

async function sendForm(event) {
  event.preventDefault();
  let form = event.target;
  let { value: cityName } = form.city;
  let res = await getWeather(cityName);
  iconImg.src = `https:${res.iconUrl}`;
  answer.innerHTML = `
  Температура в городе сейчас: ${res.tempCel} °C. </br>
  Точное время: ${res.localTime}
  `;
}

function getWeather(city) {
  let url = `http://api.weatherapi.com/v1/current.json?key=b43a4d82d6584c9c9ce84211220911&q=${city}&aqi=yes`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const tempCel = data.current.temp_c;
      const iconUrl = data.current.condition.icon;
      const localTime = data.location.localtime;
      return {
        tempCel,
        iconUrl,
        localTime,
      };
    })
    .catch(() => alert("Не могу найти город, попробуйте 'London'"));
}
