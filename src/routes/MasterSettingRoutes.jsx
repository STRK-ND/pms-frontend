import React from "react";
import { Routes, Route } from "react-router-dom";
import ManageCategory from "../pages/mastersettings/ManageCategory"
import SupremeLayout from "../layouts/SupremeAdminLayout";
import ManagePriority from "../pages/mastersettings/ManagePriority";
import ManageSaleryPayOut from "../pages/mastersettings/ManageSaleryPayout";
const ManagePriceType = () => <div>manage price Type</div>;
// const ManageSaleryPayOut = () => <div>manage pay out</div>;
const ManageDepartment = () => <div>manage department</div>;
const ManageRepeatType = () => <div>manage repeat type</div>;



function MasterSettingRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/supreme-admin" element={<SupremeLayout />}>
          <Route path="master-setting/manage-category" element={<ManageCategory />}/>
          <Route path="master-setting/manage-priority" element={<ManagePriority />}/>
          <Route path="master-setting/manage-priceType" element={<ManagePriceType />}/>
          <Route path="master-setting/manage-saleryPayout" element={<ManageSaleryPayOut />}/>
          <Route path="master-setting/manage-department" element={<ManageDepartment />}/>
          <Route path="master-setting/manage-repeatType" element={<ManageRepeatType />}/>

        </Route>
      </Routes>
    </div>
  );
}

export default MasterSettingRoutes;
