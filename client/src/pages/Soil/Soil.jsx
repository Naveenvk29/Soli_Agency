import { useGetSoilQuery } from "../../redux/api/soilApi";
import Card from "./Card";
import Loader from "../../components/Loader";

const Soil = () => {
  const { data } = useGetSoilQuery();
  console.log(data);

  return data?.length > 0 ? (
    <div className=" max-w-screen-xl mx-auto mt-20 flex  items-center justify-center   ">
      <div className="flex flex-wrap justify-center items-center ">
        {data?.map((soil, i) => (
          <Card key={i} soil={soil} />
        ))}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Soil;
