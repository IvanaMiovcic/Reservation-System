import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
//import CustomerHome from "./CustomerHome";
import CreateReservation from "./CreateReservation";
import ModifyReservation from "./ModifyReservation";
import ViewReservation from "./ViewReservation";
//import EmployeeHome from "./EmployeeHome";
import ModifyFloorplan from "./ModifyFloorplan";
import ViewSeatingChart from "./ViewSeatingChart";
import ViewQueue from "./ViewQueue";
import SendNotification from "./SendNotification";
import AddTable from "./AddTable";
import ModifyTable from "./ModifyTable";
import RemoveTable from "./RemoveTable";
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
        <Route path="/view-reservation" element={<ViewReservation />} />
        <Route path="/create-reservation" element={<CreateReservation />} />
        <Route path="/modify-reservation" element={<ModifyReservation />} />
        <Route path="/employee-home" element={<EDContainer />} />
        <Route path="/modify-floorplan" element={<ModifyFloorplan />} />
        <Route path="/view-seating-chart" element={<ViewSeatingChart />} />
        <Route path="/view-queue" element={<ViewQueue />} />
        <Route path="/send-notification" element={<SendNotification />} />
        <Route path="/add-floorplan" element={<AddTable />} />
        <Route path="/modify-table" element={<ModifyTable />} />
        <Route path="/remove-table" element={<RemoveTable />} />
      </Routes>
    </Router>
  );
}

export default App;
