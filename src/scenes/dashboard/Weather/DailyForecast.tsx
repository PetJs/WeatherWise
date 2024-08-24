import { useEffect } from "react";
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";
//import "./dailyForecast.css";

// Icon mapping for weather conditions
const conditionIcons: { [key: string]: string } = {
    'Clear': 'fa-sun',
    'Cloudy': 'fa-cloud',
    'Rain': 'fa-cloud-showers-heavy',
    'Snow': 'fa-snowflake',
    'Thunderstorm': 'fa-bolt',
    'Fog': 'fa-smog',
    'Drizzle': 'fa-cloud-rain',
};

interface DailyForecast {
    day: string;
    date: string;
    condition: string;
    temperature: number;
}

function DailyForecast() {
    const { weatherData } = useWeatherWiseAppContext();
    const dailyForecastData: DailyForecast[] = weatherData.dailyForecast.map((dailyData) => ({
        day: new Date(dailyData.datetime).toLocaleDateString('en-UK', { weekday: 'long' }),
        date: new Date(dailyData.datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        condition: dailyData.conditions,
        temperature: dailyData.temp,
    }));

    useEffect(() => {
        const sidebarElement = document.querySelector('.sidebar') as HTMLElement;
        const dailyForecastElement = document.querySelector('.daily-forecast') as HTMLElement;

        if (sidebarElement && dailyForecastElement) {
            const sidebarWidth = sidebarElement.offsetWidth;
            dailyForecastElement.style.width = `${sidebarWidth}px`;
        }
    }, []);

    return (
        <div className="daily-forecast">
            <h2>7-Day Forecast</h2>
            {dailyForecastData.length > 0 ? (
                dailyForecastData.map((day, index) => (
                    <div className="each-day-forecast" key={index}>
                        <p>{day.day}, {day.date}</p>
                        <i className={`fas ${conditionIcons[day.condition] || 'fa-question-circle'} icon`}></i>
                        <p>{day.temperature}°C</p>
                    </div>
                ))
            ) : (
                <p>No data available. Please enter a city</p>
            )}
        </div>
    );
}

export default DailyForecast;
