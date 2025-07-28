//do it again!
import { useState, useEffect } from "react";

import "./index.css";
import Footer from "./components/Footer";
import axios from 'axios'

const App = () => {
  const [searchValue, setSerchValue] = useState("");
  const [currecy, setCurrency] = useState(null);
  const [currencyRateSet, setCurrencyRate] = useState([{}]);

  const serachValueHandler = (e) => setSerchValue(e.target.value);

  const onSubmitForm = (e) => {
    e.preventDefault();
    setCurrency(searchValue);
  };

  useEffect(() => {
    console.log('current value of SearchValue: ', searchValue);
    if(currecy)
    {
      axios.get(`https://open.er-api.com/v6/latest/${currecy}`)
      .then(response =>{
        setCurrencyRate(response.data.rates)
      });
    }

  }, [currecy]);

  return (
    <>
      <h1>Currency Exchange Rate</h1>
      <form onSubmit={onSubmitForm}>
        Currency: <input value={searchValue} onChange={serachValueHandler} />
        <button type="submit">Submit</button>
      </form>
      <pre>
        {JSON.stringify(currencyRateSet, null, 2)}
      </pre>
      <Footer />
    </>
  );
};

export default App;
