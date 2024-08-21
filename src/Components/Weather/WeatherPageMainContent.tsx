
import CitySearchBar from '../CitySearchBar';
import CurrentWeather from './CurrentWeather'; 
/* import HourlyForecast from './HourlyForecast';
import AirConditions from './AirConditions';
import DailyForecast from './DailyForecast'; */


function MainContent() {
    

    return (
        //<CitySearchBar/>//Search bar
        //Current Weather
        //Hourly Forecast
        //Air conditions
        //Daily Forecast to the right
        <div className="main-content">
            <CitySearchBar />
            <div className="weather-container">
                <div className="left-column">
                    <CurrentWeather />
                    {/* <HourlyForecast />
                    <AirConditions /> */}
                </div>
                <div className="right-column">
                    {/* <DailyForecast /> */}
                </div>
            </div>
        </div>
    );
}

export default MainContent;
