import Sidebar from '../../mainPage/Sidebar/Sidebar'
import WeatherPageMainContent from './WeatherPageMainContent'
//import DailyForecast from './7DayForecast'

function WeatherPage() {


  return (
    <div className='weather-page'>
      <Sidebar/>
      <WeatherPageMainContent/>
    </div>
  );
}

export default WeatherPage;
