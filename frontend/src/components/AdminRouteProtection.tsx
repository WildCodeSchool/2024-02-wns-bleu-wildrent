import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./Layout";

function AdminRouteProtection({ children }: { children: React.ReactNode }) {
  const userInfo = useContext(UserContext);

  if (!userInfo.isLoggedIn || userInfo.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default AdminRouteProtection;
