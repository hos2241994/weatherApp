const mainContent = document.getElementById("mainContent");
const errorMsg = document.getElementById("errorMsg");
const weatherCardsContainer = document.getElementsByClassName(
  "weatherCardsContainer"
);

const getDataBtn = document.getElementById("getDataBtn");

const months = [
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

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function getWeatherData(loca = "cairo") {
  try {
    let res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=46bc0472444b468f83781743240912&q=${loca}&days=3`
    );

    if (!res.ok) {
      errorMsg.classList.replace("d-none", "d-block");
      throw new Error(`Response staus: ${res.status}`);
    }

    res = await res.json();
    console.log(res);

    displayWeather(res);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

function displayWeather(data) {
  const date = getDate(data.current.last_updated);
  weatherCardsContainer[0].innerHTML = `
  <div class="weatherCard flex-grow-1">
            <div class="cardHeader p-2 d-flex justify-content-between">
              <span class="day">${days[date.getDay()]}</span>
              <span class="date">${date.getDate()}${
    months[date.getMonth()]
  }</span>
            </div>
            <div class="cardBody py-4 px-3">
              <h2 id="city" class="fs-1 fw-bold">${data.location.name}</h2>
              <h3
                class="temp text-white d-flex flex-column fw-bolder align-items-center"
              >
                <img src=${data.current.condition.icon} alt=${
    data.current.condition.text
  } />
                <span class="">${data.current.temp_c}&#176;C</span>
              </h3>
              <h4 class="weatherCondition text-center">${
                data.current.condition.text
              }</h4>
            </div>
            <div class="card-footer p-2 d-flex">
              <p id="humidity">
                <img class="me-2" src="./img/humidity.png" alt="umberella" />${
                  data.current.humidity
                }%
              </p>
              <p id="wind" class="mx-4">
                <img class="me-2" src="./img/wind.png" alt="windy" />${
                  data.current.wind_kph
                }km/h
              </p>
              <p id="windDirection">
                <img class="me-2" src="./img/dir.png" alt="compass" /> ${
                  data.current.wind_dir
                }
              </p>
            </div>
          </div>
          <div class="weatherCard flex-grow-1 d-flex flex-column">
             <div class="cardHeader p-2 d-flex justify-content-between">
              <span class="day">${days[date.getDay() + 1]}</span>
              <span class="date">${date.getDate() + 1}${
    months[date.getMonth()]
  }</span>
            </div>
            <div
              class="cardBody d-flex flex-column justify-content-center py-4 px-3 flex-grow-1"
            >
              <h3
                class="temp text-white d-flex flex-column fw-bolder align-items-center"
              >
                <img src=${
                  data.forecast.forecastday[1].day.condition.icon
                } alt=${data.forecast.forecastday[1].day.condition.text} />
                <span class="">${
                  data.forecast.forecastday[1].day.maxtemp_c
                }&#176;C</span>
              </h3>
              <h4 class="weatherCondition text-center">${
                data.forecast.forecastday[1].day.condition.text
              }</h4>
            </div>
          </div>
          <div class="weatherCard flex-grow-1 d-flex flex-column">
             <div class="cardHeader p-2 d-flex justify-content-between">
              <span class="day">${days[date.getDay() + 2]}</span>
              <span class="date">${date.getDate() + 2}${
    months[date.getMonth()]
  }</span>
            </div>
            <div
              class="cardBody d-flex flex-column justify-content-center py-4 px-3 flex-grow-1"
            >
              <h3
                class="temp text-white d-flex flex-column fw-bolder align-items-center"
              >
                 <img src=${
                   data.forecast.forecastday[2].day.condition.icon
                 } alt=${data.forecast.forecastday[2].day.condition.text} />
                <span class="">${
                  data.forecast.forecastday[2].day.maxtemp_c
                }&#176;C</span>
              </h3>
              <h4 class="weatherCondition text-center">${
                data.forecast.forecastday[2].day.condition.text
              }</h4>
            </div>
          </div>`;
}

function getDate(d) {
  return new Date(d.split(" ")[0]);
}

getDataBtn.addEventListener("click", (e) => {
  const city = e.target.previousElementSibling.value;
  console.log(e.target.previousElementSibling.value);

  getWeatherData(city);
});

getWeatherData();
