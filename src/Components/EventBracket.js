import React from 'react';
import './EventBracket.css';
import GroupStage from './tournament/Groups';
function EventBracket(props) {
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


  const groups = true;
  const bracket = false;

  return (
    <div className='eventbracket-container bold'>
        <div className='bold'>Tournament Bracket:</div>

        {groups && <GroupStage></GroupStage>}


    </div>
  )
}

export default EventBracket