import React from 'react';
import { Link } from 'react-router-dom';

function EmployeeHome() {
  return (
    <div>
      <h1>Employee Home Page</h1>
      <div>
        <Link to="/modify-floorplan">Modify Floorplan</Link> 
        <br></br>
        <Link to="/view-queue">View Queue</Link> 
        <br></br>
        <Link to="/view-seating-chart">View Seating Chart</Link> 
        <br></br>
        <Link to="/send-notification">Send Notification</Link> 
        <br></br>
        <Link to="/">Logout</Link>
      </div>
    </div>
  );
}

export default EmployeeHome;
