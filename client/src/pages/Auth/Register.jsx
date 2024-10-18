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
      toast.success("Registered Successfully!");
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
    <div className="max-w-screen-xl mx-auto mt-10 px-5">
      <div className="w-full lg:w-1/2 xl:w-1/3 mx-auto p-8 bg-white text-black sshadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="text-lg font-semibold mb-2 block">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 text-black font-medium outline-none border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-semibold mb-2 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 text-black font-medium outline-none border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-lg font-semibold mb-2 block">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 text-black font-medium outline-none border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="text-lg font-semibold mb-2 block">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full p-3 text-black font-medium outline-none border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 text-lg font-semibold text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLoading ? <Loader /> : "Register"}
          </button>
        </form>

        <p className="text-center text-lg font-medium mt-5">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
