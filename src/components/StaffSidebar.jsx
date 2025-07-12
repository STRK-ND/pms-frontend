import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaChevronRight,
  FaChevronDown,
  FaTachometerAlt,
  FaProjectDiagram,
  FaUserTie,
  FaClipboardList,
  FaRegClock,
  FaBullhorn,
  FaCalendarCheck,
} from "react-icons/fa";

function StaffSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});

  const prefixPath = "/staff";

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (route) => location.pathname === `${prefixPath}/${route}`;

  const sidebarMenu = useMemo(
    () => [
      {
        // title: "Main",
        links: [
          {
            name: "Dashboard",
            icon: <FaTachometerAlt />,
            to:"dashboard"
          },
          {
            name: "Announcements",
            icon: <FaBullhorn />,
            to: "manage-announcements",
          },
          {
            name: "Assigned Project",
            icon: <FaProjectDiagram />,
            to: "assigned-project",
          },
          {
            name: "Manage Lead",
            icon: <FaUserTie />,
            to: "manage-lead",
          },
          {
            name: "Manage Tasks",
            icon: <FaClipboardList />,
            to: "manage-task",
          },
          {
            name: "Manage Worklog",
            icon: <FaRegClock />,
            to: "timesheet",
          },
          {
            name: "Leave",
            icon: <FaCalendarCheck />,
            to: "leave",
          },
           {
            name: "Manage Profile",
            icon: <FaCalendarCheck />,
            to: "manage-profile",
          },
        ],
      },
    ],
    []
  );

  return (
    
   <div>
     <aside className="w-64 h-screen bg-white shadow-sm fixed top-0 left-0 z-40 flex flex-col">
      {/* Sidebar Header */}
    
      <div className="flex items-center justify-start h-16 px-6 shrink-0">
        <span className="text-xl font-bold text-blue-600">
          Project <span className="text-gray-700">Managements</span>
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4" role="navigation">
        {sidebarMenu.length > 0 ? (
          sidebarMenu.map((section) => (
            <div key={section.title} className="mb-6">
              {section.title && (
                <h3 className="text-xs text-gray-400 uppercase font-semibold mb-2">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-1" role="menu">
                {section.links.map((item) => (
                  <li key={item.name} role="menuitem">
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="w-full flex items-center justify-between gap-3 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                          aria-expanded={openDropdowns[item.name] || false}
                          aria-controls={`dropdown-${item.name}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{item.icon}</span>
                            {item.name}
                          </div>
                          <span className="text-xs">
                            {openDropdowns[item.name] ? (
                              <FaChevronDown />
                            ) : (
                              <FaChevronRight />
                            )}
                          </span>
                        </button>
                        {openDropdowns[item.name] && (
                          <ul
                            id={`dropdown-${item.name}`}
                            className="ml-10 mt-1 space-y-1"
                            role="menu"
                          >
                            {item.subItems.map((subItem) => (
                              <li key={subItem.name} role="menuitem">
                                <button
                                  onClick={() =>
                                    navigate(`${prefixPath}/${subItem.to}`)
                                  }
                                  className={`flex items-center gap-2 py-1 rounded text-sm w-full text-left ${
                                    isActive(subItem.to)
                                      ? "text-blue-600 font-semibold"
                                      : "text-gray-600 hover:text-blue-500"
                                  }`}
                                >
                                  {subItem.icon}
                                  <span>{subItem.name}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => navigate(`${prefixPath}/${item.to}`)}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium text-left ${
                          isActive(item.to)
                            ? "bg-blue-100 text-blue-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="px-4 py-2 text-gray-500">No menu items available</p>
        )}
      </nav>
    </aside>
   </div>
  );
}

export default StaffSidebar;
