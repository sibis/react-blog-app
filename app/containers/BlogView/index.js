import React, {useState, useEffect, useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import  {RootContext}  from "utils/auth";
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { useHistory } from "react-router-dom";
import Loader from 'components/Loader';
import { BLOG_VIEW_URL, BLOG_CREATE_URL, BLOG_UPDATE_URL, BLOG_DELETE_URL } from "utils/constants";

const BlogView = (props) => {
    let topicId= props.match.params.blogId;
    const [contentDisabled, setcontentDisabled] = useState(0);
    const [headerContent, setheaderContent] = useState('');
    const [blogContent, setblogContent] = useState('');
    const [createdby, setcreatedby] = useState('');
    const [createdon, setcreatedon] = useState('');
    useEffect(() => {
        if( topicId !== 'create' ) {
            let topicId= props.match.params.blogId;
            let data = {
                "id":topicId
            };
            fetch(BLOG_VIEW_URL, {
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
                
                setblogContent(data.data.content);
                setheaderContent(data.data.title);
                setcreatedon(data.data.created_on);
                setcontentDisabled(data.edit_allowed);
                let created_by = data.data.created_by.name+' ('+data.data.created_by.email+')';
                setcreatedby(created_by);
                userAuth.setloader(false);
                if(data.msg) {
                    userAuth.setsnackopen([true,data.msg]);
                    setTimeout(function(){ userAuth.setsnackopen([false,'']); }, 3000);
                }
            })
            .catch(error => {
                console.error(error);
                userAuth.setloader(false);
                history.replace('/login');
            });
        }
    },[]);

    let history = useHistory();
    const userAuth = useContext(RootContext);
    userAuth.setloader(false);
    const createBlog = () => {
        userAuth.setloader(true)
        var api_url = BLOG_CREATE_URL;
        if(topicId === 'create') {
            var api_url = BLOG_CREATE_URL;
            var data = {
                "title":headerContent,
                "content":blogContent
            }
        } else {
            var api_url = BLOG_UPDATE_URL;
            var data = {
                "title":headerContent,
                "content":blogContent,
                "id":topicId
            }
        }

        fetch(api_url, {
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
            userAuth.setloader(false)
            var message = "updated";
            if (topicId === 'create') {
                var message = "updated";
            }
            userAuth.setsnackopen([true,"Blog "+message+" successfully!"])
            setTimeout(function(){ userAuth.setsnackopen([false,'']) }, 3000);
            history.replace('/');
        })
        .catch(error => {
            userAuth.setloader(false);
        })
    }

    const deleteBlog = () => {
        userAuth.setloader(true)
        var data = {
            "id":topicId
        }
        fetch(BLOG_DELETE_URL, {
            method: 'DELETE',
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
            userAuth.setsnackopen([true,"Blog deleted successfully!"]);
            setTimeout(function(){ userAuth.setsnackopen([false,'']) }, 3000);
            history.replace('/')
        })
        .catch(error => {
            userAuth.setloader(false)
            console.error(error)
        })
    }

    return (
      <div className="blogContent">
            <div className="blogPost">
                <div className="blogHeader"><span className="blogCreatedby"> Created by: {createdby} </span><span className="blogCreatedon">Created on: {createdon}</span></div>
                <span className="blogTitle">
                    <TextField
                        id="standard-full-width"
                        style={{ margin: 8 }}
                        disabled={contentDisabled}
                        placeholder="Title"
                        helperText="Title for your blog!"
                        fullWidth
                        margin="normal"
                        value={headerContent}
                        onInput={e => setheaderContent(e.target.value)}
                        />
                </span>
                <span className="">
                    <TextField
                        id="standard-full-width"
                        multiline
                        disabled={contentDisabled}
                        style={{ margin: 8 }}
                        placeholder="Blog content"
                        helperText="content for your blog!"
                        fullWidth
                        margin="normal"
                        value={blogContent}
                        onInput={e => setblogContent(e.target.value)}
                        />
                </span>
                <span className="footerBlog">
                    <Button variant="contained" disabled={contentDisabled} onClick = {createBlog} color="primary">Save</Button>
                    <Button variant="contained" className="deleteButton" disabled={contentDisabled} onClick = {deleteBlog} color="primary">Delete</Button>
                </span>
            </div>
        </div>
  );
};

export default BlogView;