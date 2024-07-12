import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export type AccessRestrictionTypes = {
  children: ReactNode;
  user?: {
    role: string;
  };
};
const AccessRestriction: React.FC<AccessRestrictionTypes> = ({
  children,
  user,
}) => {
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AccessRestriction;
