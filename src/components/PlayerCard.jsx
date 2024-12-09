import React from 'react';

const PlayerCard = ({ player, deletePlayer, handleSeeDetails }) => {
  return (
    <div className="player-card">
      <img src={player.imageUrl} alt={player.name} />
      <h3>{player.name}</h3>
      <p>{player.breed}</p>
      <p>Status: {player.status}</p>
      <button onClick={() => handleSeeDetails(player)}>See Details</button>
      <button onClick={() => deletePlayer(player.id)}>Delete Player</button>
    </div>
  );
};

export default PlayerCard;