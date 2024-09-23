import { useUpdateUserProfileMutation } from "../../redux/api/userApi";
import { setCredentials } from "../../redux/features/authSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Phone number state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Address fields
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateUserProfile, { isLoading }] = useUpdateUserProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
      if (userInfo.address) {
        setStreet(userInfo.address.street);
        setCity(userInfo.address.city);
        setState(userInfo.address.state);
        setZip(userInfo.address.zip);
      }
    }
  }, [userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const updatedUser = await updateUserProfile({
        username,
        email,
        phone,
        password,
        address: { street, city, state, zip }, // Include address in the update
      }).unwrap();
      toast.success("Profile updated successfully!");
      dispatch(setCredentials({ ...updatedUser }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <div className="w-[60%] ml-[35%]">
      <div className="w-full h-full mt-5 ">
        <h1 className="text-3xl font-bold my-4 ml-[18%] underline">Profile</h1>
        {isLoading && <Loader />} {/* Display Loader while updating */}
        <form onSubmit={handleSubmit}>
          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-[30vw] text-black font-medium outline-none border border-gray-300 p-3 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-[30vw] text-black font-medium outline-none border border-gray-300 p-3 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4">Phone</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-[30vw] text-black font-medium outline-none border border-gray-300 p-3 rounded-md"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Address Fields */}
          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4">Street</label>
            <input
              type="text"
              placeholder="Enter your street address"
              className="w-[30vw] text-black font-medium outline-none border border-gray-300 p-3 rounded-md"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4">City</label>
            <input
              type="text"
              placeholder="Enter your city"
              className="w-[30vw] text-black font-medium outline-none border border-gray-300 p-3 rounded-md"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4">State</label>
            <input
              type="text"
              placeholder="Enter your state"
              className="w-[30vw] text-black font-medium outline-none border border-gray-300 p-3 rounded-md"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4">ZIP Code</label>
            <input
              type="text"
              placeholder="Enter your ZIP code"
              className="w-[30vw] text-black font-medium outline-none border border-gray-300 p-3 rounded-md"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>

          <div className="my-3 flex flex-col">
            <label className="text-lg font-semibold mb-4">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-[30vw] text-black font-medium outline-none border border-gray-300 p-3 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-4 flex flex-col">
            <label className="text-lg font-semibold mb-4">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-[30vw] text-black font-medium outline-none border border-gray-300 p-3 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-900 text-lg font-semibold px-8 py-2 my-2 hover:bg-blue-700 rounded-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
