import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaProjectDiagram,
  FaMoneyBillWave,
  FaUserCheck,
  FaFileMedical,
  FaChevronRight,
  FaChevronDown,
  FaUserShield,
  FaBell,
  FaCogs,
  FaGift,
  FaMoneyCheckAlt,
  FaBuilding,
  FaTags,
  FaFlag,
  FaRupeeSign,
  FaRedoAlt,
  FaFileInvoiceDollar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ hamburger toggle

  const prefixPath = "/supreme-admin";

  const toggleDropdown = (name) => {
    setOpenDropdowns((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (route) => location.pathname === `${prefixPath}/${route}`;

  const sidebarMenu = useMemo(
    () => [
      {
        links: [
          {
            name: "Dashboard",
            icon: <FaTachometerAlt />,
            to: "dashboard",
          },
          {
            name: "Manage Employees",
            icon: <FaUsers />,
            to: "manage-employees",
          },
          {
            name: "Manage Project",
            icon: <FaProjectDiagram />,
            to: "manage-project",
          },
          {
            name: "Manage I/E",
            icon: <FaMoneyBillWave />,
            to: "manage-expense",
          },
          {
            name: "Manage Attendence",
            icon: <FaUserCheck />,
            to: "manage-attendence",
          },
          {
            name: "Manage Incentive",
            icon: <FaGift />,
            to: "manage-incentive",
          },
          {
            name: "Manage Reports",
            icon: <FaFileMedical />,
            to: "manage-reports",
          },
          {
            name: "Manage Reminders",
            icon: <FaBell />,
            to: "manage-reminders",
          },
          {
            name: "Manage Onboarding ",
            icon: <FaFileInvoiceDollar className="text-gray-600" />,
            to: "manage-onboarding",
          },
          {
            name: "Master Settings",
            icon: <FaCogs />,
            subItems: [
              {
                name: "Manage Category",
                icon: <FaTags className="text-gray-600" />,
                to: "master-setting/manage-category",
              },
              {
                name: "Manage Priority",
                icon: <FaFlag className="text-gray-600" />,
                to: "master-setting/manage-priority",
              },
              {
                name: "Manage Price Type",
                icon: <FaRupeeSign className="text-gray-600" />,
                to: "master-setting/manage-priceType",
              },
              {
                name: "Manage Salary Payout",
                icon: <FaMoneyCheckAlt className="text-gray-600" />,
                to: "master-setting/manage-saleryPayout",
              },
              {
                name: "Manage Department",
                icon: <FaBuilding className="text-gray-600" />,
                to: "master-setting/manage-department",
              },
              {
                name: "Manage Repeat Type",
                icon: <FaRedoAlt className="text-gray-600" />,
                to: "master-setting/manage-repeatType",
              },
              {
                name: "Manage Invoice Type",
                icon: <FaFileInvoiceDollar className="text-gray-600" />,
                to: "master-setting/manage-invoiceType",
              },
            ],
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      {/* Hamburger Button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-700 text-2xl p-2 bg-white rounded shadow"
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full overflow-auto w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-left h-16 px-6 shrink-0 ">
          <span className="text-x font-bold text-blue-600 ">
            Project <span className="text-gray-700">Management</span>
          </span>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4" role="navigation">
          {sidebarMenu.map((section, sIdx) => (
            <div key={sIdx} className="mb-6">
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
                                  onClick={() => {
                                    navigate(`${prefixPath}/${subItem.to}`);
                                    setIsSidebarOpen(false);
                                  }}
                                  className={`flex items-center gap-2 py-1 rounded text-sm w-full text-left ${
                                    location.pathname ===
                                    `${prefixPath}/${subItem.to}`
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
                        onClick={() => {
                          navigate(`${prefixPath}/${item.to}`);
                          setIsSidebarOpen(false);
                        }}
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
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
