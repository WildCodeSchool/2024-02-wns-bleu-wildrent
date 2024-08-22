import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  email: "",
  role: "",
  refetch: () => {},
});

interface LayoutType {
  user: string;
}

function Layout({ user }: LayoutType) {
  return (
    <div>
      <Navbar user={user} />
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
