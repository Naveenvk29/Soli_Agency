import { Link } from "react-router-dom";

const AsideBar = () => {
  return (
    <div className="w-[20%] mt-2 h-screen flex flex-col items-start  gap-6  p-10">
      <Link
        to="/admin/distributors/create"
        className="text-white text-xl font-semibold hover:bg-blue-400 px-4 py-2 rounded-xl duration-500 "
      >
        Create Distributors
      </Link>
      <Link
        className="text-white text-xl font-semibold hover:bg-blue-400 px-4 py-2 rounded-xl duration-500 "
        to="/admin/distributors-list"
      >
        Distributors list
      </Link>
      <Link
        to="/admin/soil/create"
        className="text-white text-xl font-semibold hover:bg-blue-400 px-4 py-2 rounded-xl duration-500 "
      >
        create Soil
      </Link>
      <Link
        to="/admin/soil-list"
        className="text-white text-xl font-semibold hover:bg-blue-400 px-4 py-2 rounded-xl duration-500 "
      >
        Soil list
      </Link>
    </div>
  );
};

export default AsideBar;
