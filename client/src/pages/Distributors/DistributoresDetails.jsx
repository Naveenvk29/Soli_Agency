import { useGetDistributorByIdQuery } from "../../redux/api/distributorsApi";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

const DistributoresDetails = () => {
  const { id: distributorId } = useParams();
  const navigate = useNavigate();

  // Fetch distributor data
  const { data: distributor, isLoading: distributorLoading } =
    useGetDistributorByIdQuery(distributorId);
  console.log(distributor);

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

      <div className="w-full h-full flex gap-10 my-10 ">
        <div className="w-[50%] h-[50%]">
          <img
            className="rounded-2xl shadow-[8px_10px_15px_10px_rgba(200,200,250,0.3)]"
            src={distributor.profilePic.url}
            alt=""
          />
        </div>
        <div className="w-[40%] ">
          <h1 className="text-3xl font-black uppercase mb-5">
            {distributor.name}
          </h1>
          <h4 className="text-md font-medium leading-7 ">
            {distributor.description}
          </h4>
        </div>
      </div>
      <div className="flex items-center justify-center  gap-52">
        <div className="mr-5">
          <h2 className="text-lg mb-3 font-medium ">
            <strong>
              <i className="mr-2 ri-phone-line"></i>
              Phone:{" "}
            </strong>{" "}
            {distributor.contact}
          </h2>
          <h2 className="text-lg mb-3 font-medium ">
            <strong>
              <i className="mr-2 ri-mail-line"></i> Email:
            </strong>{" "}
            {distributor.email}
          </h2>
          <h2 className="text-lg mb-3 font-medium ">
            <i className="mr-2 ri-user-location-fill"></i>
            <strong>Location:</strong> {distributor.location}
          </h2>
        </div>

        <div className="flex flex-col justify-center items-start">
          <h3 className="text-3xl mb-5 font-bold capitalize">Soils Provided</h3>
          {soils?.map((soil) => (
            <Link key={soil._id} to={`/soil/${soil._id}`}>
              <p className="text-lg my-1 font-semibold hover:cursor-pointer hover:underline hover:text-blue-600 ">
                {soil.name}
              </p>
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
