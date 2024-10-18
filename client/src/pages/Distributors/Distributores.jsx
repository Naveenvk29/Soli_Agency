import { useGetDistributorsQuery } from "../../redux/api/distributorsApi";
import Card from "./Card";
import Loader from "../../components/Loader";

const Distributores = () => {
  const { data: distributors } = useGetDistributorsQuery();

  return distributors?.length > 0 ? (
    <div className="max-w-screen-xl mx-auto mt-10 p-5">
      <div className="flex flex-wrap justify-center gap-8">
        {distributors?.map((distributor, i) => (
          <Card key={i} data={distributor} />
        ))}
      </div>
    </div>
  ) : (
    <div className="max-w-screen-xl mx-auto mt-20">
      <Loader />
    </div>
  );
};

export default Distributores;
