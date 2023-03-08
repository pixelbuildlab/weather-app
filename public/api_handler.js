console.log("api script loaded");

const currUrl = "https://api.weatherapi.com/v1/current.json?key=";
const listUrl = "https://api.weatherapi.com/v1/search.json?key=";
const key = "aeeec5d5774b411c8fb125530232802";
const para = "&q=";
const para_2 = "&aqi=no";

const getCurrenWeather = async (search) => {
  const reqUrl = currUrl + key + para + search + para_2;
  const response = await fetch(reqUrl);
  if (response.status !== 200) {
    throw new Error("can not fetch data");
  }
 
  const data = await response.json();
  return data;
};

const getCitySuggestion = async (search) => {
  const reqUrl = listUrl + key + para + search + para_2;
  const response = await fetch(reqUrl);
  if (response.status !== 200) {
    throw new Error("can not fetch data");
  }
  const data = await response.json();
  return data;
};

export { getCurrenWeather, getCitySuggestion };
