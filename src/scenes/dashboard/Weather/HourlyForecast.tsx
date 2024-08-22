import { useEffect, useState } from "react";
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";

interface HourlyForecast {
    time: string;
    temperature: number;
    description: string;
    icon: string;
}

function HourlyForecast() {
    const { weatherData, selectedCity } = useWeatherWiseAppContext();
    const [hourlyForecastData, setHourlyForecastData] = useState<HourlyForecast[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (weatherData && weatherData.dailyForecast.length > 0) {
            const hourlyWeatherData = weatherData.dailyForecast
                .filter((hour, index) => index % 3 === 0) // Filter out the data with 3 hr interval
                .map((hour) => {
                    let date = new Date(hour.datetime);
                    
                    // Check if the date is invalid
                    if (isNaN(date.getTime())) {
                        const currentDate = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
                        date = new Date(`${currentDate}T${hour.datetime}`);
                    }

                    // Format the time
                    const time = !isNaN(date.getTime())
                        ? date.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' })
                        : 'Invalid Date';

                    return {
                        time,
                        temperature: hour.temp, // Ensure this is in Celsius
                        description: hour.conditions,
                        icon: 'placeholder-icon-url' // Map to the actual icon URL or logic
                    };
                });

            if (hourlyWeatherData.length === 0) {
                setError("No hourly forecast data available.");
            } else {
                setHourlyForecastData(hourlyWeatherData);
                setError(null);
            }
        }
    }, [weatherData, selectedCity]);

    return (
        <div className="hourly-forecast">
            <h2>Hourly Forecast</h2>
            {error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {hourlyForecastData.length > 0 ? (
                        hourlyForecastData.map((hour, index: number) => (
                            <li key={index}>
                                <p>{hour.time}</p>
                                <p>{hour.temperature}°C</p>
                                <img src={hour.icon || 'placeholder-icon-url'} alt={hour.description} />
                                <p>{hour.description}</p>
                            </li>
                        ))
                    ) : (
                        <p>No hourly forecast data available. Enter a valid city</p>
                    )}
                </ul>
            )}
        </div>
    );
}

export default HourlyForecast;
