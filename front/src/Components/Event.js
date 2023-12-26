import React, {useState} from 'react';
import './Event.css';

function Event(props) {
    /*
    *   All props are strings
    *
    *   props.name          EX: "Regionals"
    *   props.time          EX: "10:00 AM"
    *   props.date          EX: "12/25/2023"
    *   props.capacity      EX: "5/16"
    *   props.location      EX: "Santa Monica College"
    * 
    *   props.registrationCloseDate EX: "12/25/2023 10:00 PST";
    *       ^ MUST BE IN "MM/DD/YYYY HH:MM PST" form
    */
    const closeDate = new Date(props.registrationCloseDate);
    let now  = new Date();
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(now < closeDate);
    const UpdateTime=()=>{
        now =  new Date();
        setIsRegistrationOpen(now < closeDate);
        console.log(isRegistrationOpen);
        console.log(now);
        console.log(closeDate);
    }
    setInterval(UpdateTime, 1000);
    return (
        <div className='event-container'>
            <div>{props.name}</div>
            <div>{props.time}, {props.date}</div>
            <div>{props.capacity}</div>
            <div>{props.location}</div>
            <div>{isRegistrationOpen ? "OPEN" : "CLOSED"}</div>
        </div>
    )
}

export default Event