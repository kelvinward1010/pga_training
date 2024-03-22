import { createBrowserRouter, Navigate } from "react-router-dom";
import { homeUrl, signinUrl, signupUrl } from "./urls";
import { Home, LoginPage, SignUpPage } from "../modules";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface RouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.user);
    return isAuthenticated ? <>{children}</> : <Navigate to={signinUrl} replace />;
};


export const routerConfig = createBrowserRouter([
    {
        path: homeUrl,
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: signupUrl,
        element: <SignUpPage />
    },
    {
        path: signinUrl,
        element: <LoginPage />
    }
])