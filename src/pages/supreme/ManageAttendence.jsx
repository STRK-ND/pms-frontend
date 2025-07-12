import React, { useState, useEffect, useRef } from "react";
import {
  getAllStaff,
  AddAttendence,
  fetchAttendence,
} from "../../services/authService";
import { FaCalendarAlt } from "react-icons/fa";

function ManageAttendence() {
  const [counts, setCounts] = useState({});
  const [attendence, setAttendence] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const dateInputRef = useRef(null);

  const fetchEmployee = async () => {
    try {
      const res = await getAllStaff();
      setAttendence(res.data);
    } catch (error) {
      console.error("❌ Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const fetchAttendences = async () => {
    try {
      const supremeAdmin_id = localStorage.getItem("supremeAdmin_id");

      const res = await fetchAttendence({
        date: selectedDate,
        supremeAdmin_id,
      });

      const attendanceArray = res.data || [];

      const newCounts = {
        Present: 0,
        Absent: 0,
        "Half Day": 0,
        "Paid Leave": 0,
        "Week Leave": 0,
      };

      const newAttendanceData = {};

      for (const record of attendanceArray) {
        const label = statusLabel(record.status);
        newCounts[label]++;
        newAttendanceData[record.staff_id._id] = {
          staffId: record.staff_id._id,
          date: record.date,
          status: label,
        };
      }

      setCounts(newCounts);
      setAttendanceData(newAttendanceData);
    } catch (error) {
      console.error("❌ Error fetching attendance counts", error);
    }
  };

  useEffect(() => {
    fetchAttendences();
  }, [selectedDate]);

  const formatDate = (dateStr) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString("en-IN", options);
  };

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleAttendanceChange = (staffId, status) => {
    setAttendanceData((prev) => ({
      ...prev,
      [staffId]: { staffId, date: selectedDate, status },
    }));
  };

  const submitAttendance = async (e) => {
    e.preventDefault();
    const supremeAdmin_id = localStorage.getItem("supremeAdmin_id");

    const records = Object.values(attendanceData).map((record) => ({
      staff_id: record.staffId,
      date: record.date,
      status: statusCode(record.status),
    }));

    if (!records.length || !supremeAdmin_id) {
      alert("❌ Cannot submit: required fields missing.");
      return;
    }

    try {
      const res = await AddAttendence({ supremeAdmin_id, records });
      alert("✅ Attendance submitted successfully!");
    } catch (error) {
      console.error("❌ Error submitting attendance:", error.message);
      alert("❌ Submission failed.");
    }
  };

  // ✅ Converts status label to enum
  const statusCode = (label) => {
    switch (label) {
      case "Present":
        return "P";
      case "Absent":
        return "A";
      case "Half Day":
        return "HD";
      case "Paid Leave":
        return "PL";
      case "Week Leave":
        return "WL";
      default:
        return "A";
    }
  };

  // ✅ Converts enum to status label
  const statusLabel = (code) => {
    switch (code) {
      case "P":
        return "Present";
      case "A":
        return "Absent";
      case "HD":
        return "Half Day";
      case "PL":
        return "Paid Leave";
      case "WL":
        return "Week Leave";
      default:
        return "Absent";
    }
  };

  return (
    <>
      <form onSubmit={submitAttendance}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between rounded items-center gap-4 mb-6 border bg-white">
          <div className="rounded px-4 py-2 flex items-center gap-2">
            <FaCalendarAlt className="text-gray-600 text-lg" />
            <h2 className="text-base font-medium text-gray-800">
              {formatDate(selectedDate)}
            </h2>
          </div>

          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              ref={dateInputRef}
              className="absolute opacity-0 w-0 h-0"
            />
            <button
              type="button"
              onClick={handleIconClick}
              className="flex items-center gap-2 text-gray-600 font-bold px-4 py-2 cursor-pointer hover:text-blue-700 transition"
            >
              CHANGE DATE
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8  ">
          <Card title="Present (P)" value={counts["Present"] || 0} color="green" />
          <Card title="Absent (A)" value={counts["Absent"] || 0} color="red" />
          <Card title="Half Day (HD)" value={counts["Half Day"] || 0} color="yellow" />
          <Card title="Paid Leave (PL)" value={counts["Paid Leave"] || 0} color="blue" />
          <Card title="Week Leave (WL)" value={counts["Week Leave"] || 0} color="gray" />
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto bg-white rounded shadow-md mt-6">
          <table className="min-w-full divide-y divide-gray-200 text-sm whitespace-nowrap text-gray-700">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">No</th>
                <th className="px-4 py-3 font-semibold">Employee ID</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {attendence.map((emp, index) => (
                <tr key={emp._id || index} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{emp.staff_id}</td>
                  <td className="px-4 py-3">
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="py-2">
                    <div className="grid grid-cols-5 gap-1 w-auto">
                      {[
                        { code: "P", label: "Present", color: "text-green-600", bg: "bg-green-100" },
                        { code: "A", label: "Absent", color: "text-red-600", bg: "bg-red-100" },
                        { code: "HD", label: "Half Day", color: "text-yellow-600", bg: "bg-yellow-100" },
                        { code: "PL", label: "Paid Leave", color: "text-blue-600", bg: "bg-blue-100" },
                        { code: "WL", label: "Week Leave", color: "text-gray-600", bg: "bg-gray-200" },
                      ].map((opt) => {
                        const isSelected = attendanceData[emp._id]?.status === opt.label;
                        return (
                          <label
                            key={opt.code}
                            className={`flex items-center justify-center border p-2 rounded cursor-pointer transition ${
                              isSelected ? `${opt.bg}` : "bg-white"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`attendance-${emp._id}`}
                              value={opt.label}
                              className="sr-only"
                              onChange={() =>
                                handleAttendanceChange(emp._id, opt.label)
                              }
                            />
                            <span className={`font-medium ${opt.color}`}>{opt.code}</span>
                          </label>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
              {attendence.length === 0 && (
                <tr>
                  <td className="px-4 py-4 text-center text-gray-500" colSpan="7">
                    No employee records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={Object.keys(attendanceData).length === 0}
            className={`bg-gray-600 text-white font-semibold px-6 py-2 rounded hover:bg-gray-700 flex items-center ${
              Object.keys(attendanceData).length === 0 && "opacity-50 cursor-not-allowed"
            }`}
          >
            Submit Attendance
          </button>
        </div>
      </form>
    </>
  );
}

// Reusable Card Component
const Card = ({ title, value, color }) => (
  <div className="bg-white border shadow-sm rounded-xl text-center p-1">
    <h1 className="text-gray-600 font-medium mb-1">{title}</h1>
    <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
  </div>
);

export default ManageAttendence;
  