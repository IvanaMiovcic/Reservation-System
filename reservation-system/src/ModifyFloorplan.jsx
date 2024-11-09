import React from 'react';
import { Link } from 'react-router-dom';

function ModifyFloorplan() {
  return (
    <div>
      <h1>Modify Floorplan</h1>
      <div>
        <Link to="/employee-home">Go Back</Link>
      </div>
    </div>
  );
}

export default ModifyFloorplan;