import useWeatherWiseAppContext from "./useWeatherWiseAppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faSun, faTint, faWind, faEye, faTachometerAlt, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';
import {  useTheme } from '@mui/material';
import { tokens, } from '../../../theme';
import './ac.css';

type ConditionLabel = 'Feels Like' | 'UV Index' | 'Wind Speed' | 'Humidity' | 'Visibility' | 'Pressure' | 'Chance of Rain' | 'Sunset';

const conditionIcons: { [key in ConditionLabel]: any } = {
    'Feels Like': faTemperatureHigh,
    'UV Index': faSun,
    'Wind Speed': faWind,
    'Humidity': faTint,
    'Visibility': faEye,
    'Pressure': faTachometerAlt,
    'Chance of Rain': faCloudShowersHeavy,
    'Sunset': faSun,
};

function AirConditions() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const context = useWeatherWiseAppContext();
    if (!context) {
        return <div>Loading.....</div>;
    }

    const {
        selectedCity,
        feelsLike,
        uvIndex,
        windSpeed,
        humidity,
        visibility,
        pressure,
        chanceOfRain,
        sunset,
    } = context;

    return (
        <div className={`air-conditions ${theme}`}>
            <h2>Air Conditions</h2>
            <div className="air-conditions-info">
                {selectedCity && selectedCity !== "Your City" ? (
                    Object.entries({
                        'Feels Like': feelsLike,
                        'UV Index': uvIndex,
                        'Wind Speed': windSpeed,
                        'Humidity': humidity,
                        'Visibility': visibility,
                        'Pressure': pressure,
                        'Chance of Rain': chanceOfRain,
                        'Sunset': sunset
                    }).map(([label, value]) => (
                        <div key={label} className="air-condition-item">
                            <FontAwesomeIcon icon={conditionIcons[label as ConditionLabel]} className="icon" />
                            <div className="condition-details">
                                <p className="condition-label">{label}</p>
                                <p className="condition-value">{value}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No data available, please enter a city.</p>
                )}
            </div>
        </div>
    );
}

export default AirConditions;
