import React, {useContext} from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import  {RootContext}  from "./auth";


  function LoggedinRoute({ children }) {
    const userAuth = useContext(RootContext);
  
    return (
      <Route
        render={({ location }) =>
        userAuth.isAuthenticated === "false" ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default LoggedinRoute
