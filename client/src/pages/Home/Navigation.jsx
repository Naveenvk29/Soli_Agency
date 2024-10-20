import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
import { useLogoutMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import logo from "../../assets/logo.png";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCallback] = useLogoutMutation();

  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For mobile menu toggle

  const handleDropdownToggle = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = async () => {
    try {
      await logoutApiCallback();
      dispatch(logout());
      toast.success("Logged Out Successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to Logout!");
    }
  };

  return (
    <nav className="flex justify-between items-center h-20 px-4 md:px-6 bg-transparent shadow-sm relative">
      <div className="w-28 md:w-[24%]">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden block text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Links */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex w-full z-40  md:w-[40%] md:space-x-6 flex-col md:flex-row absolute md:relative top-20 left-0 md:top-auto md:left-auto bg-gray-800 md:bg-transparent text-white  p-4 md:p-0`}
      >
        {["Home", "distributors", "soil", "about"].map((e, i) => (
          <Link
            key={i}
            to={e.toLowerCase() === "home" ? "/" : `/${e.toLowerCase()}`}
            className="text-lg font-bold tracking-widest capitalize hover:underline"
          >
            {e}
          </Link>
        ))}
      </div>

      {/* User Profile/Dropdown */}
      <div className="relative flex items-center">
        <button
          onClick={handleDropdownToggle}
          className="flex justify-center items-center focus:outline-none"
        >
          {userInfo ? (
            <h2 className="text-lg font-black tracking-widest">
              {userInfo.username}
            </h2>
          ) : null}

          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropdown ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {/* Dropdown for User Actions */}
        {dropdown && userInfo && (
          <div className="absolute top-full right-0 py-3 mt-2 rounded-lg flex flex-col bg-white text-gray-950 px-5">
            {userInfo?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-1 text-sm my-3 hover:text-red-300"
              >
                <MdAdminPanelSettings /> <span>Dashboard</span>
              </Link>
            )}
            <Link
              to="/profile"
              className="flex items-center space-x-1 text-sm my-1 hover:underline"
            >
              <FaUser />
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-sm my-1 hover:underline"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        )}

        {!userInfo && (
          <div className="flex space-x-4">
            <Link className="font-bold py-2 px-4 rounded" to="/login">
              Login
            </Link>
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
