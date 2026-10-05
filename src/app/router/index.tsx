import HomePage from "@/pages/HomePage.tsx";
import ConnectPage from "@/pages/ConnectPage.tsx";
import ChatPage from "@/pages/ChatPage.tsx";
import ProtectedRoute from "@app/router/ProtectedRoute.tsx";

export interface IRouter {
    path?: string;
    element?: React.JSX.Element;
    children?: IRouter[];
}

export const routers: IRouter[] = [
    {
        path: '/connect',
        element: <ConnectPage />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/chat/:id',
                element: <ChatPage />,
            },
        ],
    },
];