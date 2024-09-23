import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
import { useLogoutMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCallback] = useLogoutMutation();

  const [dropdown, setDropdown] = useState(false);

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
    <div className="flex justify-between items-center h-16 shadow-sm px-6 bg-transparent">
      <Link to="/">
        <h1 className="text-2xl font-semibold tracking-wide">
          Soli Farming Agency
        </h1>
      </Link>

      <div className="flex space-x-6">
        {["Home", "distributors", "soil", "about"].map((e, i) => (
          <Link
            key={i}
            to={e.toLowerCase() === "home" ? "/" : `/${e.toLowerCase()}`}
          >
            <h2 className="text-lg font-bold tracking-widest capitalize hover:underline">
              {e}
            </h2>
          </Link>
        ))}
      </div>

      <div className=" relative flex items-center mr-8">
        <button
          onClick={handleDropdownToggle}
          className="flex justify-center items-center focus:outline-none"
        >
          {userInfo ? (
            <h2 className="text-lg font-black tracking-widest">
              {userInfo.username}
            </h2>
          ) : (
            <></>
          )}

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
        {dropdown && userInfo && (
          <div className="absolute top-[2.3vw]  right-0  py-3 rounded-lg flex flex-col  bg-white text-gray-950 px-5 hover:bg-zinc-700 hover:text-white   ">
            {userInfo?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="flex items-center space-x-1 text-[1.3vw] my-3  hover:text-red-300"
              >
                <MdAdminPanelSettings /> <span>Dashboard</span>
              </Link>
            )}

            <Link
              to="/profile"
              className="flex items-center space-x-1 hover:underline text-[1.1vw] my-1"
            >
              <FaUser />
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:underline text-[1.1vw] my-1 "
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        )}

        {!userInfo && (
          <>
            <Link className=" font-bold py-2 px-4 rounded" to="/login">
              Login
            </Link>
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
