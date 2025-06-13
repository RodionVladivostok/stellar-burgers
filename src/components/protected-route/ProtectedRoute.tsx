import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  unAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ unAuth, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.success);
  const isLoading = useSelector((state) => state.auth.loading);
  if (isLoading) {
    return <Preloader />;
  }

  if (!isAuthenticated && !unAuth) {
    return <Navigate replace to={'/login'} state={{ from: location }} />;
  }

  if (isAuthenticated && unAuth) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }
  return children;
};
