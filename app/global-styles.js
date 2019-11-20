import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

html, body, #app, #root, .app-wrapper, .MuiGrid-container {
  height: 100%;
  overflow: scroll;
  // background-image: linear-gradient(#0B566C,#A3D1A7);
}

// div.mainContent, div.blogContent{
//   height: 100%;
// }
div.mainContent{
  height: 100%;
}

@media (max-width: 769px) {
  .form-item {
    display: none;
  }
}

/* Smartphones (portrait) ----------- */
@media only screen and (max-width : 320px) {
.form-item {
    display: none;
  }
}

.form-item {
  width: 40%;
  /* margin-top: 3%!important; */
  margin-top: 2em!important;
}

button.leftButton{
  left: -2%;
}

span.currentPage{
  font-size: 25px;
}

span.emptyData {
    display: flex;
    justify-content: center;
    font-size: 25px;
    margin-top: 10px;
}

button.rightButton {
  right: -2%;
}

div.social-item {
  width: 25%;
}

button.social-icon {
  width: 50%;
}

button.google {
  background-color: #34A853;
}

.help-text {
  margin-top: 20px;
}

div.blogPost {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 95%;
  padding: 10px;
  margin: 2%;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
}

div.blogContent span.blogTitle {
  font-size: 25px;
  font-weight: 600;
  color: #040404;
  margin-top: 8px;
  margin-bottom: 8px;
}

div.blogContent div.blogHeader span {
  font-style: italic;
  color: #4a4747;
  font-size: 15px;
}

div.blogPost span.blogMessage {
  color: #4a4747;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 23px;
  max-height: 45px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

div.blogContent div.blogHeader span.blogCreatedon {
  float: right;
}

span.footerBlog button{
  float: right;
}

div.form-item input {
   border-left: 4px solid red;
}

div.searchField{
  width: 80%;
  left:10%;
}

div.searchField input {
  border-left: 0px solid red!important;
}

div.footerLists {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 40px!important;
}

div.logo {
  font-size: 25px;
  color: #504e4e;
}

div.loader{
     width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    opacity: 0.7;
    background: black;
    z-index: 9998;
}

dev.not-loading{
    background: transparent;
    z-index: 0;
}

div.css-1ioq6a {
   display: block;
    margin: 0 auto;
    border-color: red;
    top: 45%;
    left: 45%;
    margin-left: -50px;
    margin-top: -50px;
    position: fixed!important;
}

span.footerBlog button.deleteButton{
  float:left!important;
}

`;

export default GlobalStyle;
