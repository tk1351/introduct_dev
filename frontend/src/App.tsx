import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-form/CreateProfile'
import PrivateRoute from './components/routing/PrivateRoute'
import setAuhtToken from './utils/setAuthToken'
import { loadUser } from './features/authSlice'
import { useAppDispatch } from './app/hooks'
import { unwrapResult } from '@reduxjs/toolkit'

import './App.css'

if (localStorage.token) {
  setAuhtToken(localStorage.token)
}

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const resultAction = dispatch(loadUser())
    unwrapResult(resultAction as any)
  }, [])
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
        </section>
      </Fragment>
    </Router>
  )
}

export default App
