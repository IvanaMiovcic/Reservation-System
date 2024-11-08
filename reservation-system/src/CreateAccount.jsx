import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [accountType, setAccountType] = useState('Customer');
  const [restaurantId, setRestaurantId] = useState('');

  const handleCreateAccount = (e) => {
    e.preventDefault(); // prevents page from refreshing when you hit submit.

    // Placeholder for actual account creation logic
    console.log('Creating account with:', {
      firstName,
      lastName,
      email,
      password1,
      password2,
      accountType,
      restaurantId: (accountType === 'Employee' || accountType === 'Manager') ? restaurantId : 'N/A',
    });
  };

  return (
    <div>
      <form onSubmit={handleCreateAccount}>
        <h2>Create Account</h2>
        <label for="firstname">First Name</label>
        <input
          type="text"
          id="firstname"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br></br>
        <label for="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br></br>
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br></br>
        <label for="password1">Password</label>
        <input
          type="password"
          id="password1"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <br></br>
        <label for="password2">Repeat Password</label>
        <input
          type="password"
          id="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <br></br>
        <label>Account type</label>
        <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
          <option value="Customer">Customer</option>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
        </select>
        {(accountType === 'Employee' || accountType === 'Manager') && (
          <>
          <br></br>
            <label for="restaurantID">Restaurant ID</label>
            <input
              type="text"
              id="restaurantID"
              value={restaurantId}
              onChange={(e) => setRestaurantId(e.target.value)}
              required
            />
          </>
        )}
        <br></br>
        <button type="submit">Create Account</button>
      </form>
      <p> Already have an account? </p>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default CreateAccount;