import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

export type ProtectedRouteProps = {
    authentiactionPath: string,
    target: JSX.Element
};

export default function ProtectedRoute({authentiactionPath, target}: ProtectedRouteProps) {
    const { isAuthenticated } = useContext(AuthContext);

    if(isAuthenticated) {
        return target;
    } else {
        return <Navigate to={{ pathname: authentiactionPath }} />;
    }
};