import AsideBar from "./Dash-components/AsideBar";
import Main from "./Dash-components/Main";
const AdminDashbord = () => {
  return (
    <div>
      <div className="flex gap-5 h-screen ">
        <AsideBar />
        <Main />
      </div>
    </div>
  );
};

export default AdminDashbord;
