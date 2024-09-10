import CountryInfo from "./CountryInfo"
import CountryList from "./CountryList"
import { useEffect, useState } from "react"
import countriesData from "./assets/countries.json"
import axios from "axios"

const Appp = () => {
  const [countries, setContries] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [selectedCountry, setSeletedCountry] = useState(null)
  const [city, setCity] = useState(null)
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setContries(response.data)

        console.log(response.data)
      })
  }, [])

  useEffect(() => {
    city &&
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
        )
        .then((response) => {
          setWeather(response.data)

          weather &&
            console.log("temperature", (weather.main.temp - 273).toFixed(2))

          weather && console.log("wind", weather.wind.speed)
        })
  }, [inputValue, city, selectedCountry])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setSeletedCountry(null)
  }

  const filteredCountries = countries?.filter((country) =>
    country.name.common.toLowerCase().includes(inputValue?.toLowerCase())
  )
  if (filteredCountries.length === 1 && !selectedCountry) {
    setSeletedCountry(filteredCountries[0])
    setCity(filteredCountries[0].capital)
  }

  const countryClick = (myCountry) => {
    setSeletedCountry(myCountry)
    setCity(myCountry.capital)
  }

  return (
    <div>
      <strong>find Countries</strong>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <br />
      {inputValue && !selectedCountry && (
        <CountryList
          filteredCountry={filteredCountries}
          onSelectCountry={countryClick}
        />
      )}
      {weather && (
        <CountryInfo selectedCountry={selectedCountry} weather={weather} />
      )}
    </div>
  )
}

export default Appp
