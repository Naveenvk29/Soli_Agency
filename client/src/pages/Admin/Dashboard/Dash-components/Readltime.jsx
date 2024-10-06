import { useGetUsersQuery } from "../../../../redux/api/userApi";
import { useGetDistributorsQuery } from "../../../../redux/api/distributorsApi";
import { useGetSoilQuery } from "../../../../redux/api/soilApi";

const Realtime = () => {
  const { data: users } = useGetUsersQuery();
  const { data: distributors } = useGetDistributorsQuery();

  const { data: soils } = useGetSoilQuery();

  return (
    <div className="w-[40%] bg-gray-100 text-black p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Real-time Data</h2>
      <div className="flex justify-around">
        <p className="text-lg">
          <strong>Users:</strong> {users?.length ?? 0}
        </p>
        <p className="text-lg">
          <strong>Distributors:</strong> {distributors?.length ?? 0}
        </p>
      </div>
      <div className="flex justify-around mt-4">
        <p className="text-lg">
          <strong>Soils:</strong> {soils?.length ?? 0}
        </p>
      </div>
    </div>
  );
};

export default Realtime;
