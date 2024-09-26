import { useGetSoilByIdQuery } from "../../redux/api/soilApi";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const SoilDetails = () => {
  const { id } = useParams();
  const { data: soil, isLoading } = useGetSoilByIdQuery(id);

  const navigate = useNavigate();
  if (isLoading) {
    return <Loader />;
  }

  return soil ? (
    <div className="max-w-screen-lg mx-auto mt-5">
      <h3
        onClick={() => navigate(-1)}
        className="my-5 text-lg hover:underline hover:text-gray-400"
      >
        Go back
      </h3>
      <h1 className="text-3xl my-10 font-bold">Soil Details</h1>
      <div className="w-full flex gap-10 ">
        <div className="w-[60%]">
          <img className="" src={soil.SoilImage?.url} alt={soil.name} />
        </div>
        <div className="w-[20%]">
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
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default SoilDetails;
