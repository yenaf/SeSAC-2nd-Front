import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({
  element: Element,
  requiredRole,
  ...rest
}) {
  const { isLogin, isAdmin, isSeller, isBlackList } = useSelector(
    (state) => state.login,
  );

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'seller' && !isSeller && isBlackList) {
    return <Navigate to="/" />;
  }
  return <Element {...rest} />;
}
