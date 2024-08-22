import { useState } from "react";
import axios from "axios";
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";

interface City {
  city: string;
  country: string;
}

function CitySearchBar() {
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

  const handleSearch = () => {
    if (city) {
      setSelectedCity(city);
      setSuggestions([]);
    }
  };

  return (
    <>
      <input
        type="text"
        value={city}
        placeholder="Search for cities...."
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </button>
      {suggestions.length > 0 && (
        <ul className="suggestions-dropdown">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                setCity(suggestion.city);
                setSelectedCity(suggestion.city);
                setSuggestions([]);
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