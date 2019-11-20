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
import { Button, TextField } from '@material-ui/core';
import  {RootContext}  from "utils/auth";
import BlogList from 'components/BlogList';

 const BlogLists = () => {

  const [result,setresult] = useState([]);
  const [page,setpage] = useState(1);
  const [next,setnext] = useState(false);
  const [prev,setprev] = useState(false);
  const [search,setsearch] = useState("");

  const userAuth = useContext(RootContext);
  const fetchBlogs = () => {
      let data = {
          "page": page,
          "search": search
      }
      fetch(BLOG_LIST_URL, {
        method: 'POST',
        headers: {
            'Authorization': 'Token '+userAuth.accesstoken, 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            userAuth.setloader(false);
            setresult(data.data);
            setnext(data.has_next);
            setprev(data.has_previous);
            setpage(data.previous_page + 1);
        })
        .catch(error => {
            userAuth.setloader(false)
            console.error(error)
        })
  }

  useEffect(() => {
     fetchBlogs()
  }, [page, search]);

  return (
    <>
        <div className="seachBar">
            <TextField
                id="outlined-dense-multiline"
                className="form-item searchField"
                label="Search"
                margin="dense"
                value={search}
                onInput={e => setsearch(e.target.value)}
            />
        </div>
        <div className="blogContent">  
        { result.length > 0 ? 
            result.map((data, index) => (
                    <BlogList key={data.id} id={data.id} name={data.created_by.name} createdon={data.created_on} createdby={data.created_by.email}  title={data.title} content={data.content}/>
            ))
        : <span className="emptyData">No data available</span>
        }     
        </div>
        <div className="footerLists">
            <Button variant="contained" disabled={!prev} className="leftButton" onClick = {() => { setpage(page-1)}} color="primary">Previous</Button>
            <span className="currentPage">{page}</span>
            <Button variant="contained" disabled={!next} className="rightButton"  onClick = {() => {  setpage(page + 1) }} color="primary">Next</Button>
        </div>
    </>    
  );
};
 
export default BlogLists;