import { useGetDistributorByIdQuery } from "../../redux/api/distributorsApi";
// import { useGetSoilByIdQuery } from "../../redux/api/soilApi";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

const DistributoresDetails = () => {
  const { id: distributorId } = useParams();
  const navigate = useNavigate();

  // Fetch distributor data
  const { data: distributor, isLoading: distributorLoading } =
    useGetDistributorByIdQuery(distributorId);

  // State to store fetched soils
  const [soils, setSoils] = useState([]);
  const [soilsLoading, setSoilsLoading] = useState(true);

  useEffect(() => {
    const fetchSoils = async () => {
      if (distributor?.soil) {
        const soilPromises = distributor.soil.map((soilId) =>
          fetch(`/api/soils/${soilId}`).then((res) => res.json())
        );
        const fetchedSoils = await Promise.all(soilPromises);
        setSoils(fetchedSoils);
        setSoilsLoading(false);
      }
    };
    fetchSoils();
  }, [distributor]);

  const isLoading = distributorLoading || soilsLoading;

  if (isLoading) {
    return <Loader />;
  }

  return distributor ? (
    <div className="max-w-screen-xl mx-auto mt-5 ">
      <h3
        onClick={() => navigate(-1)}
        className="text-lg font-medium hover:underline hover:text-[#ECDFCC]"
      >
        Go back
      </h3>

      <div className="mt-5 relative w-full flex flex-col items-center mx-auto">
        <div className="flex flex-col items-center w-[50%]">
          <img src={distributor.profilePic?.url} alt={distributor.name} />
        </div>

        <div className="">
          <h1 className="text-4xl font-bold my-5">{distributor.name}</h1>
          <p>Email: {distributor.email}</p>
          <p>Address: {distributor.location}</p>
          <p>Phone: {distributor.contact}</p>
          <p>Description: {distributor.description}</p>

          <h2 className="text-2xl font-bold mt-4">Soil Types:</h2>
          {soils?.map((soil) => (
            <Link key={soil._id} to={`/api/soil/${soil._id}`}>
              <p>{soil.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default DistributoresDetails;
