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
    *   props.registrationCloseDate EX: "12/25/2023 10:00";
    *       ^ MUST BE IN "MM/DD/YYYY HH:MM" form
    */
    
    // updates isRegistrationOpen according to if the registration date has passed.
    // When props of <Event /> are changed, this does not change, so the page must be reloaded
    const closeDate = new Date(props.registrationCloseDate);
    let now  = new Date();
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(now < closeDate);
    const UpdateTime=()=>{
        now =  new Date();
        setIsRegistrationOpen(now < closeDate);
    }
    setInterval(UpdateTime, 1000);


    // checking to see if the window is mobile size
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    const hideInfo = () => {
        setIsMobile(window.innerWidth <= 700);
    };

    // this makes resizing window only happen once at the end of resizing
    // it will look weird in the middle of resizing, but reduces a lot of lag
    // "throttling"
    var timeout = false;
    window.addEventListener('resize', function() {
        clearTimeout(timeout);
        timeout = setTimeout(hideInfo, 200);
    });

    // placeholder link "props.name"
    return (
        <a href={props.name} className='event-link'>
            <div className='event-container'>
                <div className='event-item'>{props.name}</div>
                <div className={isMobile? 'event-unnecessary':'event-item'}>{props.time}, {props.date}</div>
                <div className={isMobile? 'event-unnecessary':'event-item'}>{props.capacity}</div>
                <div className={isMobile? 'event-unnecessary':'event-item'}>{props.location}</div>
                <div className='event-item'>{isRegistrationOpen ? "OPEN" : "CLOSED"}</div>
            </div>
        </a>
    )
}

export default Event