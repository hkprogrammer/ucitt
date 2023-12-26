import React, {useState} from 'react';
import './Events.css';
import Event from '../Components/Event';

function Events() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    const hideInfo = () => {
        setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener('resize', hideInfo);
    return (
        <div className="events-container">
            <div className="events-header">
                <div className="events-header-item" id="events-header-item-start">Event</div>
                <div className={isMobile ?  "events-unnecessary": "events-header-item"}>Time/Date</div>
                <div className={isMobile ?  "events-unnecessary": "events-header-item"}>Capacity</div>
                <div className={isMobile ?  "events-unnecessary": "events-header-item"}>Location</div>
                <div className="events-header-item">Register</div>
            </div>
            <div className='events-horizontal-line'></div>
            <Event 
                name="Junior Varsity Tryouts"
                time="11:00 AM"
                date="12/25/2024"
                capacity="8/16"
                location="Activity Annex"
                registrationCloseDate="12/26/2024 16:48"
            />
            <Event 
                name="Varsity Tryouts"
                time="11:00 AM"
                date="12/25/2023"
                capacity="5/16"
                location="Activity Annex"
                registrationCloseDate="12/25/2023 21:00"
            />
        </div>
    )
}

export default Events