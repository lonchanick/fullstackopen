const CountryInfo = ({country, setShowCountry, weather}) => { 
  if(country)
  {

    if(country.length > 10){
      return (<p>Too many matches, specify another filter.</p>);
    }
    
    if(country.length === 1){ 
      return (
      <div>
        {/* {console.log(country)} */} 
        <h2>{country[0].name.official}</h2>
        <p>Capital: {country[0].capital}</p>
        <p>Area: {country[0].area}</p>
        <h2>Lang</h2>

        {
          Object.values(country[0].languages)
          .map(val => <p key={val}>{val}</p>)
        }

        <img
        src={country[0].flags.png}
        alt={`Flag of ${country[0].name.common}`}
        style={{ width: "200px" }}
        />
        <div>
          <h2>Weather in {country[0].capital}, {country[0].name.common}</h2> 
          Temperature: {weather.temperature}
          <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}></img>
          <p>Wind Speed{` ${weather.wind.speed} `} m/s</p>
        </div>
      </div>);
    } 
    
    return (country.map((c) => {
        return (
        <li key={c.name.common}>{c.name.common}{" "}
        <button onClick={()=> { 
          setShowCountry([c]);
        }}>Show</button></li>);
      }));

  }else{
    return(<p>No Country Info</p>);
  }
};

export default CountryInfo;
