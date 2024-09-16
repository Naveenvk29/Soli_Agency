import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/Api/userApiSlice";
import { setCredentials } from "../../redux/features/authSlice";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userinfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userinfo) {
      navigate("/");
    }
  }, [userinfo, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password!");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl bg-slate-500">
      <div className="p-5">
        <h2 className="text-3xl font-bold uppercase underline flex justify-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out ${
              isLoading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "logining.." : "login"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className=" mt-4">
          <Link to="/register">Don't have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
