import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

export default function AuthenticatedRoute({ children }: { children: any }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${pathname}${search}`} />;
  }
  return children;
}
