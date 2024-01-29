import { useState } from "react"
import React from 'react'
import "../css/nav.css"
import "../css/responsive.css"
import {Navbar,Container ,Dropdown }from 'react-bootstrap'

const Nav = () => { 
  const [selectedCurrency, setSelectedCurrency] = useState('Rs');
  const [amount , setAmount] = useState('');
  
const handleSelect = (currency) => {
  setSelectedCurrency(currency);
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
      
        <Dropdown.Item className="fw-bold" eventKey="Rs">Rs</Dropdown.Item>
        <Dropdown.Item className="fw-bold" eventKey="USD">USD</Dropdown.Item>
        <Dropdown.Item className="fw-bold" eventKey="EURO">EURO</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Navbar>
  )
}

export default Nav