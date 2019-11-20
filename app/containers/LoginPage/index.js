import React, {useState, useContext} from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import  {RootContext}  from "utils/auth";
import { LOGIN_URL } from "utils/constants";
import SnackBar from 'components/SnackBar';

import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const LoginPage = () => {
    const userAuth = useContext(RootContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const submitdata = () => {
        userAuth.setloader(true);
        if ((username)&& (password)){
            let data = {
                "username":username, 
                "password":password
            };
            fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
               body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                userAuth.setloader(false);
                if(data.token) {
                    userAuth.setaccesstoken(data.token);
                    userAuth.setAuthenticated("true");
                    history.replace('/');
                } else if(data.error) {
                    userAuth.setsnackopen([true,data.error]);
                    setTimeout(function(){ userAuth.setsnackopen([false,'']); }, 3000);
                }
            })
            .catch(error => {
                userAuth.setloader(false);
            })
        } else {
            userAuth.setloader(false);
            userAuth.setsnackopen([true,'Please fill the details!']);
            setTimeout(function(){ userAuth.setsnackopen([false,'']); }, 3000);
        }
    }  
    
    return (
        <React.Fragment>
            <Grid container
                direction="column"
                justify="center"
                alignItems="center" 
            >
            <div className="logo">Microblog</div>
            <TextField
                id="outlined-dense-multiline"
                className="form-item"
                label="Email address"
                margin="dense"
                variant="outlined"
                value = {username} 
                onInput={e => setUsername(e.target.value)}
            />
            <TextField
                id="outlined-dense-multiline"
                className="form-item"
                label="Password"
                margin="dense"
                variant="outlined"
                type="password"
                value = {password} 
                onInput={e => setPassword(e.target.value)}
            />
            <Button 
                variant="contained" 
                color="primary"
                className="form-button form-item"
                onClick = {submitdata}
            >
                 Sign In
            </Button>
            <Link to="/signup" className="help-text">Click here to Signup</Link>
        </Grid>
      </React.Fragment>
    )
}
export default LoginPage