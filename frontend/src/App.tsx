import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import ProductDescription from "./pages/ProductDescription";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import SearchPage from "./pages/search/[searchKeywords]";
import SearchError from "./pages/search/SearchError";
import Profile from "./pages/Profile";
import { Cart } from "./pages/Cart";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<Admin />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
        <Route path="search/:keyword" element={<SearchPage />} />
        <Route path="search/" element={<SearchError />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default App;
