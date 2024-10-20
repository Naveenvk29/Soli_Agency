import { useGetSoilQuery } from "../../redux/api/soilApi";
import Card from "./Card";
import Loader from "../../components/Loader";

const Soil = () => {
  const { data } = useGetSoilQuery();

  return data?.length > 0 ? (
    <div className="max-w-screen-xl mx-auto mt-20 flex flex-wrap justify-center">
      {data.map((soil, i) => (
        <Card key={i} soil={soil} />
      ))}
    </div>
  ) : (
    <Loader />
  );
};

export default Soil;
