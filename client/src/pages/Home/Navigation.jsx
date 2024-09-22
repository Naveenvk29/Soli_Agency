import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
import { useLogoutMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCallback] = useLogoutMutation();

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
    <div className="flex justify-between items-center h-16 shadow-sm px-6">
      <Link to="/">
        <h1 className="text-2xl font-semibold tracking-wide">
          Soli Farming Agency
        </h1>
      </Link>

      <div className="flex  space-x-6">
        {["Home", "distributors", "soil", "about"].map((e, i) => (
          <Link key={i} to={`/${e}`}>
            <h2 className="text-lg font-bold tracking-widest capitalize hover:underline">
              {e}
            </h2>
          </Link>
        ))}
      </div>

      {userInfo?.role === "admin" && (
        <Link to="/admin/dashboard">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Admin Dashboard
          </button>
        </Link>
      )}

      <div className="flex items-center space-x-4">
        {userInfo ? (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">{userInfo.name}</span>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              className=" text-white font-bold py-2 px-4 rounded"
              to="/login"
            >
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
