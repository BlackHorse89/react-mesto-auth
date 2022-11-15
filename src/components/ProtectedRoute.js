import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute ({component: Component, loggedIn, ...props}) {
  return(
    <Route>
      {loggedIn ? <Component {...props} /> : <Redirect to="/sign-up"/>}
    </Route>
  )
}
export default ProtectedRoute;