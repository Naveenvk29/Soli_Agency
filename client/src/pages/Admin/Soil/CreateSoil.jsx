import { useCreateSoilMutation } from "../../../redux/api/soilApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateSoil = () => {
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

  const [soilImage, setSoilImage] = useState(null); // For file input
  const navigate = useNavigate();
  const [createSoil, { isLoading }] = useCreateSoilMutation();

  const handleFileChange = (e) => {
    setSoilImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", soilData.name);
    formData.append("type", soilData.type);
    formData.append("texture", soilData.texture);
    formData.append("humidity", soilData.humidity);
    formData.append("pH", soilData.pH);
    formData.append("temperature", soilData.temperature);
    formData.append("moisture", soilData.moisture);
    formData.append("SoilImage", soilImage); // Add the image file to form data

    try {
      await createSoil(formData).unwrap(); // Submit the form data
      toast.success("Soil created successfully!");
      navigate("/soil");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create soil. Please try again.");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto my-10">
      <h1 className="text-4xl text-center font-bold my-5">Create Soil</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="my-6 flex items-center justify-around w-full">
          <div className="flex flex-col w-[45%]">
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
          <div className="flex flex-col w-[45%]">
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

        <div className="my-6 flex items-center justify-around w-full">
          <div className="flex flex-col w-[45%]">
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
          <div className="flex flex-col w-[45%]">
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

        <div className="my-6 flex items-center justify-around w-full">
          <div className="flex flex-col w-[45%]">
            <label className="text-sm font-bold mb-2 uppercase">pH Level</label>
            <input
              className="text-gray-700 px-3 py-2 rounded shadow focus:outline-none focus:ring-blue-500"
              type="number"
              placeholder="pH Level"
              value={soilData.pH}
              onChange={(e) => setSoilData({ ...soilData, pH: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-[45%]">
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

        <div className="my-6 flex items-center justify-around w-full">
          <div className="flex flex-col w-[45%]">
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
          <div className="flex flex-col w-[45%]">
            <label className="text-sm font-bold mb-2 uppercase">
              Soil Image
            </label>
            <input
              className="px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:ring-blue-500"
              type="file"
              onChange={handleFileChange} // Handle file input
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-900 text-lg font-semibold px-8 py-2 my-2 hover:bg-blue-700 rounded-lg ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Creating..." : "Create Soil"}
        </button>
      </form>
    </div>
  );
};

export default CreateSoil;
