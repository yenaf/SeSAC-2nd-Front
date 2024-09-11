import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserContext } from '../../hooks/useAuth';

export default function ProtectedRoute({ element: Element, ...rest }) {
  const { isLogin, isAdmin, isSeller, isBlackList } = useSelector(
    (state) => state.login,
  );

  const { loading, user } = React.useContext(UserContext);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-inner"></div>
      </div>
    );
  }

  if (!isLogin) {
    return <Navigate to="/" />;
  }

  return <Element {...rest} />;
}
