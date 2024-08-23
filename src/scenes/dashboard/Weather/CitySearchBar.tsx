import React, { useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import InputBase from '@mui/material/InputBase';
import axios from "axios"; 
import useWeatherWiseAppContext from "./useWeatherWiseAppContext";

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

function CitySearchBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [city, setCity] = useState<string>(""); 
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); 
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { setSelectedCity, fetchWeatherData } = useWeatherWiseAppContext();

  const fetchCitySuggesstions = async (query: string) => {
    try {
      const response = await axios.get(
        'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        {
          params: {
            namePrefix: query, 
            limit: 10, 
          },
          headers: {
            "X-RapidAPI-Key":
              "4a8ff5a60emsh2c0d0af51b596a0p1f97d6jsn76b2ee34db95",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const cities = response.data.data.map((city: City) => ({
        city: city.city, 
        country: city.country, 
      }));
      setSuggestions(cities);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value; 
    setCity(value); 

    if (value) {
      await fetchCitySuggesstions(value); 
    } else {
      setSuggestions([]); 
    }
    setSelectedIndex(-1);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1) 
      );
    } else if (event.key === "Enter" && city) {
      setSelectedCity(city);
      await fetchWeatherData(city);
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    if (city) { 
      setSelectedCity(city);
      await fetchWeatherData(city);
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    const fullLocation = `${suggestion.city}, ${suggestion.country}`;
    setCity(fullLocation);
    setSelectedCity(fullLocation);
    setSuggestions([]);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2} position="relative">
      <Box
        display="flex"
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "3px",
        }}
      >
        <InputBase
          placeholder="Search for cities..."
          value={city}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          sx={{
            width: 300,
            backgroundColor: colors.primary[400],
            borderRadius: 1,
            padding: 1,
          }}
          startAdornment={<i className="fas fa-search"></i>}
        />
        <IconButton onClick={handleSearch}>
          <i className="fas fa-search"></i>
        </IconButton>
      </Box>
      {suggestions.length > 0 && (
        <Box
          className="suggestions-dropdown"
          sx={{
            position: "absolute",
            top: "60px", 
            width: "300px", 
            backgroundColor: "rgba(255, 255, 255, 0.8)", 
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "3px",
            zIndex: 1,
            padding: "8px 0",
            maxHeight: "200px", 
            overflowY: "auto", 
          }}
        >
          {suggestions.map((suggestion, index) => (
            <Box
              key={index}
              className={index === selectedIndex ? "selected" : ""}
              sx={{
                padding: "8px 16px",
                cursor: "pointer",
                backgroundColor:
                  index === selectedIndex ? colors.primary[500] : "transparent",
                "&:hover": {
                  backgroundColor: colors.primary[600],
                },
              }}
              onClick={() => handleSuggestionSelect(suggestion)}
            >
              {suggestion.city}, {suggestion.country}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default CitySearchBar;
