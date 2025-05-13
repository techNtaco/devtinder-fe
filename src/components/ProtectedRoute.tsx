import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../app/store";

const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;