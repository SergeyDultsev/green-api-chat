import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const credentials = sessionStorage.getItem('credentials');
    if (!credentials) return <Navigate to="/connect" replace />;
    return <Outlet />
}

export default PrivateRoute;