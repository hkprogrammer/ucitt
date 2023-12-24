// NavBar component

import React from "react";
import "./NavBar.css"

function NavBar() {
    return (
        <div class="topnav">
            <h1>UCI Table Tennis Club</h1>
            <div className="links">
                <a href="#home">Home</a>
                <a href="#home">Events</a>
                <a href="#home">Ratings</a>
            </div>
        </div>
    );
}

export default NavBar;