import React, { useState } from "react";

export default function StaffTaskManager() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) return alert("Title and Due Date required");

    const newTask = {
      ...formData,
      id: Date.now(),
      status: "Pending",
    };

    setTasks((prev) => [...prev, newTask]);
    setFormData({ title: "", description: "", dueDate: "" });
  };

  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="w-full mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">📝 Staff Task Manager</h2>

      {/* Task Form */}
      <form onSubmit={handleAddTask} className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1 text-sm text-gray-700 font-medium">Task Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter title"
           className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Due Date */}
        <div className="flex flex-col">
          <label htmlFor="dueDate" className="mb-1 text-sm text-gray-700 font-medium">Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleInputChange}
            className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 text-sm text-gray-700 font-medium">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Short description"
           className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200 h-8 flex justify-center items-center cursor-pointer"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Task Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No tasks available.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{task.description || "-"}</td>
                  <td className="p-3">{task.dueDate}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => toggleStatus(task.id)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
