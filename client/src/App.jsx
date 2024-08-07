// import { useState } from "react";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
const App = () => {
  return (
    <>
      <ToastContainer />
      <div>
        <Navigation />
        <Outlet />
      </div>
    </>
  );
};

export default App;
