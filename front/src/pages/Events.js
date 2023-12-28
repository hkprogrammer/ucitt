import React, {useState} from 'react';
import './Events.css';
import Event from '../Components/Event';

function Events(props) {
    // props.events == array of event json

    // checks to see if the screen is narrow enough for mobile version
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
            <div className='events-list'>
                {
                    props.events.map((ttevent) => {
                        return (
                            <Event event={ttevent}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Events