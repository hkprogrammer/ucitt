import React, {useEffect, useState} from 'react';
// import {useFetch} from '@uidotenv/usehooks';
import './League.css';

function League(){
    // props.events == array of event json
    
    const [results, setResults] = useState([]);    

    // const url = useState('http://www.google.com')
    const getUrl = 'http://127.0.0.1:5000/league/getResults';
    const setUrl = 'http://127.0.0.1:5000/league/setResults';

    const getData = ()=>{
        fetch(getUrl, {
            mode:"cors", 
            method:"GET",
            })
            .then((res) => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                setResults(data);


            })
            .catch((err)=>{
                console.error(err)
            });

        
    }

    const submitData = async()=>{


        const player_a = document.getElementById("player_a").value;
        const player_b = document.getElementById("player_b").value;
        const score_a = parseInt(document.getElementById("score_a").value);
        const score_b = parseInt(document.getElementById("score_b").value);

        


        fetch(setUrl, {
            mode:"cors", 
            method:"POST",
            body: JSON.stringify({
                "player_a": player_a,
                "player_b": player_b,
                "score_a": score_a,
                "score_b": score_b
            }),
            headers: {'Content-Type':'application/json'}
            })
            .then((res) => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                // setResults(data);
                getData();
                

            })
            .catch((err)=>{
                console.error(err)
            });

        


    }
    
    useEffect(()=>{

        getData();


    },[]);


    return (
        <div className="league-container">
           
           <h4>Input Results for Game Night (2/15/2024):</h4>
           <form className='form'>
                <input type="text" className='name' placeholder='Player 1' id='player_a'></input>
                <input type="number" className='score' placeholder='3' id="score_a"></input>
                <input type="number" className='score' placeholder='0' id="score_b"></input>
                <input type="text" className='name' placeholder='Player 2' id="player_b"></input>
           </form>
           <button onClick={submitData}>Submit</button>
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