const CountryInfo = ({country}) => {
  if(country)
  {
    if(country.length > 10)
      return (<p>Too many matches, specify another filter.</p>);
    else if(country.length === 1)
    {
      return (
      <div>
        {/* {console.log(country)} */} 
        <h2>{country[0].name.common}</h2>
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
      </div>);
    }
    else
      return (country.map(c => <li key={c.name.common}>{c.name.common}</li>));
  }
  else
  {
    return(<p>no Country content</p>);
  }
};

export default CountryInfo;
