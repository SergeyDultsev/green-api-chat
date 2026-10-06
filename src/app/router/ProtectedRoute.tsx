import { Navigate, Outlet } from 'react-router-dom';
import { NotificationListener } from "@modules/chat";

const PrivateRoute = () => {
    const credentials = sessionStorage.getItem('credentials');
    if (!credentials) return <Navigate to="/connect" replace />;
    return (
        <>
            <NotificationListener />
            <Outlet />
        </>
    )
}

export default PrivateRoute;