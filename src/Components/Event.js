import React, {useState} from 'react';
import './Event.css';
import {Link} from "react-router-dom"
import {Green,Red} from './Status.js';

function Event(props) {
    /*
    *   Takes 1 prop called event with the following attributes:
    *   All props.event.xxxx are strings
    * 
    *  name:"Junior Varsity Tryouts",
        description: "Junior Varisty Tryouts for 2024 Winter NCTTA Divisional",
        info:{
            time:"11:00 AM",
            date:"12/25/2024",
            capacity:"8/16",
            location:"Activity Annex",
            registration_close_adte:"12/26/2024 16:48",
        },
        
        event_id: 1,
    *
    *   props.event.name          EX: "Regionals"
    *   props.event.info          dictionary of information
    *   props.event.event_id      event_id
    * 
    *   props.event.info.registration_close_adte EX: "12/25/2023 10:00";
    *       ^ MUST BE IN "MM/DD/YYYY HH:MM" form
    */
    
    // updates isRegistrationOpen according to if the registration date has passed.
    // When props of <Event /> are changed, this does not change, so the page must be reloaded
    const closeDate = new Date(props.event.info.registration_close_adte);
    let now  = new Date();
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(now < closeDate);
    const UpdateTime=()=>{
        now =  new Date();
        setIsRegistrationOpen(now < closeDate);
        
    }
    setInterval(UpdateTime, 100000);
    
    // console.log(isRegistrationOpen);
    // console.log(props.event.info.registration_close_adte,new Date())


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
        // <a href={props.event.name} className='event-link'>
        <Link to='/event' state={props.event} className='event'>
            <div className='event-container'>
                <div className='event-item'>{props.event.name}</div>
                <div className={isMobile? 'event-unnecessary':'event-item'}>{props.event.info.time}, {props.event.info.date}</div>
                <div className={isMobile? 'event-unnecessary':'event-item'}>{props.event.info.capacity}</div>
                <div className={isMobile? 'event-unnecessary':'event-item'}>{props.event.info.location}</div>
                <div className='event-item'>{isRegistrationOpen ? <Green text="OPEN" /> : <Red text="CLOSED"/>}</div>
            </div>
        </Link>
    )
}

export default Event