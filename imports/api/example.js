import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
function ShowLinks() {
    return (
        <Router>
            <Link to="/login">Login</Link>
            <Link to="/join">Join</Link>

        <Route path="/login" component={Login} />
        <Route path="/join" component={Join} />

        </Router>
    );
}
function Login() {
    return (
        <div>
        <h2>Login</h2>
        </div> 
    );
}
function Join() {
    return (
        <div>
        <h2>Join</h2>
        </div> 
   );
}
export default ShowLinks;
