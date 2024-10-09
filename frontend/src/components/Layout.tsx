import { createContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useWhoAmIQuery } from "../generated/graphql-types";

export const UserContext = createContext({
  isLoggedIn: false,
  email: "",
  role: "",
  firstname: "",
  lastname: "",
  refetch: () => {},
});

function Layout() {
  const { data, refetch, loading, error } = useWhoAmIQuery();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  if (data) {
    return (
      <UserContext.Provider
        value={{
          isLoggedIn: data.whoAmI.isLoggedIn,
          email: data.whoAmI.email ?? "",
          role: data.whoAmI.role ?? "",
          firstname: data.whoAmI.firstname ?? "",
          lastname: data.whoAmI.lastname ?? "",
          refetch: refetch,
        }}
      >
        <div>
          <Navbar />
          <main>
            <Outlet />
          </main>
          <div className="flex justify-center">
            <Footer />
          </div>
        </div>
      </UserContext.Provider>
    );
  }

  return null;
}

export default Layout;
