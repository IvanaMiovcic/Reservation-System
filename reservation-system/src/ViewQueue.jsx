import React from 'react';
import { Link } from 'react-router-dom';

function ViewQueue() {
  return (
    <div>
      <h1>View Queue</h1>
      <div>
        {/* will render queue here once we have the database implemented */}
        <Link to="/employee-home">Go Back</Link>
      </div>
    </div>
  );
}

export default ViewQueue;