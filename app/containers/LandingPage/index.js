import React, {useState,useContext} from 'react';
import { Switch, Route, useRouteMatch, Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BlogLists from '../BlogLists/Loadable';
import BlogView from '../BlogView/Loadable';
import PrivateRoute from "../../utils/PrivateRoute";
import  { RootContext }  from "utils/auth";
import Loader from 'components/Loader';
import { LOGOUT_URL } from "utils/constants";

const useStyles = makeStyles(theme => ({
  appclass: {
      background: '#fdf9f3;',
      color: 'black',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainContent: {
      height: '100%',
  },
}));

export default function LandingPage() {
  const userAuth = useContext(RootContext);
  const classes = useStyles();

  let history = useHistory();
  const logOut = () => {
    userAuth.setloader(true);
    userAuth.setAuthenticated("false");
    fetch(LOGOUT_URL, {
        method: 'PUT',
        headers: {
            'Authorization': 'Token '+userAuth.accesstoken, 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        userAuth.setloader(false);
        if(data.msg) {
            userAuth.setAuthenticated("false");
            history.replace('/login');
            userAuth.setsnackopen([true,data.msg]);
        }
    })
    .catch(error => {
        userAuth.setloader(false);
        userAuth.setAuthenticated("false");
        history.replace('/login');
    })
  }

  return (
    <div className="mainContent">  
        
        <AppBar position="static" className={classes.appclass} >
        
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
               <Link to="/" style={{ textDecoration: 'none' }}> Blog App </Link>
            </Typography>
            <Link to="/blog/create" style={{ textDecoration: 'none' }}>  
                <Button color="inherit">Create</Button>
            </Link>
            <Button color="inherit" onClick = {logOut}>Logout</Button>
        </Toolbar>
        </AppBar>

        <Switch>
            <PrivateRoute exact path="/" component={BlogLists} />
            <PrivateRoute exact path="/blog/:blogId" component={BlogView} />
            
        </Switch>
    </div>
    );
}