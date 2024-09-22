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
    <div className="w-[60%] ml-[35%] mt-[6%]">
      <div className="w-full h-full ">
        <h1 className="text-3xl font-bold my-4 ml-[18%] underline">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="my-5 flex flex-col">
            <label className="text-lg font-semibold mb-5 ">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className=" w-[30vw] text-black font-medium outline-none border border-gray-300 p-3  rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5 flex flex-col">
            <label className="text-lg font-semibold mb-5 "> Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className=" w-[30vw] text-black font-medium outline-none border border-gray-300 p-3  rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-900 text-lg font-semibold px-8 py-2 my-5 hover:bg-blue-700 rounded-lg"
          >
            {isLoading ? <Loader /> : "Login"}
          </button>
        </form>
        <p className="text-lg font-medium ">
          Don't have an account?{" "}
          <Link
            className="ml-2 hover:underline hover:text-blue-800"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
