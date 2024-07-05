import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import NewProduct from "./pages/NewProduct";
import Layout from "./components/Layout";
import NewArticle from "./pages/NewArticle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="admin" element={<NewProduct />} />
        <Route path="admin/new-article" element={<NewArticle />} />
      </Route>
    </Routes>
  );
}

export default App;
