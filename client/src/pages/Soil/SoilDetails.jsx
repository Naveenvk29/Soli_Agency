import { useGetSoilByIdQuery } from "../../redux/api/soilApi";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";

const SoilDetails = () => {
  const { id } = useParams();
  const { data: soil, isLoading } = useGetSoilByIdQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return soil ? (
    <div className="max-w-screen-lg mx-auto mt-5">
      <h1 className="text-3xl font-bold">Soil Details</h1>
      <div className="mt-4">
        <img
          className="w-full h-auto"
          src={soil.SoilImage?.url}
          alt={soil.name}
        />

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
          <strong>Humidity:</strong> {soil.humidity}%
        </p>
        <p>
          <strong>Temperature:</strong> {soil.temperature}°C
        </p>
        <p>
          <strong>Moisture:</strong> {soil.moisture}%
        </p>
        <p>
          <strong>pH Level:</strong> {soil.pH}
        </p>

        <h2 className="text-2xl font-bold mt-4">Nutrients</h2>
        <p>
          <strong>Nitrogen:</strong> {soil.nutrients?.nitrogen}
        </p>
        <p>
          <strong>Phosphorus:</strong> {soil.nutrients?.phosphorus}
        </p>
        <p>
          <strong>Potassium:</strong> {soil.nutrients?.potassium}
        </p>

        <h2 className="text-2xl font-bold mt-4">Fertility</h2>
        <p>
          <strong>Organic Matter:</strong> {soil.fertility?.organicMatter}
        </p>
        <p>
          <strong>CEC:</strong> {soil.fertility?.CEC}
        </p>
      </div>

      <Link to="/soil" className="mt-5 inline-block text-blue-500 underline">
        Back to Soils
      </Link>
    </div>
  ) : (
    <Loader />
  );
};

export default SoilDetails;
