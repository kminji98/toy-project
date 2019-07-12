import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from './Login.jsx';
import  LoginForm  from './layouts/LoginLayout.jsx';
import  HeaderLayout  from './layouts/HeaderLayout.jsx';
import Info from './Info.jsx';

const App = () => (
  <div>
  <Router>
  <HeaderLayout />
    {/* exact path의 개념 */}
      <Route exact path="/" component={Home} /> 
      <Route path="/login" component={LoginForm} /> 
      <Route path="/join" component={Join} />
  </Router>
    <h1>HI</h1>
    <Login />
  </div>
);

function Home() {
  return (
      <div>
      <h2>Home</h2>
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
