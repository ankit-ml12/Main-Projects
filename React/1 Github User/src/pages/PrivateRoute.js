import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated, user } = useAuth0()
  // const isUser = true
  const isUser = isAuthenticated && user
  console.log(user, isAuthenticated, 'ml')
  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to="/login"></Redirect>
      }}
    ></Route>
  )
}
export default PrivateRoute
