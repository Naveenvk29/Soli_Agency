import { useLoginMutation } from "../../redux/api/userApi";
import { setCredentials } from "../../redux/features/authSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
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
    <div className="max-w-screen-xl mx-auto mt-10 px-5">
      <div className="w-full lg:w-1/2 xl:w-1/3 mx-auto p-8 bg-white text-black shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label className="text-lg font-semibold mb-2 block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 text-black font-medium outline-none border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="text-lg font-semibold mb-2 block">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 text-black font-medium outline-none border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 text-lg font-semibold text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
        </form>

        <p className="text-center text-lg font-medium mt-5">
          Don't have an account?{" "}
          <Link className="ml-2 text-blue-500 hover:underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
