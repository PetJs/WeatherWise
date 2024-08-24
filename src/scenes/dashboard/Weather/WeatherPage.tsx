import '/src/App.css';
import CitySearchBar from './CitySearchBar';
import CurrentWeather from './CurrentWeather'; 
import HourlyForecast from './HourlyForecast';
import AirConditions from './AirConditions';
import DailyForecast from './DailyForecast';

function MainContent() {
    return (
        
        <div className="app">
           {/*  <Sidebarr /> */}
            <div className="content">
                <CitySearchBar />
                <div className="weather-container">
                    <div className="left-column">
                        <CurrentWeather />
                        <HourlyForecast />
                        <AirConditions />
                    </div>
                    <div className="right-column">
                        <DailyForecast />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MainContent;
