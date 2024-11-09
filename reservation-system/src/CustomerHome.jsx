import React from 'react';
import { Link } from 'react-router-dom';

function CustomerHome() {
  return (
    <div>
      <h1>Customer Home Page</h1>
      <div>
        <Link to="/view-reservation">View Reservation</Link> 
        <br></br>
        <Link to="/create-reservation">Create Reservation</Link>
        <br></br>
        <Link to="/modify-reservation">Modify Reservation</Link>
        <br></br>
        <Link to="/">Logout</Link>
      </div>
    </div>
  );
}

export default CustomerHome;
