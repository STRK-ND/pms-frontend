import React, { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

export default function ProfessionalCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const navigateYear = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(currentDate.getFullYear() + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    const daysArray = [];
    const prevMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1);

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(
        <div key={`prev-${i}`} className="h-12 flex items-center justify-center text-gray-400">
          {prevMonthDays - firstDay + i + 1}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate &&
        selectedDate.getDate() === i &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear();

      const isToday = new Date().getDate() === i &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      daysArray.push(
        <div
          key={`day-${i}`}
          className={`h-12 flex items-center justify-center cursor-pointer rounded-full calendar-day
            ${isSelected ? "bg-blue-600 text-white font-medium scale-105" : ""}
            ${isToday && !isSelected ? "border-2 border-blue-400 font-medium" : ""}
            ${!isSelected && !isToday ? "hover:bg-gray-200 transition" : ""}
          `}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigateYear(-1)}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Previous year"
        >
          ⏮
        </button>
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Previous month"
        >
          ◀
        </button>
        <div className="text-xl font-semibold text-gray-800">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Next month"
        >
          ▶
        </button>
        <button
          onClick={() => navigateYear(1)}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Next year"
        >
          ⏭
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>

      {selectedDate && (
        <div className="mt-6 p-4 border-t">
          <h3 className="font-medium text-gray-700 mb-2">Selected Date:</h3>
          <p className="text-gray-900">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
