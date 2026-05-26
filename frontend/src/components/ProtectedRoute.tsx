import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/useAuth';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  // 1. read the auth context 
  const { token } = useAuth();

  // 2. if no token, return <Navigate to="/login" />
  if (!token) {
    return <Navigate to="/login" />;
  }
  // 3. otherwise, return children
  return children;
}