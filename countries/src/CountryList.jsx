const CountryList = ({ filteredCountry, onSelectCountry }) => {
  return (
    <div>
      {filteredCountry.length > 10 ? (
        <p>too many matches, please narrow your filter </p>
      ) : (
        filteredCountry.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => onSelectCountry(country)}>view</button>
          </div>
        ))
      )}
    </div>
  )
}

export default CountryList
