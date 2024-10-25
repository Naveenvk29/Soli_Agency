import { useUpdateSoilMutation } from "../../../redux/api/soilApi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateSoil = ({ initialData }) => {
  const [soilData, setSoilData] = useState({
    name: "",
    type: "",
    texture: "",
    nutrients: {},
    fertility: {},
    humidity: 0,
    pH: 0,
    temperature: 0,
    moisture: 0,
  });

  const [soilImage, setSoilImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Get soilId from URL params

  const [updateSoil, { isLoading }] = useUpdateSoilMutation();

  useEffect(() => {
    // Prefill the form with initial data
    if (initialData) {
      setSoilData(initialData);
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSoilImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result); // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!soilData.name || !soilData.type || !soilData.texture) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    if (soilData.pH < 0 || soilData.pH > 14) {
      toast.error("pH level must be between 0 and 14.");
      return false;
    }

    if (soilData.humidity < 0 || soilData.humidity > 100) {
      toast.error("Humidity must be between 0 and 100.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", soilData.name);
    formData.append("type", soilData.type);
    formData.append("texture", soilData.texture);
    formData.append("humidity", soilData.humidity);
    formData.append("pH", soilData.pH);
    formData.append("temperature", soilData.temperature);
    formData.append("moisture", soilData.moisture);

    if (soilImage) formData.append("SoilImage", soilImage); // Only update the image if it's changed
    formData.append("nutrients", JSON.stringify(soilData.nutrients));
    formData.append("fertility", JSON.stringify(soilData.fertility));

    try {
      await updateSoil({ id, formData }).unwrap();
      toast.success("Soil updated successfully!");
      navigate("/soil");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error?.data?.message || "Failed to update soil. Please try again.";
      toast.error(errorMessage);
    }
  };

  const renderDynamicFields = (data, setData, label) => (
    <>
      <label className="text-sm font-bold mb-2 uppercase">{label}</label>
      {Object.keys(data).map((key, index) => (
        <div key={index} className="flex items-center space-x-4 my-2">
          <input
            type="text"
            placeholder="Name"
            className="text-gray-700 px-3 py-2 rounded shadow focus:outline-none focus:ring-blue-500"
            value={key}
            onChange={(e) => {
              const updatedData = { ...data };
              const value = updatedData[key];
              delete updatedData[key];
              updatedData[e.target.value] = value;
              setData(updatedData);
            }}
          />
          <input
            type="number"
            placeholder="Value"
            className="text-gray-700 px-3 py-2 rounded shadow focus:outline-none focus:ring-blue-500"
            value={data[key]}
            onChange={(e) => {
              setData({
                ...data,
                [key]: e.target.value,
              });
            }}
          />
          <button
            type="button"
            className="text-red-600 font-semibold"
            onClick={() => {
              const updatedData = { ...data };
              delete updatedData[key];
              setData(updatedData);
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-500"
        onClick={() => setData({ ...data, "": "" })}
      >
        Add {label}
      </button>
    </>
  );

  return (
    <div className="max-w-screen-lg mx-auto my-10 px-4">
      <h2
        className="text-lg hover:underline hover:text-blue-500 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Go back
      </h2>
      <h1 className="text-4xl text-center font-bold my-5">Update Soil</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="my-6 flex flex-col md:flex-row md:justify-around w-full">
          <div className="flex flex-col w-full md:w-[45%]">
            <label className="text-sm font-bold mb-2 uppercase">Name</label>
            <input
              className="text-gray-700 px-3 py-2 rounded shadow focus:outline-none focus:ring-blue-500"
              type="text"
              placeholder="Name"
              value={soilData.name}
              onChange={(e) =>
                setSoilData({ ...soilData, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full md:w-[45%] mt-4 md:mt-0">
            <label className="text-sm font-bold mb-2 uppercase">Type</label>
            <input
              className="px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:ring-blue-500"
              type="text"
              placeholder="Type"
              value={soilData.type}
              onChange={(e) =>
                setSoilData({ ...soilData, type: e.target.value })
              }
            />
          </div>
        </div>

        <div className="my-6 flex flex-col md:flex-row md:justify-around w-full">
          <div className="flex flex-col w-full md:w-[45%]">
            <label className="text-sm font-bold mb-2 uppercase">Texture</label>
            <input
              className="text-gray-700 px-3 py-2 rounded shadow focus:outline-none focus:ring-blue-500"
              type="text"
              placeholder="Texture"
              value={soilData.texture}
              onChange={(e) =>
                setSoilData({ ...soilData, texture: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col w-full md:w-[45%] mt-4 md:mt-0">
            <label className="text-sm font-bold mb-2 uppercase">Humidity</label>
            <input
              className="px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:ring-blue-500"
              type="number"
              placeholder="Humidity"
              value={soilData.humidity}
              onChange={(e) =>
                setSoilData({ ...soilData, humidity: e.target.value })
              }
            />
          </div>
        </div>

        <div className="my-6 flex flex-col md:flex-row md:justify-around w-full">
          <div className="flex flex-col w-full md:w-[45%]">
            <label className="text-sm font-bold mb-2 uppercase">pH Level</label>
            <input
              className="text-gray-700 px-3 py-2 rounded shadow focus:outline-none focus:ring-blue-500"
              type="number"
              placeholder="pH Level"
              value={soilData.pH}
              onChange={(e) => setSoilData({ ...soilData, pH: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full md:w-[45%] mt-4 md:mt-0">
            <label className="text-sm font-bold mb-2 uppercase">Moisture</label>
            <input
              className="px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:ring-blue-500"
              type="number"
              placeholder="Moisture"
              value={soilData.moisture}
              onChange={(e) =>
                setSoilData({ ...soilData, moisture: e.target.value })
              }
            />
          </div>
        </div>

        <div className="my-6 flex flex-col md:flex-row md:justify-around w-full">
          <div className="flex flex-col w-full md:w-[45%]">
            <label className="text-sm font-bold mb-2 uppercase">
              Temperature
            </label>
            <input
              className="text-gray-700 px-3 py-2 rounded shadow focus:outline-none focus:ring-blue-500"
              type="number"
              placeholder="Temperature"
              value={soilData.temperature}
              onChange={(e) =>
                setSoilData({ ...soilData, temperature: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col w-full md:w-[45%] mt-4 md:mt-0">
            <label className="text-sm font-bold mb-2 uppercase">
              Soil Image
            </label>
            <input
              type="file"
              className="px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:ring-blue-500"
              onChange={handleFileChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Soil Preview"
                className="mt-2 w-24 h-24 object-cover"
              />
            )}
          </div>
        </div>

        <div className="my-6 flex flex-col md:flex-row md:justify-around w-full">
          <div className="flex flex-col w-full md:w-[40%]">
            {renderDynamicFields(
              soilData.nutrients,
              (newNutrients) =>
                setSoilData({ ...soilData, nutrients: newNutrients }),
              "Nutrients"
            )}
          </div>
          <div className="flex flex-col w-full md:w-[40%]">
            {renderDynamicFields(
              soilData.fertility,
              (newFertility) =>
                setSoilData({ ...soilData, fertility: newFertility }),
              "Fertility"
            )}
          </div>
        </div>

        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 shadow"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Updating Soil..." : "Update Soil"}
        </button>
      </form>
    </div>
  );
};

export default UpdateSoil;
