import { useLoggedIn } from "@hooks"
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
    const { isAuthorized } = useLoggedIn();
    if (!isAuthorized) return <Navigate to={'/login'} />
    return <Outlet/>
}