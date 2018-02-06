//add a function here that calls the dispatch and checks if route is '/queue'

export const switchRoute = (route) => ({
  type: "SWITCH_ROUTE",
  payload: route
});