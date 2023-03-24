import React from 'react'
// import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'

// const PrivateRoute = ({ children, ...rest }) => {
const PrivateRoute = ({ children }) => {
  //old react version
  // const { isAuthenticated, user } = useAuth0()
  // // const isUser = true
  // const isUser = isAuthenticated && user
  // console.log(user, isAuthenticated, 'ml')
  // return (
  //   <Route
  //     {...rest}
  //     render={() => {
  //       return isUser ? children : <Redirect to="/login"></Redirect>
  //     }}
  //   ></Route>
  // )
  //new
  const { isAuthenticated, user } = useAuth0()
  const isUser = isAuthenticated && user
  if (!isUser) {
    return <Navigate to="/login" />
  }
  return children
}
export default PrivateRoute
