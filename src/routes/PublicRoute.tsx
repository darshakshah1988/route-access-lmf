import { Route, Redirect, RouteProps } from 'react-router-dom'
import { isAuthenticated } from '../auth'

export const PublicRoute = (props: RouteProps) => {
  const condition = isAuthenticated()

  return condition
    ? (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
    : (<Route {...props} />)
}