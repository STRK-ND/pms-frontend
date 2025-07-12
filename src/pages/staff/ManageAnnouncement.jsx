import React, { useState } from "react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const openModal = () => {
    setFormData({ title: "", message: "" });
    setEditingIndex(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setFormData({ title: "", message: "" });
    setEditingIndex(null);
    setModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString();

    if (editingIndex !== null) {
      const updated = [...announcements];
      updated[editingIndex] = {
        ...formData,
        date: updated[editingIndex].date,
      };
      setAnnouncements(updated);
    } else {
      setAnnouncements((prev) => [
        ...prev,
        { ...formData, date: currentDate },
      ]);
    }

    closeModal();
  };

  const handleEdit = (index) => {
    setFormData(announcements[index]);
    setEditingIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = announcements.filter((_, i) => i !== index);
    setAnnouncements(updated);
  };

  return (
    <div className="relative p-4">
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-3xl font-bold text-gray-800">📢 Announcements</h1> */}
        <button
          onClick={openModal}
          className="bg-gray-600 hover:bg-gray-700 cursor-pointer text-white px-4 py-2 rounded-md text-sm shadow-sm"
        >
          + Add Announcement
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Message</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length > 0 ? (
              announcements.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4">{item.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.date).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-yellow-500 hover:text-yellow-600"
                        title="Edit"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-6 text-center text-gray-400 text-sm"
                >
                  No announcements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
       <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit Announcement" : "New Announcement"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-100"
                  rows={4}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
                >
                  {editingIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
