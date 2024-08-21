import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import ProductDescription from "./pages/ProductDescription";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
        <Route path="/reservation/:reservationId" element={<Reservation/>} />
      </Route>
    </Routes>
  );
}

export default App;
