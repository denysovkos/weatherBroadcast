import {LOAD_WEATHER, LOAD_WEATHER_SUCCESS, LOAD_WEATHER_FAIL} from "../actions/weather";

export function weather(state = {loading: false}, action) {
  switch (action.type) {
    case LOAD_WEATHER:
      return {...state, loading: true};
    case LOAD_WEATHER_SUCCESS:
      return {...state, ...action.weather, loading: false}
    case LOAD_WEATHER_FAIL:
      return {...state, ...action.error, loading: false}
    default:
      return state;
  }
}
