import { createContext, useState, ReactNode } from "react";
//createContext is a function used to create a new context that will hold the shared data that can be accessed by different components without having to pass  props down manually at every level
//ReactNode is a type that represents anything that can be rendered in React. represents any React Child. It's used to type the children prop to allow for any valid React content to be passed.


interface WeatherWiseAppContextInterface {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  themeColor: string;
  setThemeColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
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
  const [selectedCity, setSelectedCity] = useState<string>("Your City");
  const [themeColor, setThemeColor] = useState<string>("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [textColor, setTextColor] = useState<string>("#000000");

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
      }}
    >
      {children} {/*  Whatever is wrapped inside this App provider in JSX will have access to provider context */}
    </WeatherWiseAppContext.Provider>
  );
}

export default WeatherWiseAppProvider;

//When you create a component that will wrap other components, such as a Context Provider, the children prop represents whatever you place inside the opening and closing tags of that component when you use it.
