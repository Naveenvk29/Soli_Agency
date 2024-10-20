import { Link } from "react-router-dom";

const Card = ({ soil }) => {
  return (
    <div className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] h-auto flex flex-col p-5 mx-3 my-3 shadow-md">
      <div className="w-full h-[70%]">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={soil.SoilImage?.url || "/default-profile.png"}
          alt={soil.name}
        />
      </div>
      <div className="h-[25%] mt-3">
        <h3 className="font-bold text-lg">{soil.name}</h3>
        <p className="text-sm text-gray-600">{soil.type}</p>
        <Link
          to={`/soil/${soil._id}`}
          className="text-blue-500 hover:underline hover:text-blue-700"
        >
          View details
        </Link>
      </div>
    </div>
  );
};

export default Card;
