import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import NewProduct from "./pages/NewProduct";
import NewArticle from "./pages/NewArticle";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import ProductDescription from "./pages/ProductDescription";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="admin" element={<NewProduct />} />
        <Route path="admin/new-article" element={<NewArticle />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
      </Route>
    </Routes>
  );
}

export default App;
