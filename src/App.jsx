import React from 'react'
import "./index.css"
import { Routes, Route } from "react-router-dom";

import SupremeRoutes from "./routes/SupremeAdminRoutes"
import MasterSettingRoutes from './routes/MasterSettingRoutes'
import StaffRoutes from "./routes/StaffRoutes"
import Login from './pages/login/Login';
import ManageOnBoard from "./pages/ManageOnBoarding"
function App() {
  return (
    <div>
      <SupremeRoutes/>
      <MasterSettingRoutes/>
      <StaffRoutes/>
          <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/onBoarding" element={<ManageOnBoard />}></Route>
      </Routes>
    </div>
  )
}

export default App
