// import soillogo from "../../assets/soil.png";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/Api/userApiSlice";
import { logOut } from "../../redux/features/authSlice";
import { toast } from "react-toastify";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutMutation = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutate();
      dispatch(logOut());
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to log out!");
    }
  };

  return (
    <div className=" px-[5vw] py-5 flex justify-between items-center   ">
      {/* <img src={soillogo} alt="Logo" className="h-12 w-12" /> */}
      <Link to="/">
        <h1 className="text-white  text-2xl font-bold">Soli Farming</h1>
      </Link>

      <div className="flex gap-8 "></div>
      <div className="relative flex">
        {userInfo && (
          <div className="flex items-center gap-5">
            <span className="text-xl font-extrabold">{userInfo.username}</span>
            <button onClick={handleLogout} className="text-xl font-extrabold">
              <span className="">Logout</span>
            </button>
            <button
              onClick={() => navigate(`/profile`)}
              className="text-xl font-extrabold"
            >
              <span className="">Profile</span>
            </button>
          </div>
        )}

        {!userInfo && (
          <div className="flex items-center justify-center gap-5">
            <Link to="/login" className="text-xl font-extrabold">
              <span className=" ">Login</span>
            </Link>

            <Link to="/register" className="text-xl font-extrabold">
              <span className="">Register</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
