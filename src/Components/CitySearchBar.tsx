//CITY BAR COMPONENT TO HANDLE SEARCHING FOR CITIES

import { useState } from "react";
import axios from "axios";  //import axios to make API calls
//Axios is better than fetch coz it automatically converts the response to JSON.
//Fetch only rejects the promise on network errors but axios handle other HTTP status codes like 404 or 500


function CitySearchBar() {
  const [city, setCity] = useState<string>(""); //the useState Returns string array
  //I am using use state to declare a state variable 'city' and a function to update it 'setCity'
//It is initialised to empty string coz when the component first renders city is empty string until user types in something
  const [suggesstions, setSuggestions] = useState<string[]>([]); //State for filtered suggesstions


//Function called whenever the user types something to the input field
  const handleInputChange = async ( 
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value; //Value typed in the input field
      setCity(value); //Sets city to current value of the input field

      if(value){
        await fetchCitySuggesstions(value);  //Pauses the function until fetchCitySuggestions completes
      }
      else{
        setSuggestions([]); //If input is empty, set Suggestions to an empty array
      }
    };

  //FUNCTION TO FETCH CITY SUGGESTIONS BASED ON USER INPUT
    const fetchCitySuggesstions = async(query: string) =>{
      try{
        const response  = await axios.get()
      }
    }

  const handleSearch = (event: React.MouseEventHandler<HTMLButtonElement>) =>{

  }

  return (
    <>
      <input
        type="text"
        value={city} //tying/binding value of input field to city state
        placeholder="Search for cities...."
        onChange={handleInputChange} //When input value changes trigger the handleInputChange function
      />
      <button onClick={handleSearch} ><i className="fas fa-search"></i></button>
    </>
  );
}

export default CitySearchBar;
