import React, {useContext, Children} from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import  {RootContext}  from "./auth";

const PrivateRoutes = ({component: Component, ...rest}) => {
    const userAuth = useContext(RootContext);
    return (
        <Route {...rest}
          render={({ props }) =>
            userAuth.isAuthenticated === "true"  ? 
              <Component {...props} />
              : 
              <Redirect
                to={{
                pathname: "/login",    
              }}/> 
          }
        />
        
      );
  }

  const PrivateRoute = ({ component, ...rest }) => {
  let ComponentToRender = component;
  const userAuth = useContext(RootContext);
    return (
      <Route
        {...rest}
        render={props =>
          userAuth.isAuthenticated === "true" 
            ? (
                <ComponentToRender {...props} />
              )
            : console.log("Redirected") || (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
        }
      />
    );
  }
  export default PrivateRoute
