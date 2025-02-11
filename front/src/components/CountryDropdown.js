import React from 'react';
import '../App.css';

const currencyOptions = [
  { value: "USD", label: "미국", flag: "US" },
  { value: "EUR", label: "유럽", flag: "EU" },
  { value: "JPY", label: "일본", flag: "JP"},
  { value: "KRW", label: "한국", flag: "KR" },  
  

];

const CountryDropdown = ({ selectedCountry, onCountrySelect, style }) => {
    return (
      <select
        value={selectedCountry}
        onChange={(e) => onCountrySelect(e.target.value)}
        style={{
          border: "none",
          outline: "none",
          ...style,       
        }}
      >
        {currencyOptions.map((country) => (
          <option key={country.flag} value={country.flag}>
            {country.label} ({country.value})
          </option>
        ))}
      </select>
    );
  };

  export default CountryDropdown;