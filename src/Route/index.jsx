import React, {Suspense, lazy} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {STYLE_LOADER, COLOR_LOADER, listRouter} from './constant';
import {Spinner} from 'react-spinners-css';

const RouterComponent = () => {
  const token = localStorage.getItem('token')
  const admin = localStorage.getItem('admin')
  const renderPrivate = (subRouter) => {
    const Component = lazy(() => import(`../containers/${subRouter.component}`))

    return <Route
        key={subRouter.key}
        exact
        path={subRouter.path}
        element={token ? <Component/> : <Navigate to="/sign-in"/>}
      />
  }

  const renderAdmin = (subRouter) => {
    const Component = lazy(() => import(`../containers/${subRouter.component}`))

    return <Route
        key={subRouter.key}
        exact
        path={subRouter.path}
        element={token && admin ? <Component/> : <Navigate to="/"/>}
      />
  }

  const renderPublic = (subRouter) => {
    const Component = lazy(() => import(`../containers/${subRouter.component}`))

    return <Route
        key={subRouter.key}
        exact
        path={subRouter.path}
        element={token ? <Navigate to="/"/> : <Component/>}
      />
  }

  return (
    <Suspense fallback={<div style={STYLE_LOADER}><Spinner color={COLOR_LOADER}/></div>}>
      <Routes>
        <Route element={<Navigate exact from='/' to='/'/>}/>
        {
          listRouter.map((subRouter) => {
            if (subRouter.auth && subRouter.admin) {
              return renderAdmin(subRouter)
            } else if (subRouter.auth) {
              return renderPrivate(subRouter)
            }
            return renderPublic(subRouter)
          })
        }
        <Route path="*" element={<Navigate to='/'/>}/>
      </Routes>
    </Suspense>
  );
}

export default RouterComponent