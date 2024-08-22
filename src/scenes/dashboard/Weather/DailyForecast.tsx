
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";


interface DailyForecast{
    day: string;
    date: string;
    condition: string;
    temperature: number
}

function DailyForecast(){
    const {weatherData} = useWeatherWiseAppContext();
    const dailyForecastData: DailyForecast[] = weatherData.dailyForecast.map((dailyData) => ({
        day: new Date(dailyData.datetime).toLocaleDateString('en-UK', {weekday: 'long'}),
        date: new Date(dailyData.datetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        condition: dailyData.conditions,
        temperature: dailyData.temp,
    }));

    return(
        <div className="daily-forecast">
            <h2>7-Day Forecast</h2>
            {dailyForecastData.length > 0 ? (
                dailyForecastData.map((day, index) => (
                    <div className="each-day-forecast"  key ={index}>
                        <p>{day.day}, {day.date}</p>
                        <p>{day.condition}</p>
                        <p>{day.temperature}°C</p>
                    </div>
                ))
            ): (
                <p>No data available. Please enter a city</p>
            )}
        </div>
    );
}

export default DailyForecast;


