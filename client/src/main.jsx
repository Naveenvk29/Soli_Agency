import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import store from "./redux/store.js";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// auth routes
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

// user routes
import PrivateRoutes from "./pages/User/PrivateRoutes.jsx";
import Profile from "./pages/User/Profile.jsx";
import DistributoresDetails from "./pages/Distributors/DistributoresDetails.jsx";

// public routes
import Home from "./pages/Home/Home.jsx";
import Distributores from "./pages/Distributors/Distributores.jsx";
import Soil from "./pages/Soil/Soil.jsx";
import About from "./pages/About.jsx";

// admin routes
import AdminRoutes from "./pages/Admin/AdminRoutes.jsx";
import CreateSoil from "./pages/Admin/Soil/CreateSoil.jsx";
import UpdateSoil from "./pages/Admin/Soil/UpdateSoil.jsx";
import CreateDistributer from "./pages/Admin/Distributors/CreateDistributer.jsx";
import UpdateDistributer from "./pages/Admin/Distributors/UpdataDistributer.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/distributors" element={<Distributores />} />
      <Route path="/soil" element={<Soil />} />
      <Route path="/about" element={<About />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="" element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/distributors/:id" element={<DistributoresDetails />} />
      </Route>
      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/soil/create" element={<CreateSoil />} />
        <Route path="/admin/soil/update/:id" element={<UpdateSoil />} />
        <Route
          path="/admin/distributors/create"
          element={<CreateDistributer />}
        />
        <Route
          path="/admin/distributors/update/:id"
          element={<UpdateDistributer />}
        />
        {/* Add more admin routes here */}
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
