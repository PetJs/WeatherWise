import './App.css';
import WeatherPage from './scenes/dashboard/Weather/WeatherPage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import WeatherWiseAppProvider from './scenes/dashboard/Weather/WeatherWiseAppProvider';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CitiesPage from './scenes/dashboard/Weather/CitiesPage';
import Sidebarr from './scenes/mainPage/Sidebar/Sidebarr';
import MapPage from './scenes/dashboard/Weather/MapPage';


function App() {
  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <WeatherWiseAppProvider>
            <div style={{ display: 'flex' }}>
              <Sidebarr />
              <div style={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/weather" />} />
                  <Route path="/weather" element={<WeatherPage />} />
                  <Route path="/cities" element={<CitiesPage />} />
                  <Route path="/map" element={<MapPage />} />
                  {/* Add other routes here as needed */}
                </Routes>
              </div>
            </div>
          </WeatherWiseAppProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
