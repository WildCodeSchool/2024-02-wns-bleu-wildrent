import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="admin" element={<Admin />} />
        <Route path="register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
