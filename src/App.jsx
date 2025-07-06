import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './website/Home';
import Register from './website/Register';
import Login from './website/Login';
import Cart from './website/Cart';
import ViewProduct from './website/ViewProduct';
import Navhead from './website/Navhead';

const MainLayout = () => (
  <>
    <Navhead />
    <Outlet />
  </>
);
const AuthLayout = () => (
  <>
    <Outlet />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Routes without Navhead */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
        </Route>

        {/* Routes with Navhead */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/viewproduct/:id" element={<ViewProduct />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
