import './App.css'
import WeatherPage from './Components/Weather/WeatherPage'
import WeatherWiseAppProvider from './Components/WeatherWiseAppProvider'
function App() {

  return (
    <WeatherWiseAppProvider>
      <WeatherPage/>
    </WeatherWiseAppProvider>
      

  )
}

export default App
