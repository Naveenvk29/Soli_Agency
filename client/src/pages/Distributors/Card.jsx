import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div className="w-[90vw] sm:w-[45vw] lg:w-[26vw] h-[40vh] sm:h-[50vh] lg:h-[60vh] flex flex-col p-5 mb-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 object-cover">
      <div className="w-full h-[70%]">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={data.profilePic?.url || "/default-profile.png"} // Handle missing profilePic
          alt={data.name}
        />
      </div>
      <div className="h-[30%] mt-3">
        <h3 className="text-lg font-bold">{data.name}</h3>
        <p className="text-sm text-gray-500">{data.location}</p>
        <Link
          to={`/distributors/${data._id}`}
          className="text-blue-500 hover:underline mt-2 block"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default Card;
