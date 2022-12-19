import { useLocation, Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
    const token = localStorage.getItem("token")
    const location = useLocation()

    return (
        token ? <Outlet /> 
        : <Navigate to="/" state={{ from: location }} replace /> )
}