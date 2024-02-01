// NavBar component

import React from "react";
import "./NavBar.css";

import {Link} from "react-router-dom"

function NavBar() {
    const logo = "apple-touch-icon.png";
    const dropdown = "images/dropdown.png";
    // Clicking the dropdown menu will either show or hide it depending on current state
    const toggleDropdown = () => {
        const dropdownMenu = document.querySelector('.nav-dropdown-menu');
        const loginForm = document.querySelector('.nav-form-popup');
        if (dropdownMenu.classList.contains('show')) {
            // If it's visible, hide it
            dropdownMenu.classList.remove('show');
        } 
        else {
            // If it's hidden, show it
            dropdownMenu.classList.add('show');
            // If the login button is showing then close it to show the dropdown
            if (loginForm.classList.contains('show')) {
                loginForm.classList.remove('show');
            } 
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
        const loginForm = document.querySelector('.nav-form-popup');
        const dropdownMenu = document.querySelector('.nav-dropdown-menu');
        if (loginForm.classList.contains('show')) {
            // If it's visible, hide it
            loginForm.classList.remove('show');
        } 
        else {
            // If it's hidden, show it
            loginForm.classList.add('show');
            // If the dropdown is showing then close it to show the login form
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            } 
        }
    }


    // Add the event listener and initial function call here:
    window.addEventListener('resize', handleResize);
    handleResize();

    return (
        <div className="nav">
            <div className="nav-topnav">
                <Link to="/" className="logo">
                    <img src={logo} alt="Table Tennis Petr Logo"/>
                    <h1>UCI Table Tennis Club</h1>
                </Link>

                {/* Default Navbar for desktop view */}
                <nav className="nav-desktop nav-links">
                    {/* /* <a href="#events">Events</a> */}
                    
                    <Link to="/events">Events</Link>
                    <Link to="/ratings">Ratings</Link>
                    {/*<a href="#ratings">Ratings</a>*/}
                    {/* <a href="#signin">Sign In</a> */}
                    <Link to="/signin">Sign In</Link>
                    {/* <button className="nav-login-button" onClick={openCloseForm}>Login</button> */}
                </nav>

                {/* Hidden mobile buttons that will appear only in mobile view */}
                <div className="nav-mobile-buttons">
                    {/* <button className="nav-login-button" onClick={openCloseForm}>Login</button> */}
                    <button className="nav-toggle-dropdown" onClick={toggleDropdown}>
                        <img src={dropdown} alt="Dropdown three lines icon"/>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown menu that will come down upon clicking the dropdown button*/}
            <div className="nav-dropdown-menu nav-links">
                {/* <a href="#events">Events</a> */}
                <Link to="/events">Events</Link>
                <a href="#ratings">Ratings</a>
                <Link to="/signin">Sign In</Link>
                {/* <a href="#signin">Sign In</a> */}
            </div>

            {/* Login pop-up in center of screen that is hidden until the login button is clicked*/}
            <div className="nav-form-background">
                <div className="nav-form-popup">
                    <form className="nav-form">
                        <h1>Login</h1>
                        <input className="nav-form-input" type="text" placeholder="Enter Email" name="email" required />
                        <input className="nav-form-input" type="text" placeholder="Enter Password" name="password" required />
                        <button className="nav-form-button nav-form-button-login" type="login">Login</button>
                        <button className="nav-form-button nav-form-button-close" type="close" onClick={openCloseForm}>Close</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NavBar;