import React, { useState, useEffect, useRef } from "react";
import { CreateProject, getProjects, GetPriorityies, getAllStaff,  } from "../../services/authService";
import { FaChevronDown, FaEdit, FaTrash } from "react-icons/fa";

const ProjectPage = () => {
  const [project, setProject] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priority, setPriority] = useState([]);
  const [projectData, setProjectData] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    rate: "",
    priceType: "",
    required: "",
    invoiceTime: "",
    priority: "",
    message: "",
    productmanager: [],
    assignteam: [],
    salesperson: [],
    status: "",
  });

  const fetchPriorities = async () => {
    try {
      const res = await GetPriorityies();
      setPriority(res.data);
    } catch (error) {
      console.log("❌ Priority fetch error:", error.message);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProject(response.data);
    } catch (err) {
      console.error("❌ Fetch error:", err.message);
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await getAllStaff();
      setEmployeeList(response.data);
    } catch (err) {
      console.error("❌ Fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchPriorities();
    fetchProjects();
    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await CreateProject(projectData);
      setProject((prev) => [...prev, response.data]);
      alert("✅ Project Created Successfully");
      setShowForm(false);
      setProjectData({
        projectName: "",
        startDate: "",
        endDate: "",
        rate: "",
        priceType: "",
        required: "",
        invoiceTime: "",
        priority: "",
        message: "",
        productmanager: [],
        assignteam: [],
        salesperson: [],
        status: "",
      });
    } catch (err) {
      console.error("❌ Submit error:", err.message);
      setError("Submission failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (projectItem) => {
    setProjectData(projectItem);
    setShowForm(true);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProject((prev) => prev.filter((p) => p._id !== id));
      alert("✅ Project deleted successfully");
    } catch (err) {
      console.error("❌ Delete error:", err.message);
      alert("Something went wrong while deleting.");
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const updated = await updateProjectStatus(id);
      setProject((prev) => prev.map((p) => (p._id === id ? updated.data : p)));
    } catch (err) {
      console.error("❌ Status toggle error:", err.message);
    }
  };

  const salesOptions = ["Fixed", "Hourly", "Monthly", "Milestone"];
  const assignTeamOptions = ["Frontend", "Backend", "UI/UX", "QA", "DevOps"];
  const statusOptions = ["Pending", "Ongoing", "Completed", "On Hold", "Cancelled"];
  const requirementOptions = ["UI/UX Design", "Payment System"];
  const invoiceTimeOptions = ["Weekly", "Biweekly", "Monthly", "End of project"];

  // Dropdown states and refs
  const [showSalesDropdown, setShowSalesDropdown] = useState(false);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [showPMDropdown, setShowPMDropdown] = useState(false);
  const salesDropdownRef = useRef();
  const assignDropdownRef = useRef();
  const pmDropdownRef = useRef();

  const handleSalespersonToggle = (value) => {
    setProjectData((prev) => {
      const exists = prev.salesperson.includes(value);
      return {
        ...prev,
        salesperson: exists ? prev.salesperson.filter((v) => v !== value) : [...prev.salesperson, value],
      };
    });
  };

  const handleAssignToggle = (value) => {
    setProjectData((prev) => {
      const exists = prev.assignteam.includes(value);
      return {
        ...prev,
        assignteam: exists ? prev.assignteam.filter((v) => v !== value) : [...prev.assignteam, value],
      };
    });
  };

  const handleProductManagerToggle = (value) => {
    setProjectData((prev) => ({
      ...prev,
      productmanager: prev.productmanager.includes(value) ? prev.productmanager.filter((v) => v !== value) : [...prev.productmanager, value],
    }));
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !salesDropdownRef.current?.contains(e.target) &&
        !assignDropdownRef.current?.contains(e.target) &&
        !pmDropdownRef.current?.contains(e.target)
      ) {
        setShowSalesDropdown(false);
        setShowAssignDropdown(false);
        setShowPMDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Manage Projects</h2> */}
        <button
          className="px-4 py-2 bg-gray-600 cursor-pointer text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Project"}
        </button>
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-6">
          {[
            { name: "projectName", label: "Project Name", type: "text" },
            { name: "startDate", label: "Start Date", type: "date" },
            { name: "endDate", label: "End Date", type: "date" },
            { name: "rate", label: "Rate", type: "number" },
          ].map(({ name, label, type }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={projectData[name] || ""}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          ))}

          {[
            { name: "priceType", options: salesOptions, label: "Price Type" },
            { name: "required", options: requirementOptions, label: "Required" },
            { name: "invoiceTime", options: invoiceTimeOptions, label: "Invoice Time" },
            { name: "status", options: statusOptions, label: "Status" },
          ].map(({ name, options, label }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
              <select
                name={name}
                value={projectData[name]}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="">Select {label}</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={projectData.priority}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Priority</option>
              {priority.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col relative" ref={pmDropdownRef}>
            <label className="text-sm font-medium text-gray-700 mb-1">Product Manager</label>
            <button
              type="button"
              onClick={() => setShowPMDropdown(!showPMDropdown)}
              className="relative border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {projectData.productmanager.length > 0 ? projectData.productmanager.join(", ") : "Select Product Manager"}
              <FaChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs transition-transform ${showPMDropdown ? "rotate-180" : ""}`} />
            </button>
            {showPMDropdown && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
                {employeeList.map((option) => {
                  const fullName = `${option.firstName} ${option.lastName}`;
                  return (
                    <label key={option._id} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        value={fullName}
                        checked={projectData.productmanager.includes(fullName)}
                        onChange={() => handleProductManagerToggle(fullName)}
                        className="mr-2"
                      />
                      {fullName}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col relative" ref={assignDropdownRef}>
            <label className="text-sm font-medium text-gray-700 mb-1">Assign Team</label>
            <button
              type="button"
              onClick={() => setShowAssignDropdown(!showAssignDropdown)}
              className="relative border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {projectData.assignteam.length > 0 ? projectData.assignteam.join(", ") : "Select Assign Team"}
              <FaChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs transition-transform ${showAssignDropdown ? "rotate-180" : ""}`} />
            </button>
            {showAssignDropdown && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
                {assignTeamOptions.map((option) => (
                  <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      value={option}
                      checked={projectData.assignteam.includes(option)}
                      onChange={() => handleAssignToggle(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col relative" ref={salesDropdownRef}>
            <label className="text-sm font-medium text-gray-700 mb-1">Sales Person</label>
            <button
              type="button"
              onClick={() => setShowSalesDropdown(!showSalesDropdown)}
              className="relative border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {projectData.salesperson.length > 0 ? projectData.salesperson.join(", ") : "Select Sales Person"}
              <FaChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs transition-transform ${showSalesDropdown ? "rotate-180" : ""}`} />
            </button>
            {showSalesDropdown && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
                {employeeList.map((option) => {
                  const fullName = `${option.firstName} ${option.lastName}`;
                  return (
                    <label key={option._id} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        value={fullName}
                        checked={projectData.salesperson.includes(fullName)}
                        onChange={() => handleSalespersonToggle(fullName)}
                        className="mr-2"
                      />
                      {fullName}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex col-span-full flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={projectData.message}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
              placeholder="Enter your message"
            />
          </div>

          <div className="col-span-full flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-semibold rounded-lg text-white ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700 cursor-pointer"} transition-colors`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Project"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto mt-6">
        <table className="min-w-full text-sm text-gray-700 whitespace-nowrap">
          <thead className="bg-gray-50 text-left sticky top-0 z-10">
            <tr>
              {[
                { label: "No", visible: true },
                { label: "Name", visible: true },
                { label: "Start", visible: true },
                { label: "End", visible: true },
                { label: "Rate", visible: "sm" },
                { label: "Price Type", visible: "md" },
                { label: "Priority", visible: "sm" },
                { label: "Required", visible: "lg" },
                { label: "Invoice Time", visible: "lg" },
                { label: "Message", visible: "xl" },
                { label: "Product Manager", visible: "md" },
                { label: "Sales Team", visible: "lg" },
                { label: "Assign Team", visible: "lg" },
                { label: "Status", visible: true },
                { label: "Actions", visible: true },
              ].map(({ label, visible }) => (
                <th key={label} className={`px-4 py-3 font-semibold text-gray-800 text-xs sm:text-sm ${visible !== true ? `hidden ${visible}:table-cell` : ""}`}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {project.length > 0 ? (
              project.map((p, index) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs sm:text-sm">{index + 1}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm">{p.projectName}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm">{new Date(p.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm">{new Date(p.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm hidden sm:table-cell">{p.rate}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm hidden md:table-cell">{p.priceType}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm hidden sm:table-cell">{p.priority}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm hidden lg:table-cell">{p.required}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm hidden lg:table-cell">{p.invoiceTime}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm hidden xl:table-cell">{p.message}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm hidden md:table-cell">{p.productmanager.join(", ")}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm hidden lg:table-cell">{p.salesperson.join(", ")}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm hidden lg:table-cell">{p.assignteam.join(", ")}</td>
                  <td className="px-4 py-3 text-xs sm:text-sm">
                    <button
                      onClick={() => handleToggleStatus(p._id)}
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        p.status === "Completed" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-xs sm:text-sm">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditClick(p)}
                        className="text-yellow-500 hover:text-yellow-600 transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(p._id)}
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
                <td colSpan="15" className="text-center text-gray-500 py-6 text-sm">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectPage;