import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ModifyTable() {
  const [number, setNumber] = useState('');
  const [size, setSize] = useState('1');
  const [seatingType, setSeatingType] = useState('Standard');
  const [seatingLocation, setSeatingLocation] = useState('Indoor');

  const handleModifyTable = (e) => {
    e.preventDefault(); // prevents page from refreshing when you hit submit.

    // Placeholder for table adding logic
    console.log('Modifying table ' + number +  ' with:', {
      size,
      seatingType,
      seatingLocation,
    });
  };

  return (
    <div>
      <form onSubmit={handleModifyTable}>
        <h2>Modify Table</h2>
        {/* This should be a dropdown of all the tables that a restaurant has */}
        <label for="number">Select Table</label>
        <select 
          id="number"
          value={number} onChange={(e) => setNumber(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <br></br>
        <label for="size">Table Size</label>
        <select 
          id="size"
          value={size} onChange={(e) => setSize(e.target.value)}>
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
          value={seatingLocation} onChange={(e) => setSeatingLocation(e.target.value)}>
          <option value="Indoor">Indoor</option>
          <option value="Outdoor">Outdoor</option>
        </select>
        <br></br>
        <button type="submit">Modify Table</button>
      </form>
      <Link to="/employee-home">Cancel</Link>
    </div>
  );
}

export default ModifyTable;