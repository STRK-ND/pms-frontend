import { Routes, Route, Navigate } from "react-router-dom";
import SupremeLayout from "../layouts/SupremeAdminLayout";

import ManageEmployee from "../pages/supreme/ManageEmployee";
import ManageProject from "../pages/supreme/ManageProject";
import ManageExpense from "../pages/supreme/ManageIncomeExpense";
import ManageRemider from "../pages/supreme/ManageReminder";
import ManageTableOnboarding from "../pages/supreme/ManageTableOnBoarding";
import Dashboard from "../pages/supreme/supremeDashBoard";
import ManageAttendence from "../pages/supreme/ManageAttendence";

const ManageReports = () => <h1>Reports</h1>;
const Incentive = () => <div>Incentive</div>;

const AdminRoutes = () => (
  <Routes>
    <Route path="/supreme-admin" element={<SupremeLayout />}>
      {/* 🔁 Redirect from /supreme-admin → /supreme-admin/dashboard */}
      <Route index element={<Navigate to="dashboard" replace />} />

      <Route path="dashboard" element={<Dashboard />} />
      <Route path="manage-employees" element={<ManageEmployee />} />
      <Route path="manage-project" element={<ManageProject />} />
      <Route path="manage-expense" element={<ManageExpense />} />
      <Route path="manage-attendence" element={<ManageAttendence />} />
      <Route path="manage-reports" element={<ManageReports />} />
      <Route path="manage-reminders" element={<ManageRemider />} />
      <Route path="manage-onboarding" element={<ManageTableOnboarding />} />
      <Route path="manage-incentive" element={<Incentive />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
