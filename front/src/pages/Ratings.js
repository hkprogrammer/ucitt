import React from 'react';
import './Ratings.css';

function Ratings() {
  const players = [
    {
        id: 2,
        name: "Robin Jiang",
        rating: "100 million",
        rank: 1
    },
    {
        id: 3,
        name: "Nathan Tuan Duc Phamster",
        rating: "27",
        rank: 2
    },
    {
      id: 4,
      name: "Hitoki Chan",
      rating: "48",
      rank: 3
  }
  ];
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
                  <div className="player-info">{player.rank}</div>
                  <div className="player-info">{player.name}</div>
                  <div className="player-info">{player.rating}</div>
                </div>
              )
          })
        }
      </div>
    </div>
  )
}

export default Ratings