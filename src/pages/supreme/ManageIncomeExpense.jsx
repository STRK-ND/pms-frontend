import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

import {
  getIncomeExpense,
  CreateIncomeExpense,
  GetCategories,
} from "../../services/authService";

const ProjectPage = () => {
  const [expense, setExpense] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState([]);

  const [expenseData, setExpenseData] = useState({
    amount: "",
    category: "",
    note: "",
    vendor: "",
    bill: null,
    repeatType: "",
    status: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setExpenseData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setExpenseData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await GetCategories();
      setCategory(res.data);
      console.log(res.data.forEach((cat) => console.log(cat.name)));
    } catch (error) {
      console.error("❌ Error fetching categories:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchIncomeExpense = async () => {
    try {
      const response = await getIncomeExpense();
      setExpense(response.data);
    } catch (err) {
      console.error("❌ Fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchIncomeExpense();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // const formData = new FormData();
      // Object.entries(expenseData).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });

      // const response = await fetch("http://localhost:5000/api/expenses", {
      //   method: "POST",
      //   body: formData,
      // });

      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message || "Upload failed");

      const res = await CreateIncomeExpense(expenseData);
      console.log(res, "frontend data");
      alert("✅ Expense added successfully");
      setExpense(res.data);

      setShowForm(false);
      window.location.reload();
      setExpenseData({
        amount: "",
        category: "",
        note: "",
        vendor: "",
        bill: null,
        repeatType: "",
        status: "",
        dueDate: "",
      });
    } catch (err) {
      console.error("❌ Submit error:", err.message);
      setError("Submission failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (item) => {
    setExpenseData(item);
    setShowForm(true);
  };

  const handleDeleteUser = async (id) => {
    // TODO: Implement deleteProject API
  };

  return (
    <div className="space-y-1 p-3">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 mt-2 p-2 ">
          Add Income Expense
        </h2>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Expense"}
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 shadow rounded"
        >
          {[
            {
              name: "amount",
              label: "Amount",
              type: "number",
              placeholder: "Enter expense ",
            },
            {
              name: "vendor",
              label: "Vendor",
              type: "text",
              placeholder: "Enter Vendor",
            },
            { name: "dueDate", label: "Due Date", type: "date" },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name} className="flex flex-col">
              <label className="capitalize font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={expenseData[name] || ""}
                onChange={handleChange}
                placeholder={placeholder}
                className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label>Category</label>
            <select
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Category</option>
              {category.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label>Repeat Type</label>
            <select
              name="repeatType"
              value={expenseData.repeatType}
              onChange={handleChange}
              className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Repeat Type</option>
              {[
                "One Time",
                "Every day",
                "Every Week",
                "Every Month",
                "Every Year",
              ].map((req) => (
                <option key={req} value={req}>
                  {req}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col col-span-1">
            <label>Upload Bill</label>
            <input
              type="file"
              name="bill"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>Status</label>
            <select
              name="status"
              value={expenseData.status}
              onChange={handleChange}
              className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Status</option>
              {["Pending", "Ongoing", "Completed", "On Hold", "Cancelled"].map(
                (status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex col-span-full flex-col">
            <label className="mb-1 font-medium">Notes</label>
            <textarea
              name="note"
              value={expenseData.note}
              onChange={handleChange}
              className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
              rows="4"
              placeholder="Enter your message"
            />
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              className="w-full bg-gray-700 cursor-pointer h-7 flex items-center justify-center text-white py-2 rounded hover:bg-gray-800"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Expense"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white shadow rounded pb-2 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 border-b">
            <tr>
              {[
                "No",
                "Amount",
                "Category",
                "Vendor",
                "Due Date",
                "Bill",
                "Repeat Type",
                "Note",
                "Status",
                "Action",
              ].map((header) => (
                <th key={header} className="p-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expense.length > 0 ? (
              expense.map((e, index) => (
                <tr key={e._id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{e.amount}</td>
                  <td className="p-2">{e.category}</td>
                  <td className="p-2">{e.vendor}</td>
                  <td className="p-2">
                    {e.dueDate
                      ? new Date(e.dueDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-2">
                    {e.bill ? (
                      <a
                        href={`http://localhost:5000/uploads/${e.bill}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Bill
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td>
                  <td className="p-2">{e.repeatType}</td>
                  <td className="p-2">{e.status}</td>
                  <td className="p-2">{e.note}</td>
                  <td
                    className="px-4 py-3 flex gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => handleEdit(emp._id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit className="inline-block mr-1 cursor-pointer" />
                    </button> 

                    <button
                      onClick={() => handleDeleteUser(emp._id)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      <FaTrash className="inline-block mr-1 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No Expense found.
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
