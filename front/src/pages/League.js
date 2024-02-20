import React, { useEffect, useState } from 'react';
// import {useFetch} from '@uidotenv/usehooks';
import './League.css';
import Select from "react-dropdown-select";
import config from '../config'
import Alert from 'react-bootstrap/Alert';
import BSAlert from '../Components/BSAlert';

function League() {
    // props.events == array of event json

    const [results, setResults] = useState([]);

    // const url = useState('http://www.google.com')
    const getUrl = 'http://127.0.0.1:5000/league/getResults';
    const setUrl = 'http://127.0.0.1:5000/league/setResults';
    const delUrl = 'http://127.0.0.1:5000/league/deleteResult';
    const getPlayersUrl = config.env.BACK_URL + "/player/getPlayers";

    const [selectPlayerA, setSelectPlayerA] = useState("");
    const [selectPlayerB, setSelectPlayerB] = useState("");
    const [selectScoreA, setSelectScoreA] = useState(0);
    const [selectScoreB, setSelectScoreB] = useState(0);
    const [show, setShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("{values}");
    const [alertType, setAlertType] = useState("light");
    const [_maxPlayerCharLen, _setMaxPlayerCharLen] = useState(10); //default to 10 characters long
    const [_playerNameList, _setPlayerNameList] = useState([]);


    const [playerList, setPlayerList] = useState([
        {
            value: 0,
            label: "test"
        },

    ])

    var _scores = [];

    const upperScoreCap = 4;
    for(let i = 0;i<=upperScoreCap;i++){
        _scores.push({value:i, label: i.toString()});
    }
    


    const getResultsData = () => {
        fetch(getUrl, {
            mode: "cors",
            method: "GET",
        })
        .then((res) => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            setResults(data);
            resetMaxPlayerChar();

        })
        .catch((err) => {
            console.error(err)
        });


    }

    const getPlayerData = ()=>{
        fetch(getPlayersUrl, {
            mode: "cors",
            method: "GET",
            
        }).then((raw)=>{
            return raw.json()
        }).then((data)=>{     
            
            var formatted = _transformPlayerList(data)
            setPlayerList(formatted);
            let values = formatted.map((row)=> row.value);
            _setPlayerNameList(values);

        }).catch((err)=>{
            console.error(err);
        })
    }

    const submitResults = async () => {
        // const player_a = document.getElementById("player_a").value;
        // const player_b = document.getElementById("player_b").value;
        // const score_a = parseInt(document.getElementById("score_a").value);
        // const score_b = parseInt(document.getElementById("score_b").value);


        const player_a = selectPlayerA[0];
        const player_b = selectPlayerB[0];
        const score_a = selectScoreA[0];
        const score_b = selectScoreB[0];


        if(player_a == undefined || player_b == undefined){
            console.warn("Player not in database");
            showAlert("Player not in database!!", "warn");
            return;
        }
        if(_playerNameList.indexOf(player_a.value) == -1 || _playerNameList.indexOf(player_b.value) == -1){
            console.warn("Player not in database");
            showAlert("Player not in database", "warn");
            return;
        }


        fetch(setUrl, {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({
                "player_a": player_a,
                "player_b": player_b,
                "score_a": score_a,
                "score_b": score_b
            }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                // setResults(data);
                getResultsData();


            })
            .catch((err) => {
                console.error(err)
            });

        showAlert("Score submitted", "success");

    }

    const deleteResults = (match_id) => {
        var id = match_id;
        const _deleteResultsCB = async () => {
            fetch(delUrl, {
                mode: "cors",
                method: "POST",
                body: JSON.stringify({

                    "match_id": id
                }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => {
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    // setResults(data);
                    getResultsData();


                })
                .catch((err) => {
                    console.error(err)
                });
        };
        return _deleteResultsCB
    }
    
    const showAlert = (msg, type)=>{
        
        setAlertMessage(msg);
        setAlertType(type);
        setShow(true);
        console.log("should be showing alert")
        var delay = config.env.ALERT_DELAY;
        setTimeout(()=>{
            setShow(false);
        }, delay)


    }

    const _transformPlayerList = (data)=>{
        /**
         * Keys:
         * player_ucitt_id
         * player_ucitt_rating
         * player_name
         * 
         * 
         */

        var formattedArray = [];

        for(let i = 0;i<data.length;i++){
            //for each line:
            let player = data[i];
            let id = player["player_ucitt_id"];
            let name = player["player_name"];
            let rating = player["player_ucitt_rating"];
            let label = name + ` (${rating})`;
            let value = i;

            formattedArray.push({
                player_ucitt_id: id,
                player_name: name,
                player_ucitt_rating: rating,
                label: label,
                value: value
            })
        }

        //sort array:
        //bubble sort, not fast but usable Ok?
        for(let i = 0;i<formattedArray.length;i++){
            for(let j = i;j<formattedArray.length;j++){
                if(formattedArray[j].player_name < formattedArray[i].player_name){
                    let temp = formattedArray[i];
                    formattedArray[i] = formattedArray[j];
                    formattedArray[j] = temp;
                }
            }
        }

    
        return formattedArray
    }

    useEffect(()=>{

        getPlayerData();

    }, [])


    useEffect(() => {

        getResultsData();
        console.log("test")


    }, []);


    const resetMaxPlayerChar = ()=>{
        for(let i = 0;i<playerList.length;i++){

            if(playerList[i].label.length > _maxPlayerCharLen){
                _setMaxPlayerCharLen(playerList[i].label.length);
            }
    
        }
    }

    resetMaxPlayerChar();
    
    return (
        <div className="league-container">
            <div className="Alert">
                {show && <BSAlert show={true} message={alertMessage} type={alertType} > </BSAlert>}
            </div>

            <h4>Input Results for Game Night (2/15/2024):</h4>
            <div className='form'>
                <Select options={playerList} placeholder={'player A' + (" ".repeat(_maxPlayerCharLen))} onChange={(values) => setSelectPlayerA(values)} className='name' />
                <Select options={_scores} placeholder='0' onChange={(values) => setSelectScoreA(values)} className='score' />
                <Select options={_scores} placeholder='0' onChange={(values) => setSelectScoreB(values)} className='score' />
                <Select options={playerList} placeholder={'player A' + (" ".repeat(_maxPlayerCharLen))} onChange={(values) => setSelectPlayerB(values)} className='name' />

            </div>
            <button onClick={submitResults}>Submit</button>
            <hr></hr>

            <table border='1'>
                <thead>
                    {/* testererrr */}
                    <tr>
                        <th>id</th>
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
                    {results.map(result => (

                        <tr key={result.match_id}>
                            <td>{result.match_id}</td>
                            <td>{result.player_a}</td>
                            <td>{result.score_a}</td>
                            <td>{result.score_b}</td>
                            <td>{result.player_b}</td>
                            <td><button onClick={deleteResults(result.match_id)}>del</button></td>
                            
                        </tr>

                    ))}

                </tbody>

            </table>
        </div>
    )
}

export default League