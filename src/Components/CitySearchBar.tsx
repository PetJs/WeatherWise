//CITY BAR COMPONENT TO HANDLE SEARCHING FOR CITIES

import { useState } from "react";
import axios from "axios"; //import axios to make API calls
//Axios is better than fetch coz it automatically converts the response to JSON.
//Fetch only rejects the promise on network errors but axios handle other HTTP status codes like 404 or 500
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";

//Since city in the mapping function is having issues since it is of type any we have to create an interface called City and make it of type City
interface City {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  regionWdId: string;
  type: string;
  wikiDataId: string;
}

interface Suggestion {
  city: string;
  country: string;
}



//Pasiing setSelectedCity as a prop to update selected city in Weather Page Main Content(parent component). With this the parent component can fetch and display weather data or the selected city

function CitySearchBar() {
  const [city, setCity] = useState<string>(""); //the useState Returns string array
  //I am using use state to declare a state variable 'city' and a function to update it 'setCity'
  //It is initialised to empty string coz when the component first renders city is empty string until user types in something
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); //State for filtered suggesstions
  const {setSelectedCity} = useWeatherWiseAppContext(); //Use the custom hook to get the context

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
  };

  //FUNCTION TO FETCH CITY SUGGESTIONS BASED ON USER INPUT
  const fetchCitySuggesstions = async (query: string) => {
    try {
      const response = await axios.get(
        'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        {
          params: {
            namePrefix: query, //Query parameter for city suggestions
            limit: 10, //Limit no of suggestions to return
          },
          headers: {
            "X-RapidAPI-Key":
              "4a8ff5a60emsh2c0d0af51b596a0p1f97d6jsn76b2ee34db95",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const cities = response.data.data.map((city: City) => ({
        city: city.city, // Extract city name
        country: city.country, // Extract country name
      }));
      setSuggestions(cities);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleSearch = () => {
    if(city){ //If there's a city name in the input when search button is clicked
      setSelectedCity(city)
      setSuggestions([]);
    }
  }

  return (
    <>
      <input
        type="text"
        value={city} //tying or binding value of input field to city state
        placeholder="Search for cities...."
        onChange={handleInputChange} //When input value changes trigger the handleInputChange function
      />
      <button onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </button>
      {suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => { //Triggered when a list item is clicked
                setCity(suggestion.city); 
                //setSelectedCity(suggestion.city); //Updates selectedcity to the city that was clicked
                setSuggestions([]); //Clears suggestions list
              }}
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