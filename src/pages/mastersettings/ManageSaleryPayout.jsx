import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit , faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {
  CreateSalary,
  GetSalary,
  DeleteSalary
} from "../../services/authService";

const ManageSaleryPayOut = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [saleryPayOut, setSaleryPayOut] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    status: "active",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchCategories = async () => {
    try {
      const res = await GetSalary();
      setSaleryPayOut(res.data);
    } catch (error) {
      console.log("❌ Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await UpdateCategory(editId, formData);
      } else {
        const res = await CreateSalary(formData);
        setSaleryPayOut(res.data)
        alert("✅ Priority Added Successfull")
      }
      fetchCategories();
      setShowModal(false);
      setFormData({ name: "", status: "active" });
      setIsEditMode(false);
      setEditId(null);
    } catch (err) {
      console.error("❌ Save Error:", err.message);
      alert("Something went wrong.");
    }
  };

  const handleDelete = async (salary_id) => {
  if (!window.confirm("🗑️ Are you sure you want to delete this record?")) return;

    try {
      await DeleteSalary(salary_id);
      alert("✅ Salery Deleted Successfully")
      fetchCategories();
    } catch (error) {
      console.error("❌ Delete Error:", error.message);
      alert("Something went wrong while deleting.");
    }
  };

  const filteredData = saleryPayOut.filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
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
        return "inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full";
      case "inactive":
        return "inline-block px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full";
      default:
        return "inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full";
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <button
          onClick={() => {
            setShowModal(true);
            setIsEditMode(false);
            setFormData({ name: "", status: "active" });
          }}
          className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Add Salery
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-40"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg p-4">
        <table className="w-full border border-gray-200 rounded-md">
          <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={item._id} className="border-b">
                  <td className="px-6 py-3 text-center">{indexOfFirstItem + index + 1}</td>
                  <td className="px-6 py-3 text-center">{item.name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={getStatusBadgeClass(item.status)}>{item.status}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        // className="text-yellow-500 hover:text-yellow-700"
                        title="Edit"
                        onClick={() => {
                          setFormData({ name: item.name, status: item.status });
                          setEditId(item._id);
                          setIsEditMode(true);
                          setShowModal(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} className="text-yellow-500 hover:text-yellow-700 p-1" />

                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                        onClick={() => handleDelete(item.salary_id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} className="text-orange-500 hover:text-red-700 cursor-pointer p-1" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-6">
                  No categories found matching the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-teal-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="bg-white rounded-lg w-full max-w-xl shadow-lg border">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                {isEditMode ? "Edit Category" : "Add Salery"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form id="categoryForm" onSubmit={handleFormSubmit}>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Salery Pay Out"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-teal-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end p-4 border-t space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="cursor-pointer px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="categoryForm"
                  className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                  {isEditMode ? "Update Category" : "Add Salery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSaleryPayOut;