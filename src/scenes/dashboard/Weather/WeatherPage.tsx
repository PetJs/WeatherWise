import '/src/App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CitySearchBar from './CitySearchBar';
import CurrentWeather from './CurrentWeather'; 
import HourlyForecast from './HourlyForecast';
import AirConditions from './AirConditions';
import Sidebarr from '../../mainPage/Sidebar/Sidebarr';
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

<<<<<<< HEAD

  return (
    <div className='weather-page'>
      <Sidebar/>
      <WeatherPageMainContent/>
    </div>
  );
=======
        </div>
    );
>>>>>>> 07950edd71e34c87a6481692c29584756b24b24e
}

export default MainContent;
