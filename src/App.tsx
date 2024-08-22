import './App.css'
import WeatherPage from './scenes/dashboard/Weather/WeatherPage'
import WeatherWiseAppProvider from './Components/WeatherWiseAppProvider'
function App() {

  return (
    <WeatherWiseAppProvider>
      <WeatherPage/>
    </WeatherWiseAppProvider>
      
  )
}

export default App
