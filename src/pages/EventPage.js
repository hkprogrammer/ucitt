import React, {useEffect, useState} from 'react';
import { useLocation} from 'react-router-dom'
import './EventPage.css';
import { isNull } from '../static/null';
import { PageError } from '../static/error';
import  Lorem from '../static/lorem';
import Sanctioned from '../Components/Sanctioned';
import {Red, Green} from "../Components/Status";
import TournamentRegister from '../Components/TournamenRegister';
import EventBracket from '../Components/EventBracket';
import HrLine from '../Components/HrLine';

function EventPage() {
    const location = useLocation();
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    var props = location.state;

    var data = {
        //template
        name : "",
        description: "",
        info : {
            template: 'template'
        },
        sanctioned: true
    };
    var fields = {
        required: {
            name: "string",
            rating: "number",
        },
        optional:{
            ucitt_id: "number"
        }

    }
    try{
        /**
         * Main try catch block. Put all code here
         */
        if(isNull(props)){
            return PageError();
        }
        data = props;
    }
   
    catch(exception){
        return PageError();
    }
   
    // console.log(props);
    return (
        <div className="event">
            <div className='event-header'>Event: {data.name}</div>
            <HrLine/>
            {data.sanctioned && <Sanctioned></Sanctioned>}

            <Lorem></Lorem>
            <div>
                <div className='descriptions'>
                    <div className='tournament-description'>
                        
                        <span className='bold'>
                            Tournament Description: &nbsp;
                        </span>
                        <span>
                            {data.description}
                        </span>
                    </div>
                    <div className='tournament-info'>
                        <span className='bold'>Tournament Basic Info: </span>
                        <ul>
                            {Object.keys(data.info).map((key=>{

                                return (
                                    <li>{data.info[key]}</li>
                                )


                            }))}
                            
                        </ul>
                    </div>
                </div>
                <div className='register'>
                    <span className='bold'>Registration:</span>
                    <div className='register-contnet'>
                        <TournamentRegister requiredFields = {fields.required} optionalFields={fields.optional}></TournamentRegister>
                    </div>
                </div>
                
                <div className='event-bracket'>
                        <HrLine></HrLine>
                        <EventBracket></EventBracket>

                </div>

            </div>
        </div>
    )
}

export default EventPage