//import '/src/App.css';
//import React from 'react';
//import ReactDOM from 'react-dom';
//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CitySearchBar from './CitySearchBar';
import CurrentWeather from './CurrentWeather'; 
import HourlyForecast from './HourlyForecast';
import AirConditions from './AirConditions';
//import Sidebarr from '../../mainPage/Sidebar/Sidebarr';
import DailyForecast from './DailyForecast';

function MainContent() {
    return (
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
  //

export default MainContent;
