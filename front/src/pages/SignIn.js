import React, {useState} from "react";
import "./SignIn.css";
import config from "../config"



function SignIn() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async ()=>{

        const url = config.env.BACK_URL;
        fetch(url,{
            mode:"cors",
            method: "get"

        }).then((raw)=>{
            console.log(raw)
            return raw.json();
        }).then((data)=>{
            console.log("data");

        }).catch((err)=>{
            console.error({err})

        })
    }

    const updateUsername = async(event)=>{
        setUsername(event.target.value);
    }
    const updatePassword = async(event)=>{
        setPassword(event.target.value);
    }



    return (
        <div className='sign-in-container'>
            <h1 className="sign-in-welcome-text">Welcome to the UCITT Sign Up Page</h1>
            <h2 className="sign-in-description-text">Sign up with an email if you'd like to participate in competitive events!</h2>
            <div className='sign-in-form-container'>
                <form className='sign-in-form' onSubmit={login}>
                    <input type="text" name="username" placeholder="Username" onChange={updateUsername} className='sign-in-form-item-text'/>
                    <input type="password" name="password" placeholder="Password" onChange={updatePassword} className='sign-in-form-item-text'/>
                    <input type="button" value="Submit" onClick={login} className='sign-in-form-item-button'/>
                </ form>
                <div className='sign-in-register-text'>
                    Need an account? SIGN UP (this will be a link)
                </div>
            </div>
        </div>
    );
}

export default SignIn;