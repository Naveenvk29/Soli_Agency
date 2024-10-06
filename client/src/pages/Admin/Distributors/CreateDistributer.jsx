import { useCreateDistributorMutation } from "../../../redux/api/distributorsApi";
import { useGetSoilQuery } from "../../../redux/api/soilApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";

const CreateDistributer = () => {
  const [distributorData, setDistributorData] = useState({
    name: "",
    email: "",
    contact: "",
    location: "",
    soil: [],
    profilePic: null,
    description: "",
  });

  const [soilList, setSoilList] = useState([]);
  const { data: soilData } = useGetSoilQuery();
  const [createDistributor, { isLoading }] = useCreateDistributorMutation(); // <-- Correct use here
  const navigate = useNavigate();
  const [isSoilDropdownOpen, setIsSoilDropdownOpen] = useState(false);

  useEffect(() => {
    if (soilData) {
      setSoilList(soilData);
    }
  }, [soilData]);

  const handleProfilePicChange = (e) => {
    setDistributorData({
      ...distributorData,
      profilePic: e.target.files[0],
    });
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

    const formData = new FormData();
    formData.append("name", distributorData.name);
    formData.append("email", distributorData.email);
    formData.append("contact", distributorData.contact);
    formData.append("location", distributorData.location);
    formData.append("profilePic", distributorData.profilePic);

    // Append each soil type separately to FormData
    distributorData.soil.forEach((soil) => {
      formData.append("soil", soil);
    });

    formData.append("description", distributorData.description);

    try {
      await createDistributor(formData).unwrap();
      toast.success("Distributor created successfully!");
      navigate("/admin/distributors-list");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create distributor!");
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
      <h1 className="text-4xl text-center font-bold my-5 capitalize">
        Create Distributor
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
        <div className="my-6 flex items-center justify-around w-full">
          <label className="text-sm font-bold mb-2 uppercase">Soil Type</label>
          <div className="relative w-[20vw]">
            <div
              className="border text-black border-gray-300 p-3 rounded-md cursor-pointer bg-white"
              onClick={() => setIsSoilDropdownOpen(!isSoilDropdownOpen)}
            >
              {distributorData.soil.length > 0
                ? `Selected: ${distributorData.soil.length} soil(s)`
                : "Select Soil Type"}
            </div>

            {isSoilDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {soilList.map((soil) => (
                  <label
                    key={soil._id}
                    className="flex items-center p-2 space-x-2 cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      value={soil._id}
                      checked={distributorData.soil.includes(soil._id)}
                      onChange={() => handleSoilSelection(soil._id)}
                      className="form-checkbox "
                    />
                    <span className="text-gray-700 ">{soil.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="my-6 flex items-center justify-center gap-40 w-full">
          {isLoading ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="bg-green-500 px-8 py-2 font-semibold rounded-lg "
            >
              Create
            </button>
          )}
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

export default CreateDistributer;
