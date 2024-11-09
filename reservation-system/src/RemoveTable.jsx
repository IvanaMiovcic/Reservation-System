import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RemoveTable() {
  const [number, setNumber] = useState('1');

  const handleRemoveTable = (e) => {
    e.preventDefault(); // prevents page from refreshing when you hit submit.

    // Placeholder for table adding logic
    console.log('Removing table: ' + number);
  };

  return (
    <div>
      <form onSubmit={handleRemoveTable}>
        <h2>Remove Table</h2>
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
        <button type="submit">Remove Table</button>
      </form>
      <Link to="/employee-home">Cancel</Link>
    </div>
  );
}

export default RemoveTable;