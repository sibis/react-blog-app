import React ,{useEffect, useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function BlogList(props) {
return (
    <Link to={"/blog/"+ props.id} style={{ textDecoration: 'none' }}> 
        <div className="blogPost">
            <div className="blogHeader"><span className="blogCreatedby"> Created by: {props.name} </span><span className="blogCreatedon">Created on: {props.createdon}</span></div>
            <span className="blogTitle">{props.title}</span>
            <span className="blogMessage">
                {props.content}
            </span>
        </div>
    </Link>
);
};