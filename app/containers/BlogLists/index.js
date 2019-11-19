import React ,{useState,useEffect, useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import {BLOG_LIST_URL} from 'utils/constants';
import  {RootContext}  from "utils/auth";
import BlogList from 'components/BlogList';

 const BlogLists = () => {

  const [result,setresult] = useState([])
  const userAuth = useContext(RootContext);
  const fetchBlogs = () => {
      fetch(BLOG_LIST_URL, {
        method: 'GET',
        headers: {
            'Authorization': 'Token '+userAuth.accesstoken, 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        })
        .then(response => response.json())
        .then(data => {
            userAuth.setloader(false)
            setresult(data.data)
            //setTimeout(function(){ userAuth.setsnackopen([false,'']) }, 3000);
        })
        .catch(error => {
            userAuth.setloader(false)
            console.error(error)
        })
  }

  useEffect(() => {
     fetchBlogs()
  }, []);

  
  return (
        <div className="blogContent">   
            {result.map((data, index) => (
                    <BlogList key={data.id} id={data.id} name={data.created_by.name} createdon={data.created_on} createdby={data.created_by.email}  title={data.title} content={data.content}/>
            ))}      
        </div>
  );
};

export default BlogLists;