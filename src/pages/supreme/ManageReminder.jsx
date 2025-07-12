// ProjectForm.jsx
import React, { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [assignees, setAssignees] = useState([
    { name: "", email: "" }
  ]);

  const handleAssigneeChange = (index, field, value) => {
    const updated = [...assignees];
    updated[index][field] = value;
    setAssignees(updated);
  };

  const addAssignee = () => {
    setAssignees([...assignees, { name: "", email: "" }]);
  };

  const removeAssignee = (index) => {
    const updated = [...assignees];
    updated.splice(index, 1);
    setAssignees(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/projects", {
        projectName,
        deadline,
        assignees,
      });

      alert("✅ Project created successfully");
      console.log(response.data);
    } catch (err) {
      alert("❌ Failed to create project");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[480px] mx-auto p-4 shadow-md rounded bg-white space-y-4 mt-7">
      <h2 className="text-xl font-semibold flex justify-center" >Create Project Reminder</h2>

      <div>
        <label className="block font-medium">Project Name</label>
        <input
          type="text"
         className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300 w-full"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Deadline</label>
        <input
          type="date"
         className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300 w-full"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Assignees</label>
        {assignees.map((assignee, index) => (
          <div key={index} className="flex flex-col items-center gap-2 mb-2 ">
            <input
              type="text"
              placeholder="Name"
              value={assignee.name}
              onChange={(e) => handleAssigneeChange(index, "name", e.target.value)}
             className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300 w-full"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={assignee.email}
              onChange={(e) => handleAssigneeChange(index, "email", e.target.value)}
             className="border px-3 py-2 rounded outline-none focus:ring focus:ring-blue-300 w-full"
              required
            />
            {assignees.length > 1 && (
              <button
                type="button"
                onClick={() => removeAssignee(index)}
                className="text-red-600 font-bold cursor-pointer "
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addAssignee}
          className="text-gray-600 mt-1 border rounded cursor-pointer w-[140px] h-8 "
        >
          + Add Assignee
        </button>
      </div>

      <button
        type="submit"
        className="bg-gray-600 cursor-pointer flex justify-center items-center w-full h-8 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Submit Reminder
      </button>
    </form>
  );
};

export default ProjectForm;
