import { useGetDistributorsQuery } from "../../../redux/api/distributorsApi";
import { Link, useNavigate } from "react-router-dom";

const DistributorsList = () => {
  const { data: distributors, isLoading, isError } = useGetDistributorsQuery();

  const navigate = useNavigate();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load distributors. Please try again later.</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto py-2 ">
      <div className="my-2">
        <h2
          className="text-lg hover:underline hover:text-blue-500"
          onClick={() => navigate(-1)}
        >
          Go back
        </h2>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Distributors List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {distributors?.map((distributor) => (
          <div
            key={distributor._id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <h3 className="text-xl text-black my-3 font-semibold">
              {distributor.name}
            </h3>
            <p className="text-gray-600 text-lg font-medium my-1">
              {distributor.email}
            </p>
            <p className="text-gray-600 text-lg font-medium my-1">
              {distributor.location}
            </p>
            <Link
              to={`/admin/distributors/update/${distributor._id}`}
              className="bg-blue-500 text-white rounded-2xl hover:bg-blue-700  py-2 px-5 mt-6"
            >
              Update
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          to="/admin/distributors/create"
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Create New Distributor
        </Link>
      </div>
    </div>
  );
};

export default DistributorsList;
