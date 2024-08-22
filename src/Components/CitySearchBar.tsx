<<<<<<< HEAD
import { useState } from "react";
import axios from "axios";
=======
//CITY BAR COMPONENT TO HANDLE SEARCHING FOR CITIES

import React, { useState } from "react";
import axios from "axios"; //import axios to make API calls
//Axios is better than fetch coz it automatically converts the response to JSON.
//Fetch only rejects the promise on network errors but axios handle other HTTP status codes like 404 or 500
>>>>>>> 24385ef753a7095b0fe5762389ce091ee08b0f93
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";

interface City {
  city: string;
  country: string;
}

function CitySearchBar() {
<<<<<<< HEAD
  const [city, setCity] = useState<string>("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const { setSelectedCity } = useWeatherWiseAppContext();

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCity(value);

    if (value) {
      await fetchCitySuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchCitySuggestions = async (query: string) => {
=======
  const [city, setCity] = useState<string>(""); //the useState Returns string array
  //I am using use state to declare a state variable 'city' and a function to update it 'setCity'
  //It is initialised to empty string coz when the component first renders city is empty string until user types in something
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); //State for filtered suggesstions
  const [selectedIndex, setSelectedIndex] =useState(-1)
  const {setSelectedCity, fetchWeatherData} = useWeatherWiseAppContext(); //Use the custom hook to get the context

  
  //FUNCTION TO FETCH CITY SUGGESTIONS BASED ON USER INPUT
  const fetchCitySuggesstions = async (query: string) => {
>>>>>>> 24385ef753a7095b0fe5762389ce091ee08b0f93
    try {
      const response = await axios.get(
        'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        {
          params: {
            namePrefix: query,
            limit: 10,
          },
          headers: {
            "X-RapidAPI-Key": "4a8ff5a60emsh2c0d0af51b596a0p1f97d6jsn76b2ee34db95",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );

      // Debugging: Log the response data to check its structure
      console.log(response.data);

      const cities = response.data.data.map((city: any) => ({
        city: city.name, // Ensure these fields match the API response
        country: city.country,
      }));

      if (cities.length === 0) {
        console.log("Can't find the city you are looking for");
      }

      setSuggestions(cities);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

<<<<<<< HEAD
  const handleSearch = () => {
    if (city) {
      setSelectedCity(city);
=======
  //Function called whenever the user types something to the input field
  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value; //Value typed in the input field
    setCity(value); //Sets city to current value of the input field

    if (value) {
      await fetchCitySuggesstions(value); //Pauses the function until fetchCitySuggestions completes
    } else {
      setSuggestions([]); //If input is empty, set Suggestions to an empty array
    }
    setSelectedIndex(-1)
  };; //reset selected index when typing meaning no suggestion is selected by default

  //HANDLE KEY DOWN
  const handleKeyDown = async (event :  React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "ArrowDown"){
      setSelectedIndex((prevIndex) => 
        Math.min(prevIndex+1, suggestions.length - 1) //to prevent index going out of bounds
      );
    }
    else if(event.key === "Enter"  && selectedIndex >= 0){
      const selectedSuggestion = suggestions[selectedIndex];
      handleSuggestionSelect(selectedSuggestion);
    }
    else if(event.key === "Enter" && city){
      setSelectedCity(city);
      await fetchWeatherData(city);
>>>>>>> 24385ef753a7095b0fe5762389ce091ee08b0f93
      setSuggestions([]);
    }
  };

  //HANDLE SEARCH
  const handleSearch =async () => {
    if(city){ //If there's a city name in the input when search button is clicked
      setSelectedCity(city);
      await fetchWeatherData(city)
      setSuggestions([]);
    }
  }

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    const fullLocation = `${suggestion.city}, ${suggestion.country}`;
    setCity(fullLocation);
    setSelectedCity(fullLocation);
    setSuggestions([])
  }

  return (
    <>
      <input
        type="text"
        value={city}
        placeholder="Search for cities...."
<<<<<<< HEAD
        onChange={handleInputChange}
=======
        onChange={handleInputChange} //When input value changes trigger the handleInputChange function
        onKeyDown={handleKeyDown}
>>>>>>> 24385ef753a7095b0fe5762389ce091ee08b0f93
      />
      <button onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </button>
      {suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
<<<<<<< HEAD
              onClick={() => {
                setCity(suggestion.city);
                setSelectedCity(suggestion.city);
                setSuggestions([]);
              }}
=======
              className={index === selectedIndex ? "selected" : ""}
              onClick = {() => handleSuggestionSelect(suggestion)
              }
>>>>>>> 24385ef753a7095b0fe5762389ce091ee08b0f93
            >
              {suggestion.city}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default CitySearchBar;