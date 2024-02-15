import React, {useCallback, useState} from 'react';
import {useEffect } from "react";
import axios from 'axios';
// import {useFetch} from '@uidotenv/usehooks';
import './League.css';

function League(){
    // props.events == array of event json
    

    // checks to see if the screen is narrow enough for mobile version
    
    // const results = [
    //     {"match_id": 1,"player_a": "Hitoki", "score_a": "3", "score_b": "0", "player_b": "Robin"},
    //     {"match_id": 2,"player_a": "Hitoki", "score_a": "3", "score_b": "0", "player_b": "Nathan"}
    // ]
    
    var data = null;

    const [results, setResults] = useState([]);    
    const [testName, setTestName] = useState("123");

    // const url = useState('http://www.google.com')
    const url = 'http://localhost:5000/league/getResults';


    const getData = useCallback( async()=>{
        fetch(url, {
            mode:"cors", 
            method:"GET",
            })
            .then((res) => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                setResults(data);


            });

        
    });

    return (
        <div className="league-container">
           
           Results:
           {testName}
           <form className='form'>
                <input type="text" className='name' placeholder='Player 1'></input>
                <input type="number" className='score' placeholder='3'></input>
                <input type="number" className='score' placeholder='0'></input>
                <input type="text" className='name' placeholder='Player 2'></input>
           </form>
           <button onClick={getData}>Submit</button>
           <hr></hr>

           <table border='1'>
                <thead>
                    {/* testererrr */}
                    <tr>
                        <th>Player A</th>
                        <th>Score A</th>
                        <th>Score B</th>
                        <th>Player B</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>Hitoki</td>
                        <td>3</td>
                        <td>0</td>
                        <td>Robin</td>
                    </tr> */}
                    {results.map(result=>(
                        
                        <tr key={result.match_id}>
                            <td>{result.player_a}</td>
                            <td>{result.score_a}</td>
                            <td>{result.score_b}</td>
                            <td>{result.player_b}</td>
                        </tr>

                    ))}

                </tbody>
                
           </table>
        </div>
    )
}

export default League