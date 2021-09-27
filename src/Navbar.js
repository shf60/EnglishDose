import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import {  NavLink } from 'react-router-dom';
import logo from './image/IMG_7883.PNG';

export default function NavbarSite(){
    // const [collapseON,setCollapseON]=useState("");

    return(
        <Navbar collapseOnSelect
        // onToggle={()=>setTimeout(()=>setCollapseON(pre=>pre ? "" : "dark"),200) }
         scrolling="true" dark="true" expand="md" variant ="light" bg="light">
             <Navbar.Brand href="/" >
             <img
        src={logo}
        width="50"
        height="30"
        className="d-inline-block align-top"
        alt="English Dose logo"
        /></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
  <Nav className="mr-auto">
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/courses">Courses</NavLink>
      <NavLink to="/Availability">Availibility</NavLink>
      <NavLink to="/Availability2">Availibility2</NavLink>
      <NavLink to="/PlacementTest">Placement Test</NavLink>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
}