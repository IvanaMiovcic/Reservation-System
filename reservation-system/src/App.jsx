import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import CreateReservation from "./CreateReservation";
import ModifyReservation from "./ModifyReservation";
import ModifyFloorplan from "./ModifyFloorplan";
import SendNotification from "./SendNotification";
import CreateFloorplan from "./CreateFloorplan";
import Landing from "./Landing";
import EDContainer from "./components/EDContainer";
import CDContainer from "./components/CDContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/customer-home" element={<CDContainer />} />
        <Route path="/create-reservation" element={<CreateReservation />} />
        <Route path="/modify-reservation" element={<ModifyReservation />} />
        <Route path="/employee-home" element={<EDContainer />} />
        <Route path="/modify-floorplan" element={<ModifyFloorplan />} />
        <Route path="/send-notification" element={<SendNotification />} />
        <Route path="/add-floorplan" element={<CreateFloorplan />} />
      </Routes>
    </Router>
  );
}

export default App;
