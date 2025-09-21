import { Suspense, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { setAuthChecked } from "./redux-rtk/auth/authSlice";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./components/PrivateRoute";
import { mainPageRoutes, dashboardPageRoutes } from "./data/routesData";
import Dashboard from "./layout/Dashboard";
import { DHome } from "./dashboardPages";
import { Home } from "./pages";
// import InitialLoader from "./components/InitialLoader";

const App = () => {
  const dispatch = useDispatch();
  const { checkAuth } = useAuth();
  const authChecked = useSelector((state) => state.auth.authChecked);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const initialCheckDone = useRef(false);

  useEffect(() => {
    // Only run initial auth check once on app start
    if (!initialCheckDone.current) {
      initialCheckDone.current = true;

      if (accessToken) {
        checkAuth();
      } else {
        // If no token, mark auth as checked to avoid loading state
        dispatch(setAuthChecked());
      }
    }
  }, [checkAuth, accessToken, dispatch]);

  // Don't show loading for public routes when there's no token
  // if (!authChecked && accessToken) {
  //   return (
  //     <div className="h-screen w-screen flex justify-center items-center">
  //       <img
  //         src="/images/loading-logo.png"
  //         className="w-[10%] aspect-square"
  //         alt="Loading..."
  //       />
  //       <p className="text-center text-headerColor">Please Wait..</p>
  //     </div>
  //   );
  // }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {mainPageRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute requiredRoles={["admin", "superadmin"]}>
            <Dashboard />
          </PrivateRoute>
        }
      >
        <Route index element={<DHome />} />
        {dashboardPageRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default App;
