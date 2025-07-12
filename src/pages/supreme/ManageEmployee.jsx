import React, { useState, useEffect } from "react";
import { CreateStaff, getAllStaff } from "../../services/authService";
import { FaEdit, FaTrash } from "react-icons/fa";

const AddStaffForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [staffList, setStaffList] = useState([]);
  const [activeField, setActiveField] = useState("incentive");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    whatsAppNumber: "",
    salaryPayout: "Monthly",
    incentive: "",
    fixedAmount: "",
    salary: "",
    salaryCycle: "1 to 1 Every month",
    openingBalance: "0",
    balanceType: "To Pay",
    department: "",
  });

  const fetchStaffs = async () => {
    try {
      const response = await getAllStaff();
      setStaffList(response.data);
    } catch (err) {
      console.error("❌ Fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocus = (fieldName) => {
    if (activeField !== fieldName) {
      setActiveField(fieldName);
      setFormData((prev) => ({
        ...prev,
        incentive: fieldName === "fixedAmount" ? "" : prev.incentive,
        fixedAmount: fieldName === "incentive" ? "" : prev.fixedAmount,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await CreateStaff(formData);
      setStaffList((prev) => [...prev, res.data]);
      alert("✅ Staff Created Successfully");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        whatsAppNumber: "",
        salaryPayout: "Monthly",
        salary: "",
        salaryCycle: "1 to 1 Every month",
        openingBalance: "0",
        balanceType: "To Pay",
        department: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("❌ Error creating staff:", error.message);
      alert("Something went wrong.");
    }
  };

  const handleEdit = (id) => {
    // Placeholder: Implement edit logic (e.g., fetch staff data, populate form)
    alert(`Edit staff with ID: ${id} (Not implemented)`);
  };

  const handleDelete = (id) => {
    // Placeholder: Implement delete logic
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      alert(`Delete staff with ID: ${id} (Not implemented)`);
    }
  };

  const filteredData = staffList.filter((item) => {
    const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "inline-flex px-3 py-1 text-xs font-semibold text-green-700 bg-green-50 rounded-full";
      case "inactive":
        return "inline-flex px-3 py-1 text-xs font-semibold text-red-700 bg-red-50 rounded-full";
      default:
        return "inline-flex px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-50 rounded-full";
    }
  };

  return (
    <div className="max-w-full mx-auto p-4 ">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row  justify-between items-start sm:items-center gap-4 mb-6">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="px-4 py-2 bg-gray-600 cursor-pointer text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-teal-700 transition-colors"
        >
          {showForm ? "Close Form" : "Add Staff"}
        </button>
        {/* <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Manage Staff</h1> */}

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-between">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
            Add Staff
          </h2>
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            {[
              ["firstName", "First Name", "text"],
              ["lastName", "Last Name", "text"],
              ["email", "Email", "email"],
              ["password", "Password", "password"],
              ["mobileNumber", "Mobile Number", "tel"],
              ["whatsAppNumber", "WhatsApp Number", "tel"],
            ].map(([name, label, type]) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label}`}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Payout Type
              </label>
              <select
                name="salaryPayout"
                value={formData.salaryPayout}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {["Monthly", "Half Yearly", "Quarterly", "Weekly", "Daily"].map(
                  (opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <span className="text-gray-500 mr-2">₹</span>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="20000"
                  className="w-full border-0 focus:outline-none text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Cycle
              </label>
              <select
                name="salaryCycle"
                value={formData.salaryCycle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="1 to 1 Every month">1 to 1 Every month</option>
                <option value="15 to 15 Every month">
                  15 to 15 Every month
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select Department</option>
                <option value="Sales">Sales</option>
                <option value="Development">Development</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Outstanding/Opening Balance
              </label>
              <div className="flex gap-2">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full">
                  <span className="text-gray-500 mr-2">₹</span>
                  <input
                    type="number"
                    name="openingBalance"
                    value={formData.openingBalance}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full border-0 focus:outline-none text-sm"
                  />
                </div>
                <select
                  name="balanceType"
                  value={formData.balanceType}
                  onChange={handleChange}
                  className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="To Pay">To Pay</option>
                  <option value="To Receive">To Receive</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 col-span-full">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Incentive
                </label>
                <div className="flex">
                  <input
                    type="number"
                    name="incentive"
                    value={formData.incentive}
                    onChange={handleChange}
                    onFocus={() => handleFocus("incentive")}
                    placeholder="0"
                    className={`w-full border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      activeField !== "incentive"
                        ? "bg-gray-50 text-gray-400"
                        : ""
                    }`}
                  />
                  <span className="flex items-center border border-l-0 border-gray-300 rounded-r-lg px-3 py-2 text-gray-500">
                    %
                  </span>
                </div>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fixed Amount
                </label>
                <div className="flex">
                  <span className="flex items-center border border-r-0 border-gray-300 rounded-l-lg px-3 py-2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="fixedAmount"
                    value={formData.fixedAmount}
                    onChange={handleChange}
                    onFocus={() => handleFocus("fixedAmount")}
                    placeholder="0"
                    className={`w-full border border-l-0 border-gray-300 rounded-r-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                      activeField !== "fixedAmount"
                        ? "bg-gray-50 text-gray-400"
                        : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table Section */}
      {staffList.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700 whitespace-nowrap">
            <thead className="bg-gray-50 text-left sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm">
                  No
                </th>
                <th className="px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm">
                  Name
                </th>
                <th className="px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm">
                  Email
                </th>
                <th className="px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm">
                  Mobile
                </th>
                {/* <th className="px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm hidden sm:table-cell">
                  WhatsApp
                </th> */}
                <th className="px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm hidden md:table-cell">
                  Salary Type
                </th>
                <th className="px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm hidden lg:table-cell">
                  Salary Cycle
                </th>
                <th className="px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm">
                  Salary
                </th>
                {/* <th className="px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm">
                  Status
                </th> */}
                <th className="px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.length > 0 ? (
                currentItems.map((staff, index) => (
                  <tr key={staff._id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-xs sm:text-sm">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm">{`${staff.firstName} ${staff.lastName}`}</td>
                    <td className="px-4 py-3 text-xs sm:text-sm">
                      {staff.email}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm">
                      {staff.mobileNumber}
                    </td>
                    {/* <td className="px-4 py-3 text-xs sm:text-sm hidden sm:table-cell">
                      {staff.whatsAppNumber}
                    </td> */}
                    <td className="px-4 py-3 text-xs sm:text-sm hidden md:table-cell">
                      {staff.salaryPayout}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm hidden lg:table-cell">
                      {staff.salaryCycle}
                    </td>
                    <td className="px-4 py-3 text-xs sm:text-sm">
                      ₹{staff.salary}
                    </td>
                    {/* <td className="px-4 py-3 text-xs sm:text-sm">
                      <span className={getStatusBadgeClass(staff.status)}>
                        {staff.status}
                      </span>
                    </td> */}
                    <td className="px-4 py-3 text-xs sm:text-sm">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(staff._id)}
                          className="text-yellow-500 hover:text-yellow-600 transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(staff._id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="text-center text-gray-500 py-6 text-sm"
                  >
                    No staff found matching the filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-3 py-1 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50 text-sm"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded-lg text-sm ${
                currentPage === index + 1
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50 text-sm"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default AddStaffForm;
