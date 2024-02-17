import React, {useEffect, useState} from 'react';
import "./SignIn.css";
import {Link} from "react-router-dom";
import config from "../config";

function SignIn() {
    const [result, setResults] = useState([]);

    const getUrl = config.env.BACK_URL + "/sign-in/getResults";
    const setUrl = config.env.BACK_URL + "/sign-in/setResults";
    const url = config.env.BACK_URL;
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
        fetch(url, {
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
                // getData();
            })
            .catch((err)=>{
                console.error(err)
            });
    }

    const submit = ()=>{
        alert(123);
    }


    useEffect(()=>{
        document.getElementById("sign-in-form").addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
              // code for enter
                submitData()
            }
        });
    })
    

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


    //why is this code here?
    // useEffect(()=>{
    //     getData();
    // },[]);

    return (
        <div className='sign-in-container'>
            <h2 className="sign-in-welcome-text">Sign In</h2>
            <div className='sign-in-form-container'>
                <div className='sign-in-form-width-container'>
                <form className='sign-in-form' id='sign-in-form'>
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