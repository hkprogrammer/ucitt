import React, {useEffect, useState} from 'react';
import "./SignIn.css";
import {Link} from "react-router-dom";

function SignIn() {
    const [result, setResults] = useState([]);

    const getUrl = 'http://127.0.0.1:5000/sign-in/getResults';
    const setUrl = 'http://127.0.0.1:5000/sign-in/setResults';
    const getData = ()=>{
        fetch(getUrl, {
            mode:"cors", 
            method:"GET",
            })
            .then((res) => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                setResults(data);
            })
            .catch((err)=>{
                console.error(err)
            });

        
    }

    const submitData = async()=>{
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        // probably need to hash password
        fetch(setUrl, {
            mode:"cors", 
            method:"POST",
            body: JSON.stringify({
                "username": username,
                "password": password,
            }),
            headers: {'Content-Type':'application/json'}
            })
            .then((res) => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                // setResults(data);
                getData();
            })
            .catch((err)=>{
                console.error(err)
            });
    }

    // maybe tweak this later so that you can just press enter to sign in
    /*
    var usernameInput = document.getElementById("username");
    usernameInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitData();
        }
    });
    var passwordInput = document.getElementById("username");
    passwordInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            submitData();
        }
    });*/
    useEffect(()=>{
        getData();
    },[]);

    return (
        <div className='sign-in-container'>
            <h2 className="sign-in-welcome-text">Sign In</h2>
            <div className='sign-in-form-container'>
                <div className='sign-in-form-width-container'>
                <form className='sign-in-form'>
                    <input type="text" name="username" placeholder="Username" className='sign-in-form-item-text' id='username'/>
                    <input type="password" name="password" placeholder="Password" className='sign-in-form-item-text' id='password'/>
                </ form>
                <button type="submit" value="Submit" className='sign-in-form-item-button' onClick={submitData}>
                    Submit
                </button>
                <div className='sign-in-register-text'>
                    Need an account?&nbsp;
                    <Link to="/sign-up">
                        Sign Up
                    </Link>
                </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;