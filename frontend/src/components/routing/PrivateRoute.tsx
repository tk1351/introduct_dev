import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isAuthenticated = useAppSelector(
    (state) => state.auth.auth.isAuthenticated
  )
  const loading = useAppSelector((state) => state.auth.auth.loading)
  return (
    // <>
    //   {!isAuthenticated && !loading ? (
    //     <Route>
    //       <Redirect to="/login" />
    //     </Route>
    //   ) : (
    //     <>{children}</>
    //   )}
    // </>
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
