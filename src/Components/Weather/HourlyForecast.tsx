import { useEffect, useState } from "react";
import useWeatherWiseAppContext from "../../scenes/dashboard/Weather/useWeatherWiseAppContext";

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
}

function HourlyForecast() {
    const { selectedCity } = useWeatherWiseAppContext();
    const [hourlyForecastData, setHourlyForecastData] = useState<HourlyForecast[]>([]);

    const fetchHourlyForecast = async (city: string) => {
        try {
            if (!city || city === "Your City") {
                console.error("Invalid city name provided");
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
                    const date = new Date(hour.datetime);
                    const time = isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleTimeString('en-UK', { hour: '2-digit', minute: '2-digit' });
                    return {
                        time,
                        temperature: hour.temp,
                        description: hour.conditions,
                        icon: 'placeholder-icon-url' // Update this with the actual icon URL or logic
                    };
                });

            console.log('Hourly weather data:', hourlyWeatherData);
            setHourlyForecastData(hourlyWeatherData);
        } catch (error) {
            console.error("Error fetching hourly weather forecast: ", error);
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
        </div>
    );
}

export default HourlyForecast;
