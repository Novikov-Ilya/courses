import { useLoggedIn } from "@hooks"
import { Navigate, Outlet } from "react-router-dom";

export const PublicOnlyRoute = () => {
    const { isAuthorized } = useLoggedIn();
    if (isAuthorized) return <Navigate to={'/courses'} />
    return <Outlet/>
}