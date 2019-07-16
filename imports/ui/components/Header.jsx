import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor'
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";

import LoginModal from './LoginModal.jsx';
import SignUpModal from './SignUpModal.jsx';
import EditProfileModal from './EditProfileModal.jsx';


import  { Container,Grid,List,Menu,Icon, Button} from 'semantic-ui-react'
import '../stylesheets/header'

class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }
  componentDidMount() {
    if(Meteor.userId()) {
      this.setState({isLoggedIn: true})
    }
  }
  logout=()=>{
    Meteor.logout(); 
    this.setState({isLoggedIn: false});
  }
  render() {  
    // const name = currentUser.username;
    // console.log(this.props.user.emails);
    return (
      <div className="ui stackable teal inverted menu">
        {this.state.isLoggedIn ? (
          <div className="ui left text menu" >
            <NavLink to="/post">
              <Button content='Blog Write' inverted basic/>
            </NavLink> 
            <NavLink to="/favorite">
              <Button content='Favorite' inverted basic/>
            </NavLink>          
          </div>
        ) : null
        }
           
        <div className="ui huge inverted center header" >
          <NavLink to="/"  activeStyle={{fontWeight: "bold",color: "white"}}>
            <Icon name='bell' />Bellechat
          </NavLink>
        </div>
        {this.state.isLoggedIn ? 
          (
          <div className="ui text menu" >
            <EditProfileModal />
            <Button content='Log Out' inverted basic onClick={ () => this.logout() }></Button>
          </div>
          ) 
          : 
          (
            <div className="ui text menu" >
             <LoginModal /> 
             <SignUpModal />
            </div>
          )
        }
          
      </div>
    );
  }
}


export default Header = withTracker(() => {

  return {
      //Login의 props로 넘겨준다. 
    user: Meteor.user(),
    
  };
})(Header);