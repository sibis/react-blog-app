import React, {useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import  {RootContext}  from "utils/auth";

export default function Loader(props) {
    const userAuth = useContext(RootContext);
    const loading = userAuth.loader;
    var classNames = require('classnames');
    var btnClass = classNames({
      'loader': loading,
      'not-loading': !loading,
      'sweet-loading': true
    });
    return (
        <div className={btnClass}>
            <ClipLoader
                sizeUnit={"px"}
                size={150}
                color={'#123abc'}
                loading={loading}
            />
        </div> 
    );
}