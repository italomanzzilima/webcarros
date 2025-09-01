import { type ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import { Navigate } from "react-router";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <div>loading....</div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
