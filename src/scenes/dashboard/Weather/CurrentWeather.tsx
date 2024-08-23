/* import { useEffect, useState} from "react";
import useWeatherWiseAppContext from '../../../Components/useWeatherWiseAppContext'; */
import { useEffect, useState } from "react";
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";


function CurrentWeather(){
    const {selectedCity} = useWeatherWiseAppContext();
    /*selectedCity is in bracket coz the custom use context hook returns an object with different properties but we are destructuring it to extract only setSelectedCity
    Same as:  const context = useWeatherWiseAppContext();
    const selectedCity = context.selectedCity; */

    const { weatherData, fetchWeatherData } = useWeatherWiseAppContext();
    const [currentDateTime, setCurrentDateTime] = useState("")

    

    
    

    useEffect(() => {
        if (selectedCity){
            fetchWeatherData(selectedCity)
        }
    }, [fetchWeatherData,selectedCity]);


function CurrentWeather() {
    const { selectedCity, weatherData, fetchWeatherData } = useWeatherWiseAppContext();
    const [currentDateTime, setCurrentDateTime] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchWeatherData(selectedCity);
            setLoading(false);
        };

        if (selectedCity) {
            loadData();
        }
    }, [selectedCity, fetchWeatherData]);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const localTime = new Date(now.getTime() + weatherData.timezoneOffset * 3600000); // Convert timezoneOffset (in hours)  to milliseconds
            setCurrentDateTime(localTime.toLocaleString());
        };
    
        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000); //Update time every second
        return () => clearInterval(intervalId);
    }, [weatherData.timezoneOffset]);
    

    useEffect(() =>{
        const updateDateTime = () => {
            const now = new Date();
            setCurrentDateTime(now.toLocaleString())
        };
        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000); //schedules Update time  to run every second
        return () => clearInterval(intervalId);
        /* If you navigate away from this page or remove the CurrentWeather component from the DOM (for example, by navigating to a different route or unmounting the component for some reason), the component will unmount.
When the component unmounts, the cleanup function (clearInterval(intervalId)) is executed. This stops the interval, meaning the updateDateTime function will no longer run every second.*/
    }, []);

    return(
        <div className="current-weather">
            <h1>{weatherData.location}</h1>
            <p>{currentDateTime}</p>
            <p>Temperature: {weatherData.temperature}</p>
            <p>Chance of rain : {weatherData.chanceOfRain}</p>
            <p>{weatherData.description}</p>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {weatherData.location === "Your City" && weatherData.temperature === 0 ? (
                        <p>Please enter a city to get the current weather.</p>
                    ) : (
                        <>
                            <p>Temperature: {weatherData.temperature}°C</p>
                            <p>Chance of Rain: {weatherData.chanceOfRain}%</p>
                            <p>{weatherData.description}</p>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
}

export default CurrentWeather