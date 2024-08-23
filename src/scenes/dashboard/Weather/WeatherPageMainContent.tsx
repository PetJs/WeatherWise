import '/src/App.css';
import CitySearchBar from './CitySearchBar';
import CurrentWeather from './CurrentWeather'; 
import HourlyForecast from './HourlyForecast';
import AirConditions from './AirConditions';
import DailyForecast from './DailyForecast'; 


function MainContent() {
    

    return (
        //<CitySearchBar/>//Search bar
        //Current Weather
        //Hourly Forecast
        //Air conditions
        //Daily Forecast to the right
        <div className="weather-page-main-content">
            <div className="weather-page-center-column">
                <div className='search-bar'>
                    <CitySearchBar />
                </div>

                <div className="weather-info-container">
                        <CurrentWeather />
                        <HourlyForecast />
                        <AirConditions />
                </div>
            </div>
            <div className="weather-page-right-column">
                    <DailyForecast/>
            </div>
            
        </div>
    );
}

export default MainContent;
