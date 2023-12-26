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

    // Clicking the Sign-In button and the close button in the form will open it or close it
    function openCloseForm() {
        const signInForm = document.querySelector('.nav-form-popup');
        if (signInForm.classList.contains('show')) {
            // If it's visible, hide it
            signInForm.classList.remove('show');
        } 
        else {
            // If it's hidden, show it
            signInForm.classList.add('show');
        }
    }


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
                    <button className="nav-signin-button" onClick={openCloseForm}>Sign In</button>
                </nav>

                {/* Hidden Dropdown that will appear only in mobile view */}
                <div className="nav-mobile-buttons">
                    <button className="nav-signin-button" onClick={openCloseForm}>Sign In</button>
                    <button className="nav-toggle-dropdown" onClick={toggleDropdown}>
                        <img src={dropdown} alt="Dropdown three lines icon"/>
                    </button>
                </div>
            </div>

            {/* Dropdown that will come down upon clicking */}
            <div className="nav-dropdown-menu nav-links">
                <a href="#events">Events</a>
                <a href="#ratings">Ratings</a>
            </div>

            {/* Sign In Pop-up in center of screen */}
            <div className="nav-form-background">
                <div className="nav-form-popup">
                    <form className="nav-form">
                        <h1>Login</h1>
                        <label className="nav-form-label" for="email">Email</label>
                        <input className="nav-form-input" type="text" placeholder="Enter Email" name="email"></input>
                        <label className="nav-form-label" for="password">Password</label>
                        <input className="nav-form-input" type="text" placeholder="Enter Password" name="password"></input>
                        <button className="nav-form-button" type="submit">Login</button>
                        <button className="nav-form-button" type="button" onClick={openCloseForm}>Close</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NavBar;