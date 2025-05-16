import { useUser } from "@hooks"
import { Navigate, Outlet } from "react-router-dom";

export const PublicOnlyRoute = () => {
    const { isAuthorized } = useUser();
    if (isAuthorized) return <Navigate to={'/courses'} />
    return <Outlet />
}