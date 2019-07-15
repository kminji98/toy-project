import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import  LoginForm  from './LoginForm.jsx';

export default class LoginModal extends Component{
  render(){
    return(
      <Modal dimmer="inverted" trigger={ <Button content='Log In' inverted basic/>}>
        <Modal.Content>
            <LoginForm />
        </Modal.Content>
      </Modal>
    );
  }
}


