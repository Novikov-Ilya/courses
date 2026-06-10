import { useUser } from "@hooks"
import { UserRoles } from "@store/types";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ adminOnly = false }) => {
  const { isAuthorized, userRole } = useUser();

  if (!isAuthorized) return <Navigate to={'/login'} />;
  if (adminOnly && userRole !== UserRoles.ADMIN) return <Navigate to={'/courses'} />;
  
  return <Outlet />;
};