import HomePage from "../pages/HomePage.tsx";
import ConnectPage from "../pages/ConnectPage.tsx";

interface IRouter {
    path: string;
    element: React.JSX.Element;
}

export const routers: IRouter[] = [
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/connect',
        element: <ConnectPage />
    }
];