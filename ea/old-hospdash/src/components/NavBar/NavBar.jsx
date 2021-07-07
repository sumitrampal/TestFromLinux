import React from "react";
// import { Navbar, Nav, Form, Button } from "react-bootstrap";
import './NavBar.css';
import { useHistory } from "react-router-dom";
import Navbell from "./Navbell";

/*
Name : Navbar.Component.jsx
* Parameters (props): none
* Parent Component:  common header in every page
* Description :
      This is a header, having navbar which consists of logo and login button

* Returns : nothing
*/



const NavBar = () => {

  const history = useHistory("");

  const logout = () => {
    history.push("/");
    localStorage.clear();
  }
  React.useEffect(()=> {
    if(!localStorage.getItem('hospitaldashtoken')){
      document.getElementById('sign-out-btn').style.display="none"
      document.getElementById('nav-bell').style.display="none"
    }
  })

  return (
    <div className="nav_bar">
      <div className="nav_image"
      >
        <a href="https://easyaspataal.com"><img
          alt=""
          src={require("../../Assets/logo.png")}
          alt="logo"
          className="asptaal_logo" /></a>


        <button
          onClick={logout} id="sign-out-btn" className="signout">Sign Out</button>

        <div className="nav_bell" id="nav-bell">
          <Navbell  />
        </div>
      </div>
    </div>
  );
};

{/* <Navbar>
<Navbar.Brand>
  <img
    alt=""
    src={require("../Assets/logo.png")} alt="logo"
    className="asptaal_logo"
    width="200px"
    height="60px"
  />
</Navbar.Brand>
<Nav className="mr-auto">
</Nav>
<Form inline>
  <Button className='signout'>Sign Out</Button>
</Form>
</Navbar> */}


export default NavBar;

