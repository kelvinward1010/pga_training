import { createBrowserRouter, Navigate } from "react-router-dom";
import { homeUrl, signinUrl, signupUrl } from "./urls";
import { Home, LoginPage, SignUpPage } from "../modules";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Layout from "../components/layout/Layout";

interface RouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.user);
    return isAuthenticated ? <>{children}</> : <Navigate to={signinUrl} replace />;
};


export const routerConfig = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: homeUrl,
                element: <Home />
            }
        ]
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