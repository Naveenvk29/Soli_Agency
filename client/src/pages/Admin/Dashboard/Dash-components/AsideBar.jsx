import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa"; // Optional icon for menu toggle

const AsideBar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Sidebar toggle button for small screens */}
      <button
        className="md:hidden text-white text-xl  p-3 rounded-full absolute top-2 right-5"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } z-50 md:translate-x-0 fixed md:relative w-[80%]  h-screen flex flex-col items-start gap-6 p-10 bg-gray-800  md:bg-transparent transform transition-transform duration-300 ease-in-out`}
      >
        <Link
          to="/admin/distributors/create"
          className={`text-white text-xl font-semibold hover:bg-blue-400 px-4 py-2 rounded-xl duration-500 ${
            location.pathname === "/admin/distributors/create"
              ? "bg-blue-500"
              : ""
          }`}
        >
          Create Distributors
        </Link>
        <Link
          to="/admin/distributors-list"
          className={`text-white text-xl font-semibold hover:bg-blue-400 px-4 py-2 rounded-xl duration-500 ${
            location.pathname === "/admin/distributors-list"
              ? "bg-blue-500"
              : ""
          }`}
        >
          Distributors List
        </Link>
        <Link
          to="/admin/soil/create"
          className={`text-white text-xl font-semibold hover:bg-blue-400 px-4 py-2 rounded-xl duration-500 ${
            location.pathname === "/admin/soil/create" ? "bg-blue-500" : ""
          }`}
        >
          Create Soil
        </Link>
        <Link
          to="/admin/soil-list"
          className={`text-white text-xl font-semibold hover:bg-blue-400 px-4 py-2 rounded-xl duration-500 ${
            location.pathname === "/admin/soil-list" ? "bg-blue-500" : ""
          }`}
        >
          Soil List
        </Link>
      </div>
    </div>
  );
};

export default AsideBar;
