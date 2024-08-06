import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
