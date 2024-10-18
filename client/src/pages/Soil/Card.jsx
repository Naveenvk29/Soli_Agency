import { Link } from "react-router-dom";

const Card = ({ soil }) => {
  return (
    <div className="w-full md:w-[26vw] h-auto md:h-[60vh] flex flex-col p-5 ml-6 shadow-md object-cover">
      <div className="w-full h-[80%]">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={soil.SoilImage?.url || "/default-profile.png"}
          alt={soil.name}
        />
      </div>
      <div className="h-[15%] mt-3">
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
