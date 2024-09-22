import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
import { useLogoutMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { FaSun, FaMoon, FaUser, FaSignOutAlt } from "react-icons/fa"; // Importing icons

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCallback] = useLogoutMutation();
  const [theme, setTheme] = useState("light");

  console.log(userInfo);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply the theme to the body class
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

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

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex justify-between items-center h-16 shadow-sm px-6">
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

      <div className="flex items-center space-x-4">
        {userInfo ? (
          <div className="flex items-center space-x-2">
            {userInfo?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="text-white font-bold py-2 px-4 rounded"
              >
                Dashboard
              </Link>
            )}
            <span className="text-gray-500">{userInfo.username}</span>
            <Link
              to="/profile"
              className="flex items-center space-x-1 hover:underline"
            >
              <FaUser />
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-1"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        ) : (
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
        <button
          onClick={toggleTheme}
          className={` ${
            theme === "light" ? "text-black" : "text-white"
          }  font-bold py-2 px-4 rounded flex items-center space-x-2`}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </div>
  );
};

export default Navigation;
