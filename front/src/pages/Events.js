import React from 'react';
import './Events.css';
import Event from '../Components/Event';

function Events() {
    return (
        <div className="events-container">
            <div className="events-header">
                <div className="event-header-item">Event</div>
                <div className="event-header-item">Time/Date</div>
                <div className="event-header-item">Capacity</div>
                <div className="event-header-item">Location</div>
                <div className="event-header-item">Register</div>
            </div>
            <div className='event-horizontal-line'></div>
            <Event 
                name="Varsity Tryouts"
                time="11:00 AM"
                date="12/25/2023"
                capacity="5/16"
                location="Activity Annex"
                registrationCloseDate="12/25/2023 21:03 PST"
            />
        </div>
    )
}

export default Events