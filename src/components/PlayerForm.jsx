import React, { useState } from 'react';

const PlayerForm = ({ addPlayer }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [status, setStatus] = useState('bench');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form input
    if (!name || !breed || !imageUrl) {
      setError('Please fill in all fields');
      return;
    }

    setError('');

    const newPlayer = {
      name,
      breed,
      status,
      imageUrl,
    };

    try {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2410-FTB-ET-WEB-FT/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
      });

      const result = await response.json();
      if (response.ok) {
        addPlayer(result.data);
        // Clear the form fields
        setName('');
        setBreed('');
        setStatus('bench');
        setImageUrl('');
      } else {
        setError('Failed to add the player.');
      }
    } catch (err) {
      setError('There was an error while adding the player.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Player</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="bench">Bench</option>
          <option value="field">Field</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Add Player</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PlayerForm;