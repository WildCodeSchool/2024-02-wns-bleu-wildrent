import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  email: "",
  firstname: "",
  role: "",
  refetch: () => {},
});

function Layout() {
  return (
    <div>
      <Navbar />
      <main className="main-content m-10">
        <Outlet />
      </main>
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
