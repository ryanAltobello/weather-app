import { combineReducers } from "redux";
import imageReducer from "./imageReducer";
import locationReducer from "./locationReducer";
import forecastReducer from "./forecastReducer";
import weatherReducer from "./weatherReducer";

export default combineReducers({
  image: imageReducer,
  location: locationReducer,
  forecast: forecastReducer,
  weather: weatherReducer
});
