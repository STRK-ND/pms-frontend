import { Routes, Route, Navigate } from "react-router-dom";
import StaffLayout from "../layouts/StaffLayout"; // ✅ Use consistent naming

import AssignedProject from "../pages/staff/AssignedProject";
import ManageLead from "../pages/staff/ManageLead";
import Calendar from "../components/Calendar";
import ManageTask from "../pages/staff/ManageTask";
import StaffDashBoard from "../pages/staff/StaffDashBoard";
import ManageAnnouncement from "../pages/staff/ManageAnnouncement"

function StaffRoutes() {
  return (
    <Routes>
      <Route path="/staff" element={<StaffLayout />}>
        {/* ✅ Redirect /staff to /staff/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<StaffDashBoard />} />
        <Route path="assigned-project" element={<AssignedProject />} />
        <Route path="manage-lead" element={<ManageLead />} />
        <Route path="leave" element={<Calendar />} />
        <Route path="manage-task" element={<ManageTask />} />
        <Route path="manage-announcements" element={<ManageAnnouncement />} />

      </Route>
    </Routes>
  );
}

export default StaffRoutes;
