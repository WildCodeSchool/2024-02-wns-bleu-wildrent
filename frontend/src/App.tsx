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
import AccessRestriction from "./restrictions/AccessRestriction";
import NewArticle from "./pages/NewArticle";

const user = {
  role: "admin",
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<Register />} />
        <Route
          path="admin"
          element={
            <AccessRestriction user={user}>
              <Admin />
            </AccessRestriction>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
        <Route path="search/:keyword" element={<SearchPage />} />
        <Route path="search/" element={<SearchError />} />
        <Route
          path="admin/new-article"
          element={
            <AccessRestriction user={user}>
              <NewArticle />
            </AccessRestriction>
          }
        />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
