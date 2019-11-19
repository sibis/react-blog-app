import React, {useContext, useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import  {RootContext}  from 'utils/auth';

import LoginPage from 'containers/LoginPage/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import LandingPage from 'containers/LandingPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import PrivateRoute from "utils/PrivateRoute";
import LoggedinRoute from "utils/LoggedinRoute";
import GlobalStyle from '../../global-styles';

import Loader from 'components/Loader';
import SnackBar from 'components/SnackBar';


export default function App(props) {
  const userAuth = useContext(RootContext);
  const [open,message] = userAuth.snackopen;

  return (
    <div className="app-wrapper">
     <Loader loading={userAuth.loader} />
     <SnackBar open='true' message={message}/>
      <Switch>
        <LoggedinRoute exact path="/login" component={LoginPage}>
            <LoginPage />
        </LoggedinRoute>
        <LoggedinRoute exact path="/signup" component={SignupPage}>
            <SignupPage />
        </LoggedinRoute>
        <PrivateRoute path="/" component={LandingPage} /> 
      </Switch>
      <GlobalStyle />
    </div>
  );
}
