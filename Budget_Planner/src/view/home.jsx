import React from 'react';
import Nav from '../component/nav'; // Corrected import statement
import Budget from '../component/budget';

const Home = () => {
  // Remove unused useState import and state

  // Define handleSelect function to pass to Nav component
  const handleSelect = (currency) => {
    // Implement your logic here if needed
    console.log("Selected currency:", currency);
  };

  return (
    <>
      <Nav onChange={handleSelect} /> {/* Pass handleSelect function as prop */}
      <Budget />
    </>
  );
};

export default Home;
