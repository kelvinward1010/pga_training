import { createBrowserRouter } from "react-router-dom";
import { homeUrl, signinUrl, signupUrl } from "./urls";
import { Home, LoginPage, SignUpPage } from "../modules";


export const routerConfig = createBrowserRouter([
    {
        path: homeUrl,
        element: <Home />,
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