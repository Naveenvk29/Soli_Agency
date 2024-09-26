import { useGetDistributorsQuery } from "../../redux/api/distributorsApi";
import Card from "./Card";
const Distributores = () => {
  const { data: distributors } = useGetDistributorsQuery();
  return (
    <div className=" max-w-screen-xl mx-auto mt-20 flex  items-center justify-center   ">
      <div className="flex flex-wrap justify-center items-center ">
        {distributors?.map((distributor, i) => (
          <>
            <Card key={i} data={distributor} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Distributores;
