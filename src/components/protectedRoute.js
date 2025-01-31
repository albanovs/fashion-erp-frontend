import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, roles, userRole }) => {
    const hasPermission = roles.some(role => userRole.includes(role));

    if (!hasPermission) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Element />;
};

export default ProtectedRoute;
