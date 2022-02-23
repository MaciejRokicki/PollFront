import { Navigate } from "react-router-dom";

export type ProtectedRouteProps = {
    isAuthenticated: boolean,
    authentiactionPath: string,
    target: JSX.Element
};

export default function ProtectedRoute({isAuthenticated, authentiactionPath, target}: ProtectedRouteProps) {
    if(isAuthenticated) {
        return target;
    } else {
        return <Navigate to={{ pathname: authentiactionPath }} />;
    }
};