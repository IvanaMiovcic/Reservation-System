import React from 'react';
import { Link } from 'react-router-dom';

function ModifyFloorplan() {
  return (
    <div>
      <h1>Modify Floorplan</h1>
      <div>
        <Link to="/add-table">Add Table</Link> 
        <br></br>
        <Link to="/modify-table">Modify Table</Link> 
        <br></br>
        <Link to="/remove-table">Remove Table</Link> 
        <br></br>
        <Link to="/employee-home">Go Back</Link>
      </div>
    </div>
  );
}

export default ModifyFloorplan;