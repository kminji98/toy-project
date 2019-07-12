import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import  ModalLogin  from './ModalLogin.jsx';
import  { Container,Grid,List,Menu,Icon, Button} from 'semantic-ui-react'
import '../stylesheets/header'

const HeaderLayout = () => (
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
      <ModalLogin />
      <NavLink to="/login">
        <Button content='SIGN UP' inverted basic/>
      </NavLink>
    </div>
  </div>
)

export default HeaderLayout