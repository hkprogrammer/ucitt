import React, {useState} from 'react';
import './Events.css';
import Event from '../Components/Event';

function Events() {
    // props.events == array of event json
    const events = [
        {
            name:"2024 UCITT JV Teams Open",
            description: "This is an invitation based tournament hosted by UC Irvine Club Table Tennis for JV players. This will be a team tournamnet featuring WTTTC styled 3-player team format.",
            info:{
                time:"11:00 AM",
                date:"12/25/2024",
                capacity:"8/16",
                location:"Activity Annex",
                registration_close_date:"12/26/2024 16:48",
            },
            event_id:2,
            sanctioned: true,
            groups:[
                [
                    {
                        
                        name: "UCI A",
                        seed: 1,
                        key:1,
                        team_id:1,
                        wl: "3-0",
                        pos: 1
                    },
                    {
                        name: "UCI B",
                        seed: 2,
                        key:2,
                        team_id:2,
                        wl: "2-1",
                        pos: 2
                    },
                    {
                        name: "UCI C",
                        seed: 3,
                        key:3,
                        team_id: 3,
                        wl: "1-2",
                        pos: 3
        
                    },
                    {
                        name: "UCI D",
                        seed: 4,
                        key: 4,
                        team_id:4,
                        wl: "0-3",
                        pos: 4
                    }, 
        
                ],   
            ],
            results:{
                1: {
                    2: {
                        team_a: 3,
                        team_b: 0,
                        winner: 1
                    },
                    3: {
                        team_a: 3,
                        team_b: 0,
                        winner: 1
                    },
                    4: {
                        team_a: 3,
                        team_b: 0,
                        winner: 1
                    }
                },
                2: {
                    1: {
                        team_a: 0,
                        team_b: 3,
                        winner: 1
                    },
                    3: {
                        team_a: 3,
                        team_b: 0,
                        winner: 2
                    },
                    4: {
                        team_a: 3,
                        team_b: 0,
                        winner: 2
                    }
                },
                3: {
                    1: {
                        team_a: 0,
                        team_b: 3,
                        winner: 1
                    },
                    2: {
                        team_a: 3,
                        team_b: 0,
                        winner: 2
                    },
                    4: {
                        team_a: 3,
                        team_b: 0,
                        winner: 3
                    }
                },
                4: {
                    1: {
                        team_a: 0,
                        team_b: 3,
                        winner: 1
                    },
                    2: {
                        team_a: 3,
                        team_b: 0,
                        winner: 2
                    },
                    3: {
                        team_a: 3,
                        team_b: 0,
                        winner: 3
                    }
                }
            
            }
        },
        {
            name:"Junior Varsity Tryouts",
            description: "Junior Varisty Tryouts for 2024 Winter NCTTA Divisional",
            info:{
                time:"11:00 AM",
                date:"12/25/2024",
                capacity:"8/16",
                location:"Activity Annex",
                registration_close_date:"12/26/2024 16:48",
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
                registration_close_date:"12/26/2024 16:48",
            },
            event_id:2,
            sanctioned: true
        },
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