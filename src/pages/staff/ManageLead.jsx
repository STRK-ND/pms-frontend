import React, { useEffect, useState } from "react";
import { createLeads, GetLeads, DeleteLead } from "../../services/authService";
import { FaEdit, FaTrash } from "react-icons/fa";

const LeadForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadData, setLeadData] = useState({
    fullName: "",
    emailId: "",
    mobileNumber: "",
    whatsAppNumber: "",
    purpose: "",
    projectName: "",
    message: "",
    notes: "",
    assignedTo: "",
    status: "New",
    reminder: "",
    source: "",
  });

  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 5;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchLead = async () => {
    try {
      const res = await GetLeads();
      setLeads(res.data); // ✅ fix typo here
    } catch (error) {
      console.log("Error fetching leads:", error.message);
    }
  };

  useEffect(() => {
    fetchLead();
  }, []); // ✅ run only once on component mount
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createLeads(leadData);
      alert("✅ Lead Created Successfully");

      await fetchLead(); // refresh leads from backend

      setLeadData({
        fullName: "",
        emailId: "",
        mobileNumber: "",
        whatsAppNumber: "",
        purpose: "",
        projectName: "",
        message: "",
        notes: "",
        assignedTo: "",
        status: "New",
        reminder: "",
        source: "",
      });

      setIsModalOpen(false); // ✅ Close modal after success
    } catch (error) {
      console.error(
        "❌ Lead creation failed:",
        error?.response?.data?.message || error.message
      );
      alert("❌ Failed to create lead");
    }
  };

  const handleDelete = async (lead_id) => {
    if (!window.confirm("❌ Are you sure you want to delete?")) return;

    try {
      const res = await DeleteLead(lead_id);
      alert("✅ Lead Delete Successfully");
      fetchLead();
    } catch (error) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-2 ">
      {/* Header */}
      <div className="flex justify-end  mb-4 mt-2">
        {/* <h1 className="text-2xl font-bold text-gray-800">Manage Leads</h1> */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition h-9 flex items-center cursor-pointer"
        >
          + Add Lead
        </button>
      </div>

      {/* ====== PROFESSIONAL TABLE ====== */}
      <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200 ">
        <table className="min-w-full text-sm text-left text-gray-700 whitespace-nowrap   ">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr className="text-xs text-gray-600 uppercase tracking-wider">
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">WhatsApp No</th>

              <th className="px-4 py-3">Purpose</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Project Name</th>
              <th className="px-4 py-3">message</th>
              <th className="px-4 py-3">notes</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Reminder</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center  py-4 text-gray-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              currentLeads.map((lead, index) => (
                <tr
                  key={index}
                  className={`border-t ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-4 py-3">{indexOfFirstLead + index + 1}</td>
                  <td className="px-4 py-3 truncate" title={lead.fullName}>
                    {lead.fullName}
                  </td>
                  <td className="px-4 py-3 truncate" title={lead.emailId}>
                    {lead.emailId}
                  </td>
                  <td className="px-4 py-3">{lead.mobileNumber}</td>
                  <td className="px-4 py-3">{lead.whatsAppNumber}</td>

                  <td className="px-4 py-3">{lead.purpose}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === "New"
                          ? "bg-green-100 text-green-700"
                          : lead.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : lead.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{lead.source}</td>
                  <td className="px-4 py-3">{lead.projectName}</td>
                  <td className="px-4 py-3">{lead.message}</td>

                  <td className="px-4 py-3">{lead.notes}</td>
                  <td className="px-4 py-3">{lead.assignedTo}</td>
                  <td className="px-4 py-3">
                    {lead.reminder
                      ? new Date(lead.reminder).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-4 py-4 flex gap-3 items-center">
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(lead)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      title="Edit Lead"
                    >
                      <FaEdit size={16} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(lead.lead_id)}
                      className="text-orange-600 hover:text-orange-800 cursor-pointer "
                      title="Delete Lead"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ====== PAGINATION ====== */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 space-x-1">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-3 py-1 text-sm border rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* ==== MODAL REMAINS SAME - KEEP EXISTING ONE ==== */}
      {/* ====== MODAL FORM ====== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Lead</h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                {
                  name: "fullName",
                  label: "Full Name",
                  placeholder: "Enter full name",
                },
                {
                  name: "emailId",
                  label: "Email ID",
                  placeholder: "Enter email address",
                  type: "email",
                },
                {
                  name: "mobileNumber",
                  label: "Mobile Number",
                  placeholder: "Enter mobile number",
                },
                {
                  name: "whatsAppNumber",
                  label: "WhatsApp Number",
                  placeholder: "Enter WhatsApp number",
                },
                {
                  name: "purpose",
                  label: "Purpose",
                  placeholder: "e.g. Inquiry or Demo",
                },
                {
                  name: "projectName",
                  label: "Project Name",
                  placeholder: "Enter project name",
                },
                {
                  name: "assignedTo",
                  label: "Assigned To (Staff ID)",
                  placeholder: "e.g. 64f89c...",
                  required: true,
                },
                { name: "reminder", label: "Reminder", type: "datetime-local" },
              ].map(({ name, label, placeholder, type = "text", required }) => (
                <div key={name}>
                  <label className="block font-medium">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={leadData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border rounded  focus:ring focus:ring-blue-300 outline-none"
                    required={required}
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="block font-medium">Message</label>
                <textarea
                  name="message"
                  placeholder="Enter a short message"
                  value={leadData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded  focus:ring focus:ring-blue-300 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-medium">Notes</label>
                <textarea
                  name="notes"
                  placeholder="Additional notes about this lead"
                  value={leadData.notes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded  focus:ring focus:ring-blue-300 outline-none"
                />
              </div>

              <div>
                <label className="block font-medium">Status</label>
                <select
                  name="status"
                  value={leadData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded  focus:ring focus:ring-blue-300 outline-none"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">source</label>
                <input
                  type="text"
                  name="source"
                  placeholder="e.g. Website, LinkedIn"
                  className="w-full px-3 py-2 border rounded  focus:ring focus:ring-blue-300 outline-none"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer h-9 flex items-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 cursor-pointer h-9 flex items-center"
                >
                  Submit Lead
                </button>
              </div>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-2xl text-gray-600 font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadForm;
