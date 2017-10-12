import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Spinner from './components/Spinner'

/**
 * Ensure user logged otherwise redirect them to login
 *
 */
export const AuthRoute = connect(({ auth }) => ({ auth }))(({
  component,
  auth,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (auth.authenticatingWithToken || auth.loginLoading) {
        // Show nothing or a cool loading spinner
        return <Spinner />
      }
      // User authenticated
      if (auth.user) {
        return React.createElement(component, props)
      }
      // User not authenticated, redirect to login
      return (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      )
    }}
  />
))

/**
 * Wait for auth loading before rendering route component
 * (needed for first time local storage auth...)
 *
 */
export const MaybeAuthRoute = connect(({ auth }) => ({ auth }))(({
  component,
  auth,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (auth.authenticatingWithToken || auth.loginLoading) {
        // Show nothing or a cool loading spinner
        return <Spinner centered />
      }
      // Always render route component
      return React.createElement(component, props)
    }}
  />
))

/**
 * Redirect to home when user logged in
 *
 */
export const GuestRoute = connect(({ auth }) => ({ auth }))(({
  component,
  auth,
  to = '/',
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (auth.user) {
        return (
          <Redirect
            to={{
              pathname: to,
            }}
          />
        )
      }

      if (auth.authenticatingWithToken) {
        return <Spinner centered />
      }

      return React.createElement(component, props)
    }}
  />
))
