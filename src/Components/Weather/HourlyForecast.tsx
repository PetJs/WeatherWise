import { useEffect, useState } from "react";
import useWeatherWiseAppContext from "../useWeatherWiseAppContext";

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
  const [hourlyForecastData, setHourlyForecastData] = useState<
    HourlyForecast[]
  >([]);

  const fetchHourlyForecast = async (city: string) => {
    try {
      if (!city || city === "Your City") {
        console.error("Invalid city name provided");
        return;
      }

      const apiKey = "V4VPJQ545QWEHBWZM6X6CBHF3";
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          city
        )}?unitGroup=us&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      const hourlyWeatherData = (data.days?.[0]?.hours || [])
        .filter((_: ApiHourlyData, index: number) => index % 3 === 0)
        .map((hour: ApiHourlyData) => ({
          time: new Date(hour.datetime).toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          temperature: hour.temp,
          description: hour.conditions,
          //icon: "placeholder-icon-url", // Ensure this is replaced with actual logic
        }));
        console.log(hourlyForecastData)
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
        {hourlyForecastData.map((hour, index: number) => (
          <li key={index}>
            <p>{hour.time}</p>
            <p>{hour.temperature}°C</p>
            <img src={hour.icon} alt={hour.description} />
            <p>{hour.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HourlyForecast;
