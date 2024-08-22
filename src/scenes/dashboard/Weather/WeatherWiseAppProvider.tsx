import { createContext, useState, useCallback, ReactNode } from "react";
//createContext is a function used to create a new context that will hold the shared data that can be accessed by different components without having to pass  props down manually at every level
//ReactNode is a type that represents anything that can be rendered in React. represents any React Child. It's used to type the children prop to allow for any valid React content to be passed.



interface WeatherData {
  temperature: number;
  chanceOfRain: number;
  description: string;
  location: string;
  dailyForecast: Array<{ 
    datetime: string;
    conditions: string;
    temp: number;
  }>;
  timezoneOffset: number;
}

interface WeatherWiseAppContextInterface {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  themeColor: string;
  setThemeColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  weatherData: WeatherData
  fetchWeatherData: (city: string) => Promise<void>;
  setWeatherData: (weatherData: WeatherData) => void;
  feelsLike: number;
  setFeelsLike: (feelsLike: number) => void;
  uvIndex: number;
  setUvIndex: (uvIndex: number) => void;
  windSpeed: number;
  setWindSpeed: (windSpeed: number) => void;
  humidity: number;
  setHumidity: (humidity: number) => void;
  visibility: number;
  setVisibility: (visibility: number) => void;
  pressure: number;
  setPressure: (pressure: number) => void;
  chanceOfRain: number;
  setChanceOfRain: (chanceOfRain: number) => void;
  sunset: string;
  setSunset: (sunset: string) => void; 
}

interface WeatherWiseAppProviderProps {
  children: ReactNode;
}

//Creating a Context
export const WeatherWiseAppContext =
  createContext<WeatherWiseAppContextInterface | null>(null);
//Default value of AppContext  is set to null meaning there is no default value for context  initially until it is provided by the Provider

//CREATING PROVIDER COMPONENT
function WeatherWiseAppProvider({ children }: WeatherWiseAppProviderProps) {
  const api = {
    key: 'V4VPJQ545QWEHBWZM6X6CBHF3',
    base: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
  };

  
  
  const [selectedCity, setSelectedCity] = useState<string>("Your City");
  const [themeColor, setThemeColor] = useState<string>("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [textColor, setTextColor] = useState<string>("#000000");
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
    chanceOfRain: 0,
    description: "Sunny",
    location: "Your City",
    dailyForecast: [],
    timezoneOffset: 0, //rep difference in seconds from UTC
  });
  // Air Conditions States
  const [feelsLike, setFeelsLike] = useState<number>(0);
  const [uvIndex, setUvIndex] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [visibility, setVisibility] = useState<number>(0);
  const [pressure, setPressure] = useState<number>(0);
  const [chanceOfRain, setChanceOfRain] = useState<number>(0);
  const [sunset, setSunset] = useState<string>('20:58');

 //useCallback makes sure that fetchWeather data will ony chnage if its dependecnies change( in this case dependency array is empty), so that useEffect will not rerun unnecessarily
 const fetchWeatherData = useCallback(async (city: string) => {
  try {
    if (!city.trim()) {
      console.log("No city entered. Please enter a city name.");
      return; // Exit the function early
    }
    
    const response = await fetch(`${api.base}${encodeURIComponent(city)}?unitGroup=metric&key=${api.key}`);
    
    if (!response.ok) {
      if (response.status === 400) {
        console.log("Invalid city name provided.");
      } else if (response.status === 404) {
        console.log("City not found.");
      } else {
        console.log(`Response was not ok: ${response.status}`);
      }
      return; // Exit the function early
    }
    
    const data = await response.json();
    
    setWeatherData({
      temperature: data.currentConditions.temp,
      chanceOfRain: data.currentConditions.precipprob,
      description: data.currentConditions.conditions,
      location: data.resolvedAddress,
      dailyForecast: data.days.slice(0, 7),
      timezoneOffset: data.tzoffset || 0
    });
    // Update air conditions
    setFeelsLike(data.currentConditions.feelsLike || 0);
    setUvIndex(data.currentConditions.uvIndex || 0);
    setWindSpeed(data.currentConditions.windspeed || 0);
    setHumidity(data.currentConditions.humidity || 0);
    setVisibility(data.currentConditions.visibility || 0);
    setPressure(data.currentConditions.pressure || 0);
    setChanceOfRain(data.currentConditions.precipprob || 0);
    setSunset(data.currentConditions.sunset || 'N/A');
    console.log(data);
  } catch (error) {
    console.error("Error fetching weather data: ", error);
  }
}, [api.base, api.key]); // Dependency array
   



  return (
    <WeatherWiseAppContext.Provider
      value={{ //contains current values of states and their setter functions
        selectedCity,
        setSelectedCity,
        themeColor,
        setThemeColor,
        backgroundColor,
        setBackgroundColor,
        textColor,
        setTextColor,
        weatherData,
        setWeatherData,
        fetchWeatherData,
        feelsLike,
        uvIndex,
        windSpeed,
        humidity,
        visibility,
        pressure,
        chanceOfRain,
        sunset,
        setFeelsLike,
        setUvIndex,
        setWindSpeed,
        setHumidity,
        setVisibility,
        setPressure,
        setChanceOfRain,
        setSunset,
      }}
    >
      {children} {/*  Whatever is wrapped inside this App provider in JSX will have access to provider context */}
    </WeatherWiseAppContext.Provider>
  );
}

export default WeatherWiseAppProvider;

//When you create a component that will wrap other components, such as a Context Provider, the children prop represents whatever you place inside the opening and closing tags of that component when you use it.
