import React from 'react'
import { Meteor } from 'meteor/meteor'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import  LoginModal  from './LoginModal.jsx';
import  SignUpModal  from './SignUpModal.jsx';


import  { Container,Grid,List,Menu,Icon, Button} from 'semantic-ui-react'
import '../stylesheets/header'

const Header = () => (
  <div class="ui stackable teal inverted menu">
    <div class="ui left text menu" >
      <NavLink to="/blog">
        <Button content='Blog Write' inverted basic/>
      </NavLink>
      <NavLink to="/favorite">
        <Button content='Favorite' inverted basic/>
      </NavLink>  
    </div>
    <div class="ui huge inverted center header" >
      <NavLink to="/"  activeStyle={{fontWeight: "bold",color: "white"}}>
        <Icon name='bell' />Bellechat
      </NavLink>
    </div>
    <div class="ui text menu" >
      {Meteor.userId() ?
        <Button content='Log Out' inverted basic onClick={ () => Meteor.logout()}></Button>
        : <LoginModal />
      }
      {!Meteor.userId() ?
        <SignUpModal />
        : null
      }
    </div>
  </div>
)

export default Header