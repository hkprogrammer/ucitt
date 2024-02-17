import React from "react";
import "./SignIn.css";

function SignIn() {
    return (
        <div className='sign-in-container'>
            <h1 className="sign-in-welcome-text">Welcome to the UCITT Sign Up Page</h1>
            <h2 className="sign-in-description-text">Sign up with an email if you'd like to participate in competitive events!</h2>
            <div className='sign-in-form-container'>
                <form className='sign-in-form'>
                    <input type="text" name="username" placeholder="Username" className='sign-in-form-item-text'/>
                    <input type="password" name="password" placeholder="Password" className='sign-in-form-item-text'/>
                    <input type="submit" value="Submit" className='sign-in-form-item-button'/>
                </ form>
                <div className='sign-in-register-text'>
                    Need an account? SIGN UP (this will be a link)
                </div>
            </div>
        </div>
    );
}

export default SignIn;