import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useWhoAmIQuery } from "../generated/graphql-types";

//Recherche recuperation de donnée pour affichage dans le front
// ainsi que de supprimer les cookies au moment du Logout
//mauvaise recuperation de donné du au cookies
// adapatation du code de karim sur notre projet mais je ne recois plus de données.
// a reprendre et faire des context je pense, voir des les fichiers a Karim.

export const UserContext = createContext({
  isLoggedIn: false,
  email: "",
  role: "",
  firstname: "",
  login: () => {},
  refetch: () => {},
});

function Layout() {
  const { data, refetch } = useWhoAmIQuery();
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    email: "",
    role: "",
    firstname: "",
  });

  const login = () => {
    setUserState({
      isLoggedIn: true,
      email: data?.whoAmI.email as string,
      role: data?.whoAmI.role as string,
      firstname: data?.whoAmI.firstname as string,
    });
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: userState.isLoggedIn,
        email: userState.email,
        role: userState.role,
        firstname: userState.firstname,
        login: login,
        refetch: refetch,
      }}
    >
      <div>
        <Navbar />
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
