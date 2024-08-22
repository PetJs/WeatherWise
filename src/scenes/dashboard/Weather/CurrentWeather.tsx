import { useEffect, useState } from "react";
import useWeatherWiseAppContext from "../../../Components/useWeatherWiseAppContext";

function CurrentWeather() {
    const { selectedCity } = useWeatherWiseAppContext();
    const [weatherData, setWeatherData] = useState({
        temperature: 0,
        chanceOfRain: 0,
        description: "Sunny",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            const apiKey = 'V4VPJQ545QWEHBWZM6X6CBHF3';
            const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=${apiKey}`);
            const data = await response.json(); // Call `json` method to parse the response

            setWeatherData({
                temperature: data.currentConditions.temp,
                chanceOfRain: data.currentConditions.precip,
                description: data.currentConditions.conditions,
            });
        } catch (error) {
            console.error("Error fetching weather data: ", error);
            //setError("Failed to fetch weather data. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (selectedCity) {
            fetchWeatherData(selectedCity);
        }
    }, [selectedCity]);

    return (
        <div className="current-weather">
            <h1>{selectedCity}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <p>Temperature: {weatherData.temperature}°F</p>
                    <p>Chance of Rain: {weatherData.chanceOfRain}%</p>
                    <p>{weatherData.description}</p>
                </>
            )}
        </div>
    );
}

export default CurrentWeather;
