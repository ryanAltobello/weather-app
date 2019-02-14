export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_FORECAST":
      return action.payload;
    default:
      return state;
  }
};
