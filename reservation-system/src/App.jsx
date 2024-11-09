import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import CustomerHome from './CustomerHome';
import CreateReservation from './CreateReservation';
import ModifyReservation from './ModifyReservation';
import ViewReservation from './ViewReservation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/customer-home" element={<CustomerHome />} />
        <Route path="/view-reservation" element={<ViewReservation />} />
        <Route path="/create-reservation" element={<CreateReservation />} />
        <Route path="/modify-reservation" element={<ModifyReservation />} />
      </Routes>
    </Router>
  );
}

export default App;
