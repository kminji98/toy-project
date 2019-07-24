import  React from 'react';
import  { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import  Header   from './components/Header.jsx';
import  Home   from './components/Home.jsx';
import  PostForm   from './components/PostForm.jsx';
import  PostView   from './components/PostView.jsx';
import  PostEdit   from './components/PostEdit.jsx';
import  FavoriteList from './components/FavoriteList.jsx';

const App = () => (
  <div>
  <Router>
  <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/favorite" component={FavoriteList} />
      <Route path="/post" component={PostForm} />
      <Route path="/postView/:_id" component={PostView} />
      <Route path="/postEdit/:_id" component={PostEdit} />
    </Switch>
  </Router>
  </div>
);

export default App;