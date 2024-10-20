// import { useGetDistributorsQuery } from "../../../../redux/api/distributorsApi";

// const Distributorsname = () => {
//   const { data: distributors, isLoading } = useGetDistributorsQuery();

//   if (isLoading) {
//     return <p>Loading distributors...</p>;
//   }

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-bold mb-4">Distributors </h2>
//       <div className="flex flex-col gap-4">
//         {distributors?.map((distributor) => (
//           <div
//             key={distributor._id}
//             className="flex justify-between items-center  bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
//           >
//             <h3 className="text-lg text-black font-semibold">
//               {distributor.name}
//             </h3>
//             <p className="text-gray-500">{distributor.email}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Distributorsname;
