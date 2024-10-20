import { useGetSoilQuery } from "../../../redux/api/soilApi";
import { Link, useNavigate } from "react-router-dom";

const SoilList = () => {
  const { data: soils } = useGetSoilQuery();
  console.log(soils);

  const navigate = useNavigate();

  return (
    <div className="max-w-screen-lg mx-auto p-5">
      <div className="my-2">
        <h2
          className="text-lg hover:underline hover:text-blue-500"
          onClick={() => navigate(-1)}
        >
          Go back
        </h2>
      </div>
      <h1 className="text-3xl font-bold mb-6">Soil List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {soils?.map((soil) => (
          <div
            key={soil._id}
            className="p-4 border rounded-lg shadow-md bg-white "
          >
            <h3 className="text-xl text-black my-3 font-semibold">
              {soil.name}
            </h3>
            <p className="text-gray-600 text-lg font-medium my-1">
              {soil.type}
            </p>
            <p className="text-gray-600 text-lg font-medium my-1">
              {soil.temperature}
            </p>
            <Link
              to={`/admin/soil/update/${soil._id}`}
              className="bg-blue-500 text-white rounded-2xl hover:bg-blue-700  py-2 px-5 mt-6"
            >
              Update
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link
          to="/admin/soil/create"
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Create New soil
        </Link>
      </div>
    </div>
  );
};

export default SoilList;
