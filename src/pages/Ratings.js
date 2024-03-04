import React, { useEffect, useState } from 'react';
import './Ratings.css';

function Ratings() {

    const [players, setPlayers] = useState([])
    const getUrl = "http://127.0.0.1:5000/player/getPlayers"

    useEffect(()=>{
        fetch(getUrl, {
            mode: "cors",
            method: "GET",
        })
        .then((res) => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            var sorted = data;
            for(let i = 0;i<sorted.length;i++){
                for(let j = i;j<sorted.length;j++){
                    if(sorted[i].player_ucitt_rating < sorted[j].player_ucitt_rating){
                        //swap
                        var temp = sorted[i];
                        sorted[i] = sorted[j];
                        sorted[j] = temp;
                    }
                }
            }
            

            setPlayers(sorted);
            

        })
        .catch((err) => {
            console.error(err)
        });

    }, []);


    return (
    <div className="players-container">
      <div className="players-header">
          <div className="players-header-item" id="players-header-item-start">Rank</div>
          <div className="players-header-item">Name</div>
          <div className="players-header-item">Rating</div>
      </div>
      <div className='players-horizontal-line'></div>
      <div className='players-all-rankings'>
        {
          players.map((player) => {
              return (
                <div className="player-container">
                  <div className="player-info">{player.player_ucitt_id}</div>
                  <div className="player-info">{player.player_name}</div>
                  <div className="player-info bold">{player.player_ucitt_rating}</div>
                </div>
              )
          })
        }
      </div>
    </div>
  )
}

export default Ratings