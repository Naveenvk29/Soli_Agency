import { useGetUsersQuery } from "../../../../redux/api/userApi";
import { useGetDistributorsQuery } from "../../../../redux/api/distributorsApi";
import { useGetSoilQuery } from "../../../../redux/api/soilApi";

const Realtime = () => {
  const {
    data: users,
    isLoading: loadingUsers,
    isError: errorUsers,
  } = useGetUsersQuery();
  const {
    data: distributors,
    isLoading: loadingDistributors,
    isError: errorDistributors,
  } = useGetDistributorsQuery();
  const {
    data: soils,
    isLoading: loadingSoils,
    isError: errorSoils,
  } = useGetSoilQuery();

  // Check if any of the queries are still loading
  const isLoading = loadingUsers || loadingDistributors || loadingSoils;

  return (
    <div className="w-fit h-fit md:w-[50%] lg:w-[40%] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 rounded-lg shadow-xl transform transition duration-500 ">
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        Real-time Data
      </h2>

      {isLoading ? (
        <p className="text-lg text-center animate-pulse">Loading...</p>
      ) : (
        <>
          {errorUsers && (
            <p className="text-red-200 text-center mb-2">
              Failed to load users.
            </p>
          )}
          {errorDistributors && (
            <p className="text-red-200 text-center mb-2">
              Failed to load distributors.
            </p>
          )}
          {errorSoils && (
            <p className="text-red-200 text-center mb-2">
              Failed to load soils.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-white bg-opacity-20 rounded-md">
              <p className="text-xl font-semibold">
                <strong>Users</strong>
              </p>
              <p className="text-2xl">{users?.length ?? 0}</p>
            </div>

            <div className="p-4 bg-white bg-opacity-20 rounded-md">
              <p className="text-xl font-semibold">
                <strong>Distributors</strong>
              </p>
              <p className="text-2xl">{distributors?.length ?? 0}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="p-4 bg-white bg-opacity-20 rounded-md text-center">
              <p className="text-xl font-semibold">
                <strong>Soils</strong>
              </p>
              <p className="text-2xl">{soils?.length ?? 0}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Realtime;
