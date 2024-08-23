import { useEffect, useState } from "react";
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSun, faCloud, faCloudShowersHeavy, faSnowflake, faBolt, faSmog, faCloudRain } from '@fortawesome/free-solid-svg-icons';


type WeatherCondition = 'Clear' | 'Cloudy' | 'Rain' | 'Snow' | 'Thunderstorm' | 'Fog' | 'Drizzle';

const conditionIcons: { [key in WeatherCondition]?: IconDefinition } = {
    'Clear': faSun,
    'Cloudy': faCloud,
    'Rain': faCloudShowersHeavy,
    'Snow': faSnowflake,
    'Thunderstorm': faBolt,
    'Fog': faSmog,
    'Drizzle': faCloudRain,
};

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
            const localTime = new Date(now.getTime() + (weatherData.timezoneOffset || 0) * 3600000);
            setCurrentDateTime(localTime.toLocaleString());
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalId);
    }, [weatherData.timezoneOffset]);

    return (
        <div className="current-weather">
            <h1>{weatherData.location}</h1>
            <p className="current-time">{currentDateTime}</p>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {weatherData.location === "Your City" && weatherData.temperature === 0 ? (
                        <p>Please enter a city to get the current weather.</p>
                    ) : (
                        <div className="weather-details">
                            <div className="weather-info">
                                <FontAwesomeIcon
                                    icon={conditionIcons[weatherData.description as WeatherCondition] || faCloud}
                                    className="weather-icon"
                                />
                                <div className="weather-description">
                                    <p>{weatherData.description}</p>
                                </div>
                            </div>
                            {/* <div className="weather-stats">
                                <p className="temperature">Temperature: {weatherData.temperature}°C</p>
                                <p className="chance-of-rain">Chance of Rain: {weatherData.chanceOfRain}%</p>
                            </div> */}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default CurrentWeather;
