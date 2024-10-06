import { useGetSoilByIdQuery } from "../../redux/api/soilApi";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const SoilDetails = () => {
  const { id } = useParams();
  const { data: soil, isLoading, isError } = useGetSoilByIdQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !soil) {
    return (
      <div className="max-w-screen-lg mx-auto mt-10">
        <h3
          onClick={() => navigate(-1)}
          className="my-5 text-lg hover:underline hover:text-gray-400"
        >
          Go back
        </h3>
        <p className="text-2xl text-red-500 font-bold">
          Failed to load soil details.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto mt-5">
      <h3
        onClick={() => navigate(-1)}
        className="my-5 text-lg hover:underline hover:text-gray-400 cursor-pointer"
      >
        Go back
      </h3>
      <h1 className="text-3xl my-10 font-bold">Soil Details</h1>
      <div className="w-full flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-[40%] space-y-4">
          <p>
            <strong>Name:</strong> {soil.name}
          </p>
          <p>
            <strong>Type:</strong> {soil.type}
          </p>
          <p>
            <strong>Texture:</strong> {soil.texture}
          </p>
          <p>
            <strong>Humidity:</strong>{" "}
            {soil.humidity ? `${soil.humidity}%` : "N/A"}
          </p>
          <p>
            <strong>Temperature:</strong>{" "}
            {soil.temperature ? `${soil.temperature}°C` : "N/A"}
          </p>
          <p>
            <strong>Moisture:</strong>{" "}
            {soil.moisture ? `${soil.moisture}%` : "N/A"}
          </p>
          <p>
            <strong>pH Level:</strong> {soil.pH || "N/A"}
          </p>

          <h2 className="text-2xl font-bold mt-4">Nutrients</h2>
          <p>
            <strong>Nitrogen:</strong> {soil.nutrients?.nitrogen || "N/A"}
          </p>
          <p>
            <strong>Phosphorus:</strong> {soil.nutrients?.phosphorus || "N/A"}
          </p>
          <p>
            <strong>Potassium:</strong> {soil.nutrients?.potassium || "N/A"}
          </p>

          <h2 className="text-2xl font-bold mt-4">Fertility</h2>
          <p>
            <strong>Organic Matter:</strong>{" "}
            {soil.fertility?.organicMatter || "N/A"}
          </p>
          <p>
            <strong>CEC:</strong> {soil.fertility?.CEC || "N/A"}
          </p>
        </div>
        <div className="w-full md:w-[60%]">
          <img
            className="w-full object-cover rounded-lg"
            src={soil.SoilImage?.url || "/default-image.png"}
            alt={soil.name}
          />
        </div>
      </div>
    </div>
  );
};

export default SoilDetails;
