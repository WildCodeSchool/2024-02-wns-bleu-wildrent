import { Navigate } from "react-router-dom";

const AccessRestriction = ({ children, user }) => {
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AccessRestriction;
