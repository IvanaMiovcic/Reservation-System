import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SendNotification() {
  const [tableNumber, setTableNumber] = useState('1');
  const [sendEmail, setSendEmail] = useState(false);
  const [sendText, setSendText] = useState(false);

  const handleSendNotification = (e) => {
    e.preventDefault(); // prevents page from refreshing when you hit submit.
  
    // Placeholder for notification logic
    console.log('Sending notification to table: ' + tableNumber);
    if (sendEmail) {
      console.log('Sending Email Notification');
      }
    if (sendText) {
      console.log('Sending Text Notification');
      }
  };
    
  return (
    <div>
      <form onSubmit={handleSendNotification}>
        <h2>Send Notification</h2>
        {/* This should be a dropdown of all the tables that a restaurant has */}
        <label for="number">Select Table</label>
        <select 
          id="number"
          value={tableNumber} onChange={(e) => setTableNumber(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <br></br>
        {/* Checkbox options for notification type */}
        <label>
          <input 
            type="checkbox" 
            checked={sendEmail} 
            onChange={(e) => setSendEmail(e.target.checked)} 
          />
          Send Email Notification
        </label>
        <br></br>
        <label>
          <input 
            type="checkbox" 
            checked={sendText} 
            onChange={(e) => setSendText(e.target.checked)} 
          />
          Send Text Notification
        </label>
        <br></br>
        <button type="submit">Send Notification</button>
      </form>
    <Link to="/employee-home">Go Back</Link>
    </div>
  );
}

export default SendNotification;