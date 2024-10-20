import AsideBar from "./Dash-components/AsideBar";
import Main from "./Dash-components/Main";

const AdminDashboard = () => {
  return (
    <div className=" relative flex flex-col md:flex-row h-screen overflow-hidden">
      <AsideBar />
      <Main />
    </div>
  );
};

export default AdminDashboard;
