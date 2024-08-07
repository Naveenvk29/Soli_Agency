import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/userApi";
import { logout } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

const Navigation = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleToggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApicall] = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("User Info:", userInfo);
  //   if (userInfo) {
  //     console.log("User Role:", userInfo.role);
  //     console.log("Full User Info Object:", userInfo); // Add this log
  //   }
  // }, [userInfo]);

  const handleLogout = async () => {
    try {
      await logoutApicall();
      dispatch(logout());
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-around bg-slate-500 p-5">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {userInfo ? (
        <div className="relative" onClick={handleToggleDropDown}>
          <span className="cursor-pointer">{userInfo.username}</span>
          <FaCaretDown
            className={`text-white ${dropDownOpen ? "open" : ""}`}
            aria-expanded={dropDownOpen}
            aria-controls="dropdown-menu"
          />
          <ul
            id="dropdown-menu"
            className={`dropdown-menu absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl ${
              dropDownOpen ? "block" : "hidden"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {userInfo.role === "ADMIN" && (
              <li>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex gap-5 text-white text-lg font-bold">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;
