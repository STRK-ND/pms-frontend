import React from "react";


const DashboardCard = ({ title, count, icon, iconColor, stat, delta }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
      <div className={`p-3 rounded-full ${iconColor}`}>
        <i className={`fas ${icon}`}></i>
      </div>
    </div>
    <div className="mt-2">
      <span className={`text-sm font-medium ${stat}`}>{delta}</span>
      <span className="text-sm text-gray-500 ml-1">from last week</span>
    </div>
  </div>
);

const TaskCard = ({ priority, id, title, description, user, due }) => {
  const priorityColors = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
  };

  const priorityBorders = {
    High: "border-l-4 border-red-500",
    Medium: "border-l-4 border-yellow-500",
    Low: "border-l-4 border-green-500",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4   ${priorityBorders[priority]}`}
    >
      <div className="flex justify-between">
        <div className="flex items-center">
          <span
            className={`text-xs font-medium px-2 py-1 rounded mr-2 ${priorityColors[priority]}`}
          >
            {priority}
          </span>
          <span className="text-xs text-gray-500">#{id}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
      <h4 className="mt-2 font-medium text-gray-900">{title}</h4>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-6 h-6 rounded-full object-cover mr-1"
          />
          <span className="text-xs text-gray-500">{user.name}</span>
        </div>
        <span className="text-xs text-gray-500">Due: {due}</span>
      </div>
    </div>
  );
};

const Column = ({ title, count, color, tasks }) => (
  <div className="kanban-column">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-medium text-gray-900">{title}</h3>
      <span className={`bg-${color}-200 text-${color}-800 text-xs font-medium px-2 py-0.5 rounded-full`}>{count}</span>
    </div>
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  </div>
);

export default function StaffTaskManager() {
  const dashboardStats = [
    {
      title: "Total Tasks",
      count: 87,
      icon: "fa-tasks",
      iconColor: "bg-indigo-100 text-indigo-600",
      stat: "text-green-600",
      delta: "+5.2%",
    },
    {
      title: "Completed",
      count: 42,
      icon: "fa-check-circle",
      iconColor: "bg-green-100 text-green-600",
      stat: "text-green-600",
      delta: "+12.1%",
    },
    {
      title: "In Progress",
      count: 28,
      icon: "fa-spinner",
      iconColor: "bg-blue-100 text-blue-600",
      stat: "text-red-600",
      delta: "-3.7%",
    },
    {
      title: "Overdue",
      count: 17,
      icon: "fa-exclamation-circle",
      iconColor: "bg-red-100 text-red-600",
      stat: "text-red-600",
      delta: "+2.4%",
    },
  ];

  const exampleTasks = [
    {
      priority: "High",
      id: "T-105",
      title: "Update client dashboard UI",
      description: "Redesign the dashboard layout to improve user experience",
      user: {
        name: "Sarah",
        avatar: "https://placehold.co/24x24",
      },
      due: "Tomorrow",
    },
    {
      priority: "Medium",
      id: "T-106",
      title: "Review quarterly reports",
      description: "Analyze Q2 performance metrics and prepare summary",
      user: {
        name: "James",
        avatar: "https://placehold.co/24x24",
      },
      due: "Fri",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white">
              <i className="fas fa-tasks text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Task<span className="text-indigo-600">Track</span>
            </h1>
          </div>
        </div> */}
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {dashboardStats.map((stat, idx) => (
            <DashboardCard key={idx} {...stat} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-7">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Task Management</h2>
            <div className="flex space-x-3">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
                <i className="fas fa-filter mr-2"></i> Filter
              </button>
              <button className="px-3 py-1 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 flex items-center">
                <i className="fas fa-plus mr-2"></i> New Task
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <Column title="To Do" count={23} color="gray" tasks={exampleTasks} />
            <Column title="In Progress" count={18} color="blue" tasks={exampleTasks} />
            <Column title="Review" count={7} color="yellow" tasks={exampleTasks} />
          </div>
        </div>
      </main>
    </div>
  );
}
