import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import NewProduct from "./pages/NewProduct";
import Layout from "./components/Layout";
import NewArticle from "./pages/NewArticle";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="admin" element={<NewProduct />} />
        <Route path="admin/new-article" element={<NewArticle />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
