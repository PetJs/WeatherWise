import React from 'react';
import CitySearchBar from './CitySearchBar';

function MainContent() {
  return (
    <div className="main-content">
      {/* Search bar */}
      <CitySearchBar />

      {/* Current Weather */}
      <section className="current-weather">
        <h2>Current Weather</h2>
        {/* Add your current weather content here */}
      </section>

      {/* Hourly Forecast */}
      <section className="hourly-forecast">
        <h2>Hourly Forecast</h2>
        {/* Add your hourly forecast content here */}
      </section>

      {/* Air Conditions */}
      <section className="air-conditions">
        <h2>Air Conditions</h2>
        {/* Add your air conditions content here */}
      </section>

      {/* Daily Forecast */}
      <section className="daily-forecast">
        <h2>Daily Forecast</h2>
        {/* Add your daily forecast content here */}
      </section>
    </div>
  );
}

export default MainContent;
