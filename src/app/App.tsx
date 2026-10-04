import AppProviders from "../providers/AppProviders.tsx";
import { Routes, Route } from 'react-router-dom';
import { routers } from "./router.tsx";

const App = () => {
  return (
      <AppProviders>
        <div className="bg-[#17181c] h-screen w-full">
            <Routes>
                {routers.map(route => (
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                ))}
            </Routes>
        </div>
      </AppProviders>
  )
}

export default App;