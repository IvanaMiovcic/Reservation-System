import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ModifyReservation() {
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [seatingType, setSeatingType] = useState('');
  const [seatingLocation, setSeatingLocation] = useState('');

  const handleModifyReservation = (e) => {
    e.preventDefault(); // prevents page from refreshing when you hit submit.

    // Placeholder for actual reservation creation logic
    console.log('Creating reservation with:', {
      time,
      partySize,
      seatingType,
      seatingLocation,
    });
  };

  const handleCancellation = (e) => {
    // Implement logic for cancelling reservation
    console.log('Reservation Cancelled')
  };

  return (
    <div>
      <form onSubmit={handleModifyReservation}>
        <h2>Modify Reservation</h2>
        <label for="time">Time</label>
        <input
          type="text"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <br></br>
        <label for="size">Party Size</label>
        <select 
          id="size"
          value={partySize} onChange={(e) => setPartySize(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        <br></br>
        <label for="type">Seating Type</label>
        <select 
          id="type"
          value={seatingType} onChange={(e) => setSeatingType(e.target.value)}>
          <option value="Standard">Standard</option>
          <option value="Bar">Bar</option>
        </select>
        <br></br>
        <label for="location">Seating Location</label>
        <select 
          id="location"
          value={seatingType} onChange={(e) => setSeatingLocation(e.target.value)}>
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
        </select>
        <br></br>
        <button type="submit">Modify Reservation</button>
      </form>
      <div>
        <button onClick={handleCancellation}> Cancel Reservation</button>
      </div>
      <Link to="/customer-home">Go Back</Link>
    </div>
  );
}

export default ModifyReservation;