import { useRegisterMutation } from "../../redux/api/userApi";
import { setCredentials } from "../../redux/features/authSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Logged In Successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <div className="w-[60%] ml-[35%]">
      <div className="w-full h-full ">
        <h1 className="text-3xl font-bold my-4 ml-[18%] underline">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4 ">UserName</label>
            <input
              type="text"
              placeholder="Enter your username"
              className=" w-[30vw] text-black font-medium outline-none border border-gray-300 p-3  rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4 ">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className=" w-[30vw] text-black font-medium outline-none border border-gray-300 p-3  rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4 "> Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className=" w-[30vw] text-black font-medium outline-none border border-gray-300 p-3  rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-4 flex flex-col">
            <label className="text-lg font-semibold mb-4 ">
              {" "}
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Enter your confirm password"
              className=" w-[30vw] text-black font-medium outline-none border border-gray-300 p-3  rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-900 text-lg font-semibold px-8 py-2 my-2 hover:bg-blue-700 rounded-lg"
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
        </form>
        <p className="text-lg font-medium ">
          Already have an account?{" "}
          <Link
            className="ml-1 hover:underline hover:text-blue-800"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
