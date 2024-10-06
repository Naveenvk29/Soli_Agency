import {
  useUpdateDistributorMutation,
  useDeleteDistributorMutation,
} from "../../../redux/api/distributorsApi";
import { useGetSoilQuery } from "../../../redux/api/soilApi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const UpdateDistributor = () => {
  const { id } = useParams();
  const [distributorData, setDistributorData] = useState({
    name: "",
    email: "",
    contact: "",
    location: "",
    soil: [],
    profilePic: "",
    description: "",
  });
  const [soilList, setSoilList] = useState([]);
  const { data: soilData } = useGetSoilQuery();
  const [updateDistributor, { isLoading }] = useUpdateDistributorMutation();
  const navigate = useNavigate();
  const { deleteDistributor } = useDeleteDistributorMutation();

  useEffect(() => {
    if (soilData) {
      setSoilList(soilData);
    }
  }, [soilData]);

  const handleProfilePicChange = (e) => {
    setDistributorData({ ...distributorData, profilePic: e.target.files[0] });
  };

  const handleSoilSelection = (soilId) => {
    const updatedSoil = [...distributorData.soil];
    if (updatedSoil.includes(soilId)) {
      setDistributorData({
        ...distributorData,
        soil: updatedSoil.filter((id) => id !== soilId),
      });
    } else {
      setDistributorData({
        ...distributorData,
        soil: [...updatedSoil, soilId],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate soil selection
    if (distributorData.soil.length === 0) {
      toast.error("Please select at least one soil type.");
      return;
    }

    const formData = new FormData();
    formData.append("name", distributorData.name);
    formData.append("email", distributorData.email);
    formData.append("contact", distributorData.contact);
    formData.append("location", distributorData.location);
    formData.append("description", distributorData.description);

    if (distributorData.profilePic) {
      formData.append("profilePic", distributorData.profilePic);
    }
    distributorData.soil.forEach((soil) => {
      formData.append("soil", soil);
    });
    try {
      await updateDistributor({ id: id, formData }).unwrap();
      toast.success("Distributor updated successfully!");
      navigate("/admin/distributors-list");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update distributor!");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this distributor?")) {
      try {
        await deleteDistributor(id).unwrap(); // Pass the id directly
        toast.success("Distributor deleted successfully!");
        navigate("/distributors");
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete distributor!");
      }
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto my-10">
      <div>
        <h2
          className="text-lg hover:underline hover:text-blue-500"
          onClick={() => navigate(-1)}
        >
          Go back
        </h2>
      </div>
      <h1 className="text-4xl text-center font-bold mb-5 capitalize">
        Update Distributor
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="my-6 flex items-center justify-around w-full">
          <div className="flex flex-col w-[45%]">
            <label className="text-sm font-bold mb-2 uppercase">
              Distributor Name
            </label>
            <input
              className="text-gray-700 px-3 py-2 rounded shadow outline-none"
              type="text"
              placeholder="Name"
              value={distributorData.name}
              onChange={(e) =>
                setDistributorData({
                  ...distributorData,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col w-[45%]">
            <label className="text-sm font-bold mb-2 uppercase">Email</label>
            <input
              className="px-3 py-2 text-gray-700 border rounded shadow outline-none"
              type="email"
              placeholder="Email"
              value={distributorData.email}
              onChange={(e) =>
                setDistributorData({
                  ...distributorData,
                  email: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="my-6 flex items-center justify-around w-full">
          <div className="flex flex-col w-[45%]">
            <label className="text-sm font-bold mb-2 uppercase">
              Contact Number
            </label>
            <input
              className="px-3 py-2 text-gray-700 border rounded shadow outline-none"
              type="text"
              placeholder="Contact number"
              value={distributorData.contact}
              onChange={(e) =>
                setDistributorData({
                  ...distributorData,
                  contact: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col w-[45%]">
            <label className="text-sm font-bold mb-2 uppercase">Location</label>
            <input
              className="px-3 py-2 text-gray-700 border rounded shadow outline-none"
              type="text"
              placeholder="Location"
              value={distributorData.location}
              onChange={(e) =>
                setDistributorData({
                  ...distributorData,
                  location: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="my-6 mx-auto flex flex-col w-[95%]">
          <label
            htmlFor="description"
            className="text-sm font-bold mb-2 uppercase"
          >
            Description
          </label>
          <textarea
            id="description"
            className="text-gray-700 px-3 py-2 rounded shadow outline-none w-full border-none"
            placeholder="Description"
            value={distributorData.description}
            onChange={(e) =>
              setDistributorData({
                ...distributorData,
                description: e.target.value,
              })
            }
            rows={4}
          />
        </div>
        <div className="my-6 flex items-center justify-around w-full">
          <label className="text-sm font-bold mb-2 uppercase bg-blue-500 px-3 py-2 rounded-lg text-black ">
            Profile Picture
          </label>
          <input
            className="px-3 py-2 border rounded shadow bg-white text-neutral-600 "
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </div>
        <div className="my-6 mx-auto flex flex-col w-[95%]">
          <label className="text-2xl font-bold mb-2">Soil Type</label>
          <div className="flex text-lg gap-5  ">
            {soilList.map((soil) => (
              <label key={soil._id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={distributorData.soil.includes(soil._id)}
                  onChange={() => handleSoilSelection(soil._id)}
                />
                <span className="ml-2 my-2">{soil.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="my-6 flex items-center justify-center gap-40 w-full">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <button
                type="submit"
                className="bg-green-500 px-8 py-2 font-semibold rounded-lg"
              >
                Update
              </button>
            </>
          )}
          <button
            type="submit"
            className="bg-red-500 px-8 py-2 font-semibold rounded-lg"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </button>
          <button
            type="button"
            className="bg-red-500 px-8 py-2 font-semibold rounded-lg"
            onClick={() => navigate("/distributors")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDistributor;
