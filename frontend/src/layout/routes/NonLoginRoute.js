import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function NonLoginRoute({
  element: Element,
  requiredRole,
  ...rest
}) {
  const { isLogin } = useSelector((state) => state.login);

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
}
