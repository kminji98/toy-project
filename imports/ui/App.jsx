import React from 'react';
import Hello from './Hello.jsx';
import  LoginForm  from './LoginLayout.jsx';
import Info from './Info.jsx';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login.jsx';

const App = () => (

  <div>
  <Router>
    <ul>
      <li>
          <Link to="/login">Login</Link> 
        </li>
        <li>
          <Link to="/join">Join</Link>
        </li>
    </ul>
      <Route path="/login" component={LoginForm} /> 
      <Route path="/join" component={Join} />

  </Router>
 
    <h1>HI</h1>
    <Login />
  </div>
);

function Login0() {
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
export default App;
