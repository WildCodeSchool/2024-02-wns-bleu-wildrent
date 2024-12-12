import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./Layout";
import { Role } from "../interface/types";

function AdminRouteProtection({ children }: { children: React.ReactNode }) {
  const userInfo = useContext(UserContext);

  if (!userInfo.isLoggedIn || userInfo.role !== Role.Admin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminRouteProtection;
