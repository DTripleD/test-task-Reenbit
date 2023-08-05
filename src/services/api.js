// const API_KEY = "54QNJPLCDHSMZMYJ75EUK7772";

const API_KEY = "XLMNP93YP7UYUX23UZFL3JT2E";

export const getWeekWeather = (city, startDate, endDate) => {
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
  ).then((res) => res.json());
};

export const getTodayWeather = (city) => {
  return fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
  ).then((res) => res.json());
};
