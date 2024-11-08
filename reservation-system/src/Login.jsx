import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // prevents page from refreshing when you hit submit.
    // Put code to login here. 
    console.log('Logging in with:', { email, password });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br></br>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;