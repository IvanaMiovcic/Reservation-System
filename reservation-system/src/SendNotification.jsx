import React from 'react';
import { Link } from 'react-router-dom';

function SendNotification() {
  return (
    <div>
      <h1>Send Notification</h1>
      <div>
        <Link to="/employee-home">Go Back</Link>
      </div>
    </div>
  );
}

export default SendNotification;