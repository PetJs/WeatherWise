import { useEffect, useState } from "react";
import useWeatherWiseAppContext from "../useWeatherWiseAppContext";

interface DailyForecast {
    day: string;
    temperature: number;
    description: string;
}

interface ApiDayWeatherData {
    datetime: string;
    temp: number;
    conditions: string;
}

function DailyForecast() {
    const { selectedCity } = useWeatherWiseAppContext();
    const [dailyForecastData, setDailyForecastData] = useState<DailyForecast[]>([]);

    const fetchDailyForecast = async (city: string) => {
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
            console.log(data)
            const dailyWeatherData = data.days.slice(0, 7).map((day: ApiDayWeatherData) => ({
                day: new Date(day.datetime).toLocaleString('en-UK', { weekday: 'long' }),
                temperature: day.temp,
                description: day.conditions,
            }));
            setDailyForecastData(dailyWeatherData);
        } catch (error) {
            console.error("Error fetching daily weather forecast: ", error);
        }
    };

    useEffect(() => {
        if (selectedCity) {
            fetchDailyForecast(selectedCity);
        }
    }, [selectedCity]);

    return (
        <div className="daily-forecast">
            <h2>7-Day Weather Forecast</h2>
            <ul>
                {dailyForecastData.map((day, index: number) => (
                    <li key={index}>
                        <p>{day.day}</p>
                        <p>{day.temperature}°C</p>
                        <p>{day.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DailyForecast;
