const CountryInfo = ({ selectedCountry, weather }) => {
  if (!selectedCountry) return null
  return (
    <div>
      <h2>{selectedCountry.name.common}</h2>
      <strong>
        <div>capital: {selectedCountry.capital}</div>
        <div>
          area: {parseInt(selectedCountry.area).toLocaleString()} km<sup>2</sup>
        </div>
        <div>
          population: {parseInt(selectedCountry.population).toLocaleString()}
        </div>
        <div>
          <h4> language(s)</h4>

          <ul>
            {Object.values(selectedCountry.languages).map((val, index) => (
              <li key={index}>{val}</li>
            ))}
          </ul>
        </div>

        <p>
          <img src={selectedCountry.flags.png} width="150" />
        </p>
      </strong>
      <h2>Weather in {selectedCountry.capital}</h2>
      <h4>Temperature: {(weather.main.temp - 273).toFixed(2)} celcius</h4>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <h4>wind: {weather.wind.speed} m/s</h4>
    </div>
  )
}

export default CountryInfo
