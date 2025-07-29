import {useState, useEffect} from 'react'
import Footer from './components/Footer'
import axios from 'axios'
import CountryInfo from './components/CountryInfo';

 

const App = () => {
  const [countryField, setCountryField] = useState("");
  const [countries, setCountries] = useState([]);


  const onChCountryField = (e)=> setCountryField(e.target.value);

  const filteredCountry = countryField ? countries
  .filter(c => c.name.common.toLowerCase().startsWith(countryField.toLowerCase()))
  : [];

  // console.log("filtered ctr: ",filteredCountry)

  useEffect(()=>{
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setCountries(response.data); 
    })
  }, [])

  if(countries.length === 0) return (<p>Loading Countries!</p>);

  return (
    <>
      <h1>Country Filterer!</h1>
      <form>
        Country: <input value={countryField} onChange={onChCountryField} /> 
      </form>
      <div>
        <CountryInfo country = {filteredCountry} />
      </div> 
      <Footer />
    </>
  );
};

export default App;
