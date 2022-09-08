import "./App.css";
import React from "react";
import ApprovalData from "./ApprovalData";
import { Routes, Route } from "react-router-dom";
import Approval from "./Approval";
import Details from "./Details";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<ApprovalData />} />
      <Route path="/approve" exact element={<Approval />} />
      <Route path="/details/:id" exact element={<Details />} />
    </Routes>
  );
}

export default App;
