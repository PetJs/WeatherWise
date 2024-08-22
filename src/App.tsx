import './App.css'
import WeatherPage from './scenes/dashboard/Weather/WeatherPage'
import WeatherWiseAppProvider from './Components/WeatherWiseAppProvider'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material';





function App() {
  const  [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WeatherWiseAppProvider>
          <WeatherPage/>
        </WeatherWiseAppProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
      
  )
}

export default App
