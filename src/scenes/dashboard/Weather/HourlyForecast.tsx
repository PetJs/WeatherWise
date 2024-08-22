import { useEffect, useState } from "react";
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";

interface HourlyForecast {
    time: string;
    temperature: number;
    description: string;
    icon: string;
}

interface ApiHourlyData {
    datetime: string;
    temp: number;
    conditions: string;
    icon: string;
}

function HourlyForecast() {
    const { selectedCity } = useWeatherWiseAppContext();
    const [hourlyForecastData, setHourlyForecastData] = useState<HourlyForecast[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchHourlyForecast = async (city: string) => {
        try {
            if (!city || city === "Your City") {
                console.error("Invalid city name provided");
                setError("Invalid city name provided");
                return;
            }

            const apiKey = 'V4VPJQ545QWEHBWZM6X6CBHF3';
            const response = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&key=${apiKey}`
            );

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            const data = await response.json();
            console.log('API response:', data);

            const hourlyWeatherData = (data.days?.[0]?.hours || [])
                .filter((hour: ApiHourlyData, index: number) => index % 3 === 0)
                .map((hour: ApiHourlyData) => {
                     // Log the original datetime string to inspect it
                    console.log('Original datetime:', hour.datetime);

                    let date = new Date(hour.datetime);


                    // Check if the date is invalid
                    if (isNaN(date.getTime())) {
                        // If the datetime is just a time like "12:00", assume it's missing the date
                        const currentDate = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
                        date = new Date(`${currentDate}T${hour.datetime}`);
                        console.log('Reformatted datetime:', `${currentDate}T${hour.datetime}`);
                    }


                    // Format the time
                    const time = !isNaN(date.getTime())
                        ? date.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' })
                        : 'Invalid Date';        
                        
                    return {
                        time,
                        temperature: hour.temp,
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

            console.log('Hourly weather data:', hourlyWeatherData);
        } catch (error) {
            console.error("Error fetching hourly weather forecast: ", error);
            setError("Failed to fetch hourly weather forecast.");
        }
    };

    useEffect(() => {
        if (selectedCity) {
            fetchHourlyForecast(selectedCity);
        }
    }, [selectedCity]);

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
                        <p>No hourly forecast data available</p>
                    )}
                </ul>
            )}
        </div>
    );
}

export default HourlyForecast;
