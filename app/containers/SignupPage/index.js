import React, {useState, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FormControl } from '@material-ui/core';
import  {RootContext}  from "utils/auth";

import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const SignupPage = (props) => {

    //const { setAuthTokens } = useAuth();
    // const [authTokens, setAuthTokens] = useState();
    const userAuth = useContext(RootContext);
    let loading = false
     const [username, setUsername] = useState('');
     const [password1, setPassword1] = useState('');
     const [password2, setPassword2] = useState('');
     const [email, setEmail] = useState('');
     let history = useHistory();
     const submitdata = () => {

        userAuth.setloader(true)
        if ((username)&& (email) && (password1) && (password2)){
            if((password1) !== (password2)){
                userAuth.setloader(true)
                userAuth.setsnackopen([true,"Passwords are not matching. Try again!"])
                setTimeout(function(){ userAuth.setsnackopen([false,'']) }, 3000);
                return
            }
            let data = {"name":username,"email":email, "password":password1}
            const api_url = "https://api-modistabox-app.herokuapp.com/api-auth/signup/"
            //const api_url = "http://localhost:8000/api-auth/signup/"
            fetch(api_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
               body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                userAuth.setloader(false)
                if(data.msg) {
                    userAuth.setsnackopen([true,data.msg])
                    setTimeout(function(){ userAuth.setsnackopen([false,'']) }, 3000);
                    history.replace('/login');
                } else{
                    userAuth.setsnackopen([true,data.email[0]])
                    setTimeout(function(){ userAuth.setsnackopen([false,'']) }, 3000);
                }
            })
            .catch(error => {
                userAuth.setloader(false)
            })
        } else {
            userAuth.setloader(false)
            userAuth.setsnackopen([true,'Please fill all the details!'])
            setTimeout(function(){ userAuth.setsnackopen([false,'']) }, 3000);
        }
        //userAuth.setAuthenticated("true")
        //history.replace("/")
     }

     var classNames = require('classnames');
     var btnClass = classNames({
      'loader': loading,
      'not-loading': !loading,
      'sweet-loading': true
    });
    
    return (
        <React.Fragment>
            
            <Grid container
                direction="column"
                justify="center"
                alignItems="center" 
            >
            <div className="logo">Modistabox Blog</div>
            <TextField
                id="outlined-dense-multiline"
                className="form-item"
                label="Name"
                margin="dense"
                variant="outlined"
                value = {username} 
                onInput={e => setUsername(e.target.value)}
            />
            <TextField
                id="outlined-dense-multiline"
                className="form-item"
                label="Email address"
                margin="dense"
                variant="outlined"
                value = {email} 
                onInput={e => setEmail(e.target.value)}
            />
            <TextField
                id="outlined-dense-multiline"
                className="form-item"
                label="Password"
                margin="dense"
                variant="outlined"
                type="password"
                value = {password1} 
                onInput={e => setPassword1(e.target.value)}
            />
            <TextField
                id="outlined-dense-multiline"
                className="form-item"
                label="Re-enter Password"
                margin="dense"
                variant="outlined"
                type="password"
                value = {password2} 
                onInput={e => setPassword2(e.target.value)}
            />
            <Button 
                variant="contained" 
                color="primary"
                className="form-button form-item"
                onClick = {submitdata}
            >
                 Sign Up
            </Button>
            <Link to="/login" className="help-text">Click to login</Link>
        </Grid>
      </React.Fragment>
    )
}
export default SignupPage