import React from 'react';
import { Link } from 'react-router-dom';

function ViewSeatingChart() {
  return (
    <div>
      <h1>View Seating Chart</h1>
      <div>
        {/* will render all tables here once we have them created in the database */}
        <Link to="/employee-home">Go Back</Link>
      </div>
    </div>
  );
}

export default ViewSeatingChart;