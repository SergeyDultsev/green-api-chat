import HomePage from "../pages/HomePage.tsx";
import ConnectPage from "../pages/ConnectPage.tsx";
import ChatPage from "../pages/ChatPage.tsx";

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
    },
    {
        path: '/chat/:id',
        element: <ChatPage />
    }
];