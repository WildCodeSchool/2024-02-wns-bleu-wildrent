import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export type AccessRestrictionTypes = {
  children: ReactNode;
  user: string;
};
const AccessRestriction: React.FC<AccessRestrictionTypes> = ({
  children,
  user,
}) => {
  if (!user || user !== "admin" && user !== "user") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AccessRestriction;
