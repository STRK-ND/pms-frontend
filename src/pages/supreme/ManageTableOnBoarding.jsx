import React, { useEffect, useState } from "react";
import {
  GetOnBoardingForm,
  GetOnBoardingFormById,
} from "../../services/authService";
import { FaEdit, FaTrash } from "react-icons/fa";

const EmployeeTable = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetOnBoardingForm();
        if (res?.data && Array.isArray(res.data)) {
          setEmployeeList(res.data);
        } else {
          setError("No employee data found");
        }
      } catch (err) {
        console.error("Error fetching employee data", err);
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewDetails = async (_id) => {
    try {
      const res = await GetOnBoardingFormById(_id);
      setSelectedEmployee(res?.data || res);
      setShowModal(true);
    } catch (error) {
      console.error("❌ Failed to fetch employee details:", error);
    }
  };

  const handleEdit = (_id) => {
    console.log("Edit", _id);
    // Navigate or open edit modal
  };

  const handleDelete = (_id) => {
    console.log("Delete", _id);
    // Add confirmation and delete logic
  };

  const fieldSections = [
    {
      title: "Personal Details",
      fields: [
        "employee_id",
        "employeeName",
        "gender",
        "designation",
        "doj",
        "department",
        "dob",
        "email",
        "mobileNo",
        "aadharNo",
        "panNo",
        "joiningLocation",
      ],
    },
    {
      title: "Address & Salary",
      fields: ["presentAddress", "permanentAddress", "annualCtc", "epfSalary"],
    },
    {
      title: "Marital Information",
      fields: ["maritalStatus", "spouseName", "fatherName", "husbandName"],
    },
    {
      title: "Nominee Details",
      fields: ["nomineeName", "nomineeDob", "nomineeAadhar", "nomineeRelation"],
    },
    {
      title: "Bank Details",
      fields: [
        "nameInBank",
        "bankAccountNumber",
        "bankName",
        "branchName",
        "ifscCode",
      ],
    },
    {
      title: "Other Details",
      fields: ["uanNo", "previousPfNumber", "esiNo", "esicDispensary"],
    },
  ];

  return (
    <>
      <div className="overflow-x-auto bg-white rounded shadow-md mt-6">
        {loading ? (
          <div className="text-center py-6 text-gray-500">
            Loading employees...
          </div>
        ) : error ? (
          <div className="text-center py-6 text-red-500">{error}</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">No</th>
                <th className="px-4 py-3 font-semibold">Employee ID</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Designation</th>
                <th className="px-4 py-3 font-semibold">DOJ</th>
                <th className="px-4 py-3 font-semibold">Joining Location</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employeeList.map((emp, index) => (
                <tr
                  key={emp._id || index}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewDetails(emp._id)}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{emp.employee_id}</td>
                  <td className="px-4 py-3">{emp.employeeName}</td>
                  <td className="px-4 py-3">{emp.designation}</td>
                  <td className="px-4 py-3">{emp.doj}</td>
                  <td className="px-4 py-3">{emp.joiningLocation}</td>
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
                      onClick={() => handleDelete(emp._id)}
                      className="text-orange-600 hover:text-orange-800"
                    >
                      <FaTrash className="inline-block mr-1 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
              {employeeList.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-4 text-center text-gray-500"
                    colSpan="7"
                  >
                    No employee records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ✅ Employee Detail Modal */}
      {showModal && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-5xl p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Employee Onboarding Details
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-red-500 font-bold text-xl cursor-pointer"
              >
                ×
              </button>
            </div>

            <form className="space-y-6">
              {fieldSections.map((section, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2  h-10 rounded flex justify-start items-center bg-amber-10 border-l-4 border-gray-600 p-3 bg-[whitesmoke] ">
                    {section.title}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                    {section.fields.map((key) => (
                      <div key={key}>
                        <label className="block text-gray-600 font-medium mb-1 capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                          type="text"
                          value={
                            selectedEmployee?.[key] !== undefined &&
                            selectedEmployee[key] !== ""
                              ? selectedEmployee[key]
                              : "N/A"
                          }
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 text-gray-800"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeTable;
