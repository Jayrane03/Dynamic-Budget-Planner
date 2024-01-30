import { useState } from "react";
import React from 'react';
import "../css/nav.css";
import "../css/responsive.css";
import { Navbar, Container, Dropdown } from 'react-bootstrap';

const Nav = ({ onChange }) => { 
  const [selectedCurrency, setSelectedCurrency] = useState("RS"); // Default currency symbol
  
  const handleSelect = (eventKey, event) => {
    // Check if eventKey or event are undefined/null before accessing properties
    if (eventKey && event) {
      // Access the value property from the event or eventKey
      const value = event.target.value || eventKey;
      // Proceed with your logic using the value
      setSelectedCurrency(value); // Update selected currency symbol
      // Call the onChange function passed from the parent component
      onChange(value);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">Budget Planner</Navbar.Brand>
      </Container>

      <Dropdown id="currency-dropdown" onSelect={handleSelect}>
        <Dropdown.Toggle className="fw-bold" id="dropdown-basic">
          {selectedCurrency}
        </Dropdown.Toggle>

        <Dropdown.Menu className='drop-menu'>
          <Dropdown.Item className="fw-bold" eventKey="RS">RS</Dropdown.Item>
          <Dropdown.Item className="fw-bold" eventKey="USD">USD</Dropdown.Item>
          <Dropdown.Item className="fw-bold" eventKey="EURO">EURO</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
};

export default Nav;
