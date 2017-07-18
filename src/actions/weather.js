export const LOAD_WEATHER = "REDUX/LOAD_WEATHER";
export const LOAD_WEATHER_SUCCESS = "REDUX/LOAD_WEATHER/SUCCESS";
export const LOAD_WEATHER_FAIL = "REDUX/LOAD_WEATHER/FAIL";

const apiKey = '0ae3410b12d69778d2506bc1d7e6c351';

export function loadWeather(city) {
  return (dispatch) => {
    dispatch(startFetch())
    return fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&&APPID=${apiKey}&units=metric&cnt=16`)
      .then(weather => weather.json())
      .then(weather => dispatch(fetchSuccess(weather)))
      .catch(error => dispatch(fetchFail(error)))
  }
}

function startFetch() {
  return {
    type: LOAD_WEATHER
  };
}

function fetchSuccess(data) {
  return {
    type: LOAD_WEATHER_SUCCESS,
    weather: data
  };
}

function fetchFail(error) {
  return {
    type: LOAD_WEATHER_FAIL,
    error
  };
}
