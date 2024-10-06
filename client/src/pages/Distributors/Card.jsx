import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div className="w-[26vw] h-[60vh] flex flex-col p-5 mb-8 ml-6 shadow-[8px_10px_20px_3px_rgba(200,200,250,0.1)] object-cover">
      <div className="w-full h-[80%]">
        <img
          className="w-full h-full object-cover"
          src={data.profilePic?.url || "/default-profile.png"} // Handle missing profilePic
          alt={data.name}
        />
      </div>
      <div className="h-[15%] mt-3">
        <h3>{data.name}</h3>
        <p>{data.location}</p>
        <Link to={`/distributors/${data._id}`}>View Profile</Link>
      </div>
    </div>
  );
};

export default Card;
