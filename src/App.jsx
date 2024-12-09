import React, { useState, useEffect } from 'react';
import PlayerList from './components/PlayerList';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch players from the API
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players');
        const result = await response.json();
        setPlayers(result.data.players);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching players:', error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  // WIP - re-render player state once form submit?
  const addPlayer = (newPlayer) => {
    setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
  };

  return (
    <div className="container">
      {loading ? (
        <p>Loading players...</p>
      ) : (
        <PlayerList players={players} addPlayer={addPlayer} />
      )}
    </div>
  );
};

export default App;