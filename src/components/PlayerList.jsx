import React, { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import SearchBar from './SearchBar';
import PlayerForm from './PlayerForm';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(
          'https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players'
        );
        const result = await response.json();

        if (result.success) {
          setPlayers(result.data.players);
        } else {
          setError('Failed to load players');
        }
      } catch (err) {
        setError('Failed to fetch players');
        console.error(err);
      }
    };

    fetchPlayers();
  }, []);

  const addPlayer = (newPlayer) => {
   setPlayers([...players, newPlayer]);
  };

  const deletePlayer = async (id) => {
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players/${id}`,
        {
          method: 'DELETE',
        }
      );
      const result = await response.json();

      if (result.success) {
        setPlayers(players.filter(player => player.id !== id));
      } else {
        setError('Failed to delete player');
      }
    } catch (err) {
      setError('Error deleting player');
      console.error(err);
    }
  };

  const filteredPlayers = players.filter(player =>
    player.name && player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSeeDetails = (player) => {
    setSelectedPlayer(player);
  };

  return (
    <div className="container">
      <div className="player-list">
        <h1 className='title'>Bowl Players</h1>
        {error && <p className="error-message">{error}</p>}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <PlayerForm addPlayer={addPlayer} />
        <div>
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map(player => (
              <PlayerCard
                key={player.id}
                player={player}
                deletePlayer={deletePlayer}
                handleSeeDetails={handleSeeDetails}
              />
            ))
          ) : (
            <p>No players found</p>
          )}
        </div>
      </div>

      {selectedPlayer && (
        <div className="player-details">
          <h2>Player Details</h2>
          <div>
            <img src={selectedPlayer.imageUrl} alt={selectedPlayer.name} />
            <p><strong>Name:</strong> {selectedPlayer.name}</p>
            <p><strong>Breed:</strong> {selectedPlayer.breed}</p>
            <p><strong>Status:</strong> {selectedPlayer.status}</p>
            <p><strong>Created At:</strong> {new Date(selectedPlayer.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(selectedPlayer.updatedAt).toLocaleString()}</p>
            <p><strong>Team ID:</strong> {selectedPlayer.teamId}</p>
            <p><strong>Cohort ID:</strong> {selectedPlayer.cohortId}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerList;