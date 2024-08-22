import useWeatherWiseAppContext from "./useWeatherWiseAppContext";

function AirConditions() {
  const context = useWeatherWiseAppContext();
  if (!context) {
    return <div>Loading.....</div>;
  }

  const {
    selectedCity,
    feelsLike,
    uvIndex,
    windSpeed,
    humidity,
    visibility,
    pressure,
    chanceOfRain,
    sunset,
  } = context;

  return (
    <div className="air-conditions">
      <h2>Air Conditions</h2>
      <div className="air-conditions-info">
        {selectedCity && selectedCity !== "Your City" ? (
          <>
            <p>Feels Like: {feelsLike}°C</p>
            <p>UV Index: {uvIndex}</p>
            <p>Wind Speed: {windSpeed} km/h</p>
            <p>Humidity: {humidity}%</p>
            <p>Visibility: {visibility} km</p>
            <p>Pressure: {pressure} hPa</p>
            <p>Chance of Rain: {chanceOfRain}%</p>
            <p>Sunset: {sunset}</p>
          </>
        ) : (
          <p>No data available, please enter a city.</p>
        )}
      </div>
    </div>
  );
}

export default AirConditions;
