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
  refetch: () => {},
});

interface LayoutType {
  user: string;
}
function Layout({ user }: LayoutType) {
  const { data, refetch, loading, error } = useWhoAmIQuery();

  if (loading) {
    return <p>Loading </p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Error</p>;
  }

  if (data)
    return (
      <UserContext.Provider
        value={{
          isLoggedIn: data?.whoAmI.isLoggedIn,
          email: data?.whoAmI.email ?? "",
          role: data?.whoAmI.role ?? "",
          firstname: data?.whoAmI.firstname ?? "",
          refetch: refetch,
        }}
      >
        <div>
          <Navbar user={user} />
          <main className="main-content m-10">
            <Outlet />
          </main>
          <div className="flex justify-center">
            <Footer />
          </div>
        </div>
      </UserContext.Provider>
    );
}
export default Layout;
