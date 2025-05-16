import { useUser } from "@hooks"
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isAuthorized } = useUser();
    if (!isAuthorized) return <Navigate to={'/login'} />
    return <Outlet />
}