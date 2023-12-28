import React, {useState} from 'react';
import './Event.css';

function Event(props) {
    /*
    *   Takes 1 prop called event with the following attributes:
    *   All props.event.xxxx are strings
    *
    *   props.event.name          EX: "Regionals"
    *   props.event.time          EX: "10:00 AM"
    *   props.event.date          EX: "12/25/2023"
    *   props.event.capacity      EX: "5/16"
    *   props.event.location      EX: "Santa Monica College"
    * 
    *   props.event.registrationCloseDate EX: "12/25/2023 10:00";
    *       ^ MUST BE IN "MM/DD/YYYY HH:MM" form
    */
    
    // updates isRegistrationOpen according to if the registration date has passed.
    // When props of <Event /> are changed, this does not change, so the page must be reloaded
    const closeDate = new Date(props.event.registrationCloseDate);
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
        <a href={props.event.name} className='event-link'>
            <div className='event-container'>
                <div className='event-item'>{props.event.name}</div>
                <div className={isMobile? 'event-unnecessary':'event-item'}>{props.event.time}, {props.event.date}</div>
                <div className={isMobile? 'event-unnecessary':'event-item'}>{props.event.capacity}</div>
                <div className={isMobile? 'event-unnecessary':'event-item'}>{props.event.location}</div>
                <div className='event-item'>{isRegistrationOpen ? "OPEN" : "CLOSED"}</div>
            </div>
        </a>
    )
}

export default Event