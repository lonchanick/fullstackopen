import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [countryField, setCountryField] = useState(""); //para actualizar el campo country y filtrar
  const [countries, setCountries] = useState([]); //para recuperar todas las countries una sola ves
  const [showCountry, setShowCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const onChCountryField = (e) => {
    setCountryField(e.target.value);
    setShowCountry(null);
  };

  const filteredCountry = countryField
    ? countries.filter((c) =>
        c.name.common.toLowerCase().startsWith(countryField.toLowerCase())
      )
    : [];


  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });

    // weather exercise
    const API_KEY = "32fc5765dacfc1f18038cd9a5a7ff1b9";
    const city = "Curico";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        const the_bare_necessities = {
          temperature: data.main.temp,
          icon: data.weather[0].icon,
          wind: data.wind
        };
        setWeather(the_bare_necessities);
      })
      .catch((error) => console.error("Error fetching weather:", error)); 
  }, []);

  if (countries.length === 0) return <p>Loading Countries!</p>;

  return (
    <>
      <h1>Country Filterer!</h1>
      <form>
        Country: <input value={countryField} onChange={onChCountryField} />
      </form>
      <div>
        <CountryInfo
          country={showCountry || filteredCountry}
          setShowCountry={setShowCountry}
          weather={weather}
        />
      </div>
      <Footer />
    </>
  );
};

export default App;
