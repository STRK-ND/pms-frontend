import React, { useState, useEffect } from "react";

    // import {
    //   getIncomeExpense,
    //   CreateIncomeExpense,
    //   GetCategories,
    // } from "../../services/authService";

const ProjectPage = () => {
  const [expense, setExpense] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category , setCategory] = useState([])

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
    setCategory(res.data)
    console.log(res.data.forEach(cat => console.log(cat.name)))
  } catch (error) {
    console.error("❌ Error fetching categories:", error.message);
  }
};

useEffect(() =>{
  fetchCategories()
} , [])


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
  
       
      <div className="bg-white shadow rounded pb-2 overflow-x-auto p-3">
        <table className="w-full whitespace-nowrap  text-sm ">
          <thead className="bg-gray-100 border-b">
            <tr>
              {[
                "No",
                "Project Name",
                "Assigned To",
                "Assigned By",
                "Assigned Date",
                "Deadline",
                "Priority",
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
                  <td className="p-2 flex gap-1">
                    <button
                      onClick={() => handleEditClick(e)}
                      className="bg-blue-500 text-white px-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(e._id)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No Project found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  );
};

export default ProjectPage;
