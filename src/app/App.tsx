import AppProviders from "../providers/AppProviders.tsx";
import { Routes, Route } from 'react-router-dom';
import { type IRouter, routers } from "./router";

const App = () => {

  const renderRoutes = (routes: IRouter[]) => {
      return routes.map((route: IRouter) => (
          <Route
              path={route.path}
              element={route.element}
              key={route.path ?? 'protected'}
          >
              {route.children && renderRoutes(route.children)}
          </Route>
      ));
  }

  return (
      <AppProviders>
        <div className="bg-[#17181c] h-screen w-full">
            <Routes>
                {renderRoutes(routers)}
            </Routes>
        </div>
      </AppProviders>
  )
}

export default App;
