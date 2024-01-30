import React, { useState } from 'react';
import Nav from '../component/nav';
import Budget from '../component/budget';

const Home = () => {
  const [currencySymbol, setCurrencySymbol] = useState("RS"); // State to hold currency symbol

  const handleSelect = (currency) => {
    // Update currencySymbol when the currency is changed
    setCurrencySymbol(currency);
    
  };

  return (
    <>
      <Nav onChange={handleSelect} />
      <Budget currencySymbol={currencySymbol} /> {/* Pass currencySymbol as prop */}
    </>
  );
};

export default Home;
