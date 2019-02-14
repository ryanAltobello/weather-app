import unsplash from "../apis/unsplash";
import googleGeolocation from "../apis/googleGeolocation";
import openWeatherMap from "../apis/openWeatherMap";

let response = {};

export const getBackgroundImage = () => async dispatch => {
  const timeOfDay = new Date().getHours();

  if (timeOfDay > 4 && timeOfDay < 8) {
    response = await unsplash.get("/photos/random", {
      params: {
        query: "dawn"
      }
    });
  } else if (timeOfDay > 7 && timeOfDay < 17) {
    response = await unsplash.get("/photos/random", {
      params: {
        query: "sunlight"
      }
    });
  } else if (timeOfDay > 16 && timeOfDay < 20) {
    response = await unsplash.get("/photos/random", {
      params: {
        query: "dusk"
      }
    });
  } else {
    response = await unsplash.get("/photos/random", {
      params: {
        query: "night"
      }
    });
  }
  dispatch({ type: "FETCH_IMAGE", payload: response.data });
};

export const getLocation = () => async dispatch => {
  let latlng = "";
  navigator.geolocation.getCurrentPosition(
    async position => {
      latlng = `${position.coords.latitude},${position.coords.longitude}`;

      response = await googleGeolocation.get(
        `json?latlng=${latlng}&location_type=APPROXIMATE&result_type=locality&key=${
          process.env.REACT_APP_LOCATION_API_KEY
        }`
      );
      dispatch({ type: "FETCH_LOCATION", payload: response.data });
    },
    error => {
      dispatch({ type: "FETCH_LOCATION", payload: error });
    }
  );
};

export const getForecast = (lat, long) => async dispatch => {
  response = await openWeatherMap.get(
    `forecast?lat=${lat}&lon=${long}&units=imperial&lang=en&appid=${
      process.env.REACT_APP_WEATHER_API_KEY
    }`
  );

  dispatch({ type: "FETCH_FORECAST", payload: response.data });
};

export const getWeather = (lat, long) => async dispatch => {
  response = await openWeatherMap.get(
    `weather?lat=${lat}&lon=${long}&units=imperial&lang=en&appid=${
      process.env.REACT_APP_WEATHER_API_KEY
    }`
  );

  dispatch({ type: "FETCH_WEATHER", payload: response.data });
};
