import './App.css'
import WeatherPage from './scenes/dashboard/Weather/WeatherPageMainContent'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './scenes/mainPage/Sidebar/Sidebar';
//import citiesPage
//import Map page
import MapPage from './scenes/MapPage'
//import settings Page
//import Account Page

import WeatherWiseAppProvider from './scenes/dashboard/Weather/WeatherWiseAppProvider'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material';







function App() {
  const  [theme, colorMode] = useMode()

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="app">
            <Sidebar />
            <main className="content">
              <WeatherWiseAppProvider>
                <Routes>
                  <Route path="/weather" element={<WeatherPage />} />
                  <Route path="/map" element={<MapPage />} />
                  {/* <Route path="/cities" element={<CitiesPage />} />
                  
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/account" element={<AccountPage />} /> */}
                </Routes>
              </WeatherWiseAppProvider>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
      
  )
}

export default App
