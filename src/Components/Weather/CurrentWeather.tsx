import { useState } from "react";
import useWeatherWiseAppContext from "../useWeatherWiseAppContext";


function CurrentWeather(){
    const {selectedCity} = useWeatherWiseAppContext();
    /*selectedCity is in bracket coz the custom use context hook returns an object with different properties but we are destructuring it to extract only setSelectedCity
    Same as:  const context = useWeatherWiseAppContext();
    const selectedCity = context.selectedCity; */

    const [weatherData, setWeatherData] = useState({
        temperature: 0,
        chanceOfRain: 0,
        description:"Sunny",
    });

    return (
        <>
            <h1>Current Weather in {selectedCity}</h1>
        </>
    )

}

export default CurrentWeather