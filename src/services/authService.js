import { RiAlarmWarningFill } from "react-icons/ri";
import API from "./api";

/*-------------------LOG IN--------------------- */

// 🔐 Login API for Supreme Admin
export const LogIn = async (logInData) => {
  try {
    const res = await API.post("/auth/login", logInData);

    // ✅ Successful response
    return res.data;
  } catch (error) {
    // ❌ Handle server or validation errors
    const errMessage =
      error?.response?.data?.message || "Login failed. Please try again.";

    console.error("❌ SupremeAdmin Login Error:", errMessage);

    // Optional: Throw error to be caught in your frontend (form)
    throw new Error(errMessage);
  }
};

/*----------------------LOG OUT--------------------------- */

export const Logout = async () => {
  const res = await API.post("/supreme-admin/logout"); // No body needed

  // Clear localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");

  return res.data;
};


/*------------------- MANAGE EMPLOYEE PAGE-------------------------------- */

// 👇 CREATE a new appointment
export const CreateStaff = async (staffData) => {
  const res = await API.post("/supreme-admin/createStaff", staffData);
  return res.data;
};

// 👇 GET  project
export const getAllStaff = async () => {
  const res = await API.get("/supreme-admin/getAllStaff");
  return res.data;
};
/* ------------------MANAGE PROJECT PAGE-----------------------------*/

// 👇 CREATE a new project
export const CreateProject = async (projectDate) => {
  const res = await API.post("/supreme-admin/createProject", projectDate);
  return res.data;
};

// 👇 GET  project
export const getProjects = async () => {
  const res = await API.get("/supreme-admin/getProjects");
  return res.data;
};

/*-------------------------MANAGE ICOME EXPENSE------------------- */
export const CreateIncomeExpense = async (incomeExpenseData) => {
  const res = await API.post("/supreme-admin/createExpense", incomeExpenseData);
  return res.data;
};

// 👇 GET  project
export const getIncomeExpense = async () => {
  const res = await API.get("/supreme-admin/getExpense");
  return res.data;
};

/*-----------------------------MASTER SETTINGS------------------------------- */

/*----CATEGORIES SECTION---- */

// ADD CATEGORIES
export const CreateCategories = async (categoryData) => {
  const res = await API.post("/master-setting/createCategories", categoryData);
  return res.data;
};

// GET CATEGORIES
export const GetCategories = async () => {
  const res = await API.get("/master-setting/getCategories");
  return res.data;
};

// DELETE CATEGORIES
export const DeleteCategories = async (category_id) => {
  const res = await API.delete(
    `/master-setting/deleteCategories/${category_id}`
  );
  console.log("✅ Deleted Data:", res.data);
  return res.data;
};

/*----PRIORITY SECTION---- */

// ADD CATEGORIES
export const CreatePriorities = async (categoryData) => {
  const res = await API.post("/master-setting/createPriorities", categoryData);
  return res.data;
};

// GET PRIORITIES
export const GetPriorityies = async () => {
  const res = await API.get("/master-setting/getPriorities");
  return res.data;
};

/*------SALERY PAY OUT SECTION------ */

// ADD SALERY PAY OUT

export const CreateSalary = async (saleryData) => {
  const res = await API.post("/master-setting/createSalaries", saleryData);
  console.log("Salery Data", res);
  return res.data;
};

// GET SALERY PAY OUT

export const GetSalary = async () => {
  const res = await API.get("/master-setting/getSalaries");
  return res.data;
};

export const DeleteSalary = async (salary_id) => {
  const res = await API.delete(`/master-setting/deleteSalaries/${salary_id}`);
  return res.data;
};

/*-----------------------MANAGE LEADS------------------ */

export const createLeads = async (formData) => {
  const res = await API.post("/staff/createLead", formData);
  return res.data;
};

export const GetLeads = async () => {
  const res = await API.get("/staff/getLead");
  return res.data;
};

export const DeleteLead = async (lead_id) => {
  const res = await API.delete(`/staff/deleteLead/${lead_id}`);
  return res.data;
};

/*---------------------------ONBOARDING FORM-------------------------- */

export const CreateOnBoardingForm = async (onBoardingForm) => {
  try {
    const res = await API.post("/users/createBoardingEmployee", onBoardingForm);
    return res.data;
  } catch (error) {
    // Optional: better error handling
    console.error("❌ Error creating onboarding form:", error);
    throw error; // re-throw so it can be caught in the component
  }
};


// ⬇️ GET single employee onboarding data by ID
export const GetOnBoardingForm = async () => {
  try {
    const res = await API.get(`/users/getBoardingEmployee`);
    return res.data; // { success: true, data: {...} }
  } catch (error) {
    console.error("❌ Error fetching onboarding form:", error?.response?.data || error.message);
    throw error; // rethrow to allow catch block in component to handle
  }
};

export const GetOnBoardingFormById = async (_id) => {
  try {
    const res = await API.get(`/users/getBoardingEmployee/${_id}`);
    return res.data; // { success: true, data: {...} }
  } catch (error) {
    console.error("❌ Error fetching onboarding form:", error?.response?.data || error.message);
    throw error; // rethrow to allow catch block in component to handle
  }
};


/*-----------------------------MANAGE ATTENDENCE------------------- */
export const AddAttendence = async (addattendenceData) => {
  try {
    const res = await API.post("/supreme-admin/bulk-attendence", addattendenceData);
    return res.data;
  } catch (error) {
    // Optional: better error handling
    console.error("❌ Error Adding Attendence :", error);
    throw error; // re-throw so it can be caught in the component
  }
};

export const fetchAttendence = async ({ date, status }) => {
  const supremeAdmin_id = localStorage.getItem("supremeAdmin_id");

  try {
    const res = await API.post(
      `/supreme-admin/filter-attendence/${supremeAdmin_id}`,
      { date, status }
    );
    return res.data;
  } catch (error) {
    console.error("❌ Error Fetching Attendance:", error);
    throw error;
  }
};


