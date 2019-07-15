import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TestInputText from './components/TestInputText.jsx';
import  Header   from './components/Header.jsx';
import  Post   from './components/Post.jsx';


const App = () => (
  <div>
  <Router>
    <Header />
    {/* exact path의 개념 */}
      <Route exact path="/" render={Home} /> 
      <Route path="/join" component={Join} />
      <Route path="/post" component={Post} />

    <h1>HI</h1>
    <TestInputText />
  </Router>
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
