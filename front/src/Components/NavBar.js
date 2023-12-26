// NavBar component

import React from "react";
import "./NavBar.css";

function NavBar() {
    const logo = "apple-touch-icon.png";
    const dropdown = "images/dropdown.png";
    // Clicking the dropdown menu will either show or hide it depending on current state
    const toggleDropdown = () => {
        const dropdownMenu = document.querySelector('.nav-dropdown-menu');
        if (dropdownMenu.classList.contains('show')) {
            // If it's visible, hide it
            dropdownMenu.classList.remove('show');
        } 
        else {
            // If it's hidden, show it
            dropdownMenu.classList.add('show');
        }
    };

    // Resizing back to hiding the dropdown will automatically close the dropdown
    function handleResize() {
        const dropdownMenu = document.querySelector('.nav-dropdown-menu');
        if(dropdownMenu) {
            const isLargeScreen = window.innerWidth >= 701;
      
            if (isLargeScreen && dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        }
    };

    // Add the event listener and initial function call here:
    window.addEventListener('resize', handleResize);
    handleResize();

    return (
        <div className="nav">
            <div className="nav-topnav">
                <a className="logo" href="#home">
                    <img src={logo} alt="Table Tennis Petr Logo"/>
                    <h1>UCI Table Tennis Club</h1>
                </a>

                {/* Default Navbar for desktop view */}
                <nav className="nav-desktop nav-links">
                    <a href="#events">Events</a>
                    <a href="#ratings">Ratings</a>
                </nav>


                {/* Hidden Dropdown that will appear only in mobile view */}
                <button className="nav-toggle-dropdown" onClick={toggleDropdown}>
                    <img src={dropdown} alt="Dropdown three lines icon"/>
                </button>
            </div>
            <div className="nav-dropdown-menu nav-links">
                <a href="#events">Events</a>
                <a href="#ratings">Ratings</a>
            </div>
        </div>
    );
}

export default NavBar;