import { useEffect, useState } from "react";
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";

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
    

    return (
        <div className="current-weather">
            <h1>{weatherData.location}</h1>
            <p>{currentDateTime}</p>
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

export default CurrentWeather;
