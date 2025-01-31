import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import routes from '../routes'
import ProtectedRoute from './protectedRoute'

const AppContent = () => {
  const userRole = JSON.parse(localStorage.getItem('roles'))?.roles?.role || '';
  return (
    <CContainer className="px-3" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  element={
                    route.roles ? (
                      <ProtectedRoute
                        element={route.element}
                        roles={route.roles}
                        userRole={userRole}
                      />
                    ) : (
                      <route.element />
                    )
                  }
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)