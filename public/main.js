import { getCurrenWeather, getCitySuggestion } from "./api_handler.js";
const userInput = document.querySelector("input");
const citySuggest = document.querySelector("ul");
const city = document.querySelector("#citytext");
const country = document.querySelector("#countrytext");
const condition = document.querySelector("#condition");
const temp = document.querySelector("#temp");
const img = document.querySelector("#dayNight");
const tempChange = document.querySelector("#tempchange");
const body = document.querySelector("body");
const tempUnit = document.querySelector("#unit");
const weatherData = document.querySelector("#weatherdata");

const resetData = document.querySelector("#reset");
//
let savedCity = localStorage.getItem("cityname");
resetData.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});
//
userInput.addEventListener("keyup", (e) => {
  // console.log(userInput.value.length);

  if (userInput.value.trim() != "" && userInput.value.trim().length > 2) {
    getCityList(userInput.value);
    citySuggest.classList.remove("hidden");
    if (e.key == "Enter") {
      citySuggest.classList.add("hidden");

      showWeather(userInput.value);
    }
  } else {
    citySuggest.classList.add("hidden");
  }
});
//

const showWeather = (cityN) => {
  getCurrenWeather(cityN)
    .then((data) => {
      setCurrentData(data);
    })
    .catch((err) => {
      alert(err.message);
    });
};

//

if (savedCity) {
  console.log(savedCity);
  showWeather(savedCity);
}
//

const getCityList = (name) => {
  getCitySuggestion(name)
    .then((data) => {
      createList(data);
    })
    .catch((err) => {
      alert(err.message);
    });
};

//

//
let tempArr = new Array();
const setCurrentData = (data) => {
  tempArr = [];
  weatherData.classList.remove("hidden");
  const cityName = data.location.name;
  localStorage.setItem("cityname", cityName);
  const countryName = data.location.country;
  const conditionText = data.current.condition.text;
  tempArr[0] = data.current.temp_c;
  tempArr[1] = data.current.temp_f;
  const isDay = data.current.is_day;
  if (isDay) {
    img.setAttribute("src", "./img/day.png");
  } else {
    img.setAttribute("src", "./img/night.png");
  }
  country.innerText = countryName;
  city.innerText = cityName;
  condition.innerText = conditionText;
  temp.innerText = tempArr[0];
  console.log(cityName, conditionText, tempArr[0], isDay);
};

//

// let urlList = new Array();
const createList = (data) => {
  //console.log(data);
  if (data.length != 0) {
    // urlList = [];
    citySuggest.innerHTML = "";
    for (let index = 0; index < data.length; index++) {
      citySuggest.innerHTML += `<li class="h-auto p-3 border-b-2 border-blue-500 last-of-type:border-none" id="${data[index].url}">${data[index].name}, ${data[index].region}, ${data[index].country}`;
      // urlList[index] = data[index].url;
      // console.log(urlList);

      //   li.innerText =
      //     data[index].name +
      //     ", " +
      //     data[index].region +
      //     ", " +
      //     data[index].country;
      //   citySuggest.innerHTML += li;
      // }
    }
  }
};

body.addEventListener("keyup", (e) => {
  if (e.key == "/") {
    userInput.focus();
  }
});
let isCel = 1;
tempChange.addEventListener("click", () => {
  const temp_c = tempChange.firstElementChild.innerText;

  if (isCel) {
    if (temp_c != "TEMP") {
      temp.innerText = tempArr[isCel];
      tempUnit.innerText = "°F";
      isCel = 0;
    }
  } else {
    temp.innerText = tempArr[isCel];
    tempUnit.innerText = "°C";
    isCel = 1;
  }
});

citySuggest.addEventListener("click", (e) => {
  showWeather(e.target.id);
  userInput.value = "";
  citySuggest.classList.add("hidden");
});
