// NavBar component

import React from "react";
import "./NavBar.css";
import logo from "../Assets/logo.png";

function NavBar() {
    return (
        <div className="topnav">
            <a className="logo" href="#home">
                <img src={logo} alt="Table Tennis Petr Logo"/>
                <h1>UCI Table Tennis Club</h1>
            </a>
            <div className="links">
                <a href="#events">Events</a>
                <a href="#ratings">Ratings</a>
            </div>
        </div>
    );
}

export default NavBar;