import React,{useContext} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import  {RootContext}  from "utils/auth";

export default function SnackBar(props) {
  const userAuth = useContext(RootContext);
  const [open,message] = userAuth.snackopen;
return (
    <Snackbar
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={3}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
);
};