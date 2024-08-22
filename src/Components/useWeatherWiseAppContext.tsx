import {useContext } from "react";
import { WeatherWiseAppContext } from "./WeatherWiseAppProvider";

//useContext is a hook that allows you to consume a consume or use  a context within a component



/*CREATING A CUSTOM HOOK SO WE CAN USE THE CONTEXT CREATED IN OTHER COMPONENTS

If WeatherWiseAppContext is not accessed i.e if useWeatherWiseAppContext is not used within an AppProvider
If the component calling useWeatherWiseAppContext is within an AppProvider, useContext(WeatherWiseAppContext) returns  the value provided by the nearest AppContext.Provider which is an object containing selectedCity, setSelectedCity etc
If the component is not within an AppProvider, useContext(WeatherWiseAppContext) returns null
React contexts only work if a component is wrapped inside the corresponding provider that makes the context data  available to all components inside of it
If a component tries to access the context without being inside a provider, there's no data available, hence useContext returns null*/

function useWeatherWiseAppContext() {
  const context = useContext(WeatherWiseAppContext); //Allows us to access the context
  if (!context) {
    throw new Error("useWeatherAppContext must be used within an AppProvider");
  }
  return context;
};

export default useWeatherWiseAppContext;

