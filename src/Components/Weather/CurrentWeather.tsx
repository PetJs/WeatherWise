import { useEffect, useState } from "react";
import useWeatherWiseAppContext from "../useWeatherWiseAppContext";
import axios from "axios";

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
    const fetchWeatherData = async(city: string) =>{
        try{
            const apiKey = 'V4VPJQ545QWEHBWZM6X6CBHF3';
            const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services
          /timeline/${city}?unitGroup=us&key=${apiKey}`);
          const data = response.data;
          console.log(data);

          setWeatherData({
            temperature: data.currentConditions.temp,
            chanceOfRain: data.currentConditions.precip,
            description: data.currentConditions.conditions,
        });
        }catch(error){
            console.error("Error fetching weather data: ", error)
        }
    }

    useEffect(() => {
        if(selectedCity){
            fetchWeatherData(selectedCity)
        }
    }, [selectedCity]);

    return(
        <div className="current-weather">
            <h1>{selectedCity}</h1>
            <p>{weatherData.temperature}</p>
            <p>Chance of Rain : {weatherData.chanceOfRain}</p>
            <p>{weatherData.description}</p>
        </div>
    )




}

export default CurrentWeather