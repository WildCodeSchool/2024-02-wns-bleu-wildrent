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
import Profile from "./pages/Profile";

const App = () => {

  const user = "admin";

  return (
    <Routes>
      <Route path="/" element={<Layout user={user}/>}>
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
        <Route
          path="profile"
          element={
            <AccessRestriction user={user}>
              <Profile />
            </AccessRestriction>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
        <Route path="search/:keyword" element={<SearchPage />} />
        <Route path="search/" element={<SearchError />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
