import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import  SignUpForm  from './SignUpForm.jsx';

export default class SignUpModal extends Component{
  render(){
    return(
      <Modal dimmer="inverted" trigger={ <Button content='Sign Up' inverted basic/>}>
        <Modal.Content>
            <SignUpForm />
        </Modal.Content>
      </Modal>
    );
  }
}