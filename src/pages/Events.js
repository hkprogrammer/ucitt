import React, {useState} from 'react';
import './Events.css';
import Event from '../Components/Event';

function Events() {
    // props.events == array of event json
    const events = [
        {
            name:"Junior Varsity Tryouts",
            description: "Junior Varisty Tryouts for 2024 Winter NCTTA Divisional",
            info:{
                time:"11:00 AM",
                date:"12/25/2024",
                capacity:"8/16",
                location:"Activity Annex",
                registration_close_adte:"12/26/2024 16:48",
            },
            
            event_id: 1,
            sanctioned: false
        },
        {
            name:"Varsity Tryouts",
            description: "Varisty Tryouts for 2024 Winter NCTTA Divisional",
            info:{
                time:"11:00 AM",
                date:"12/25/2024",
                capacity:"8/16",
                location:"Activity Annex",
                registration_close_adte:"12/26/2024 16:48",
            },
            event_id:2,
            sanctioned: true
        }
      ];

    // checks to see if the screen is narrow enough for mobile version
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
    const hideInfo = () => {
        setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener('resize', hideInfo);
    return (
        <div className="events-container">
            <div className="events-header">
                <div className="events-header-item">Event</div>
                <div className={isMobile ?  "events-unnecessary": "events-header-item"}>Time/Date</div>
                <div className={isMobile ?  "events-unnecessary": "events-header-item"}>Capacity</div>
                <div className={isMobile ?  "events-unnecessary": "events-header-item"}>Location</div>
                <div className="events-header-item">Register</div>
            </div>
            <div className='events-horizontal-line'></div>
            <div className='events-list'>
                {
                    events.map((ttevent) => {
                        return (
                            <Event event={ttevent} className='event'/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Events