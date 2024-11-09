import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ViewReservation() {
  //Need to get reservation from database first and then we can implement this page
  return (
    <div>
      <h1> Customer Reservation</h1>
    <Link to="/customer-home">Go Back</Link>
    </div>
  );
}

export default ViewReservation;