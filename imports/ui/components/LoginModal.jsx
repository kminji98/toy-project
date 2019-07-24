import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Modal, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react'


export default class LoginModal extends Component{
  state = { 
    isOpen: false,
    email:'',
    password:'',
    errors:'',
  }
  login= () => {
    const email = this.state.email;
    const password = this.state.password;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
        console.log("state errors : "+ this.state.errors.none);
        window.alert(this.state.errors.none);
      } else {
        this.setState({ isOpen : false})
      }
    });
  }

  render(){
    const { isOpen, closeOnEscape, closeOnDimmerClick } = this.state
    return(
      <Modal closeOnDimmerClick={true} 
            onClose={e => this.setState({isOpen : false})} open={this.state.isOpen} dimmer="inverted" 
            trigger={ <Button icon='sign-in' content='Log In' inverted basic onClick={e => this.setState({isOpen : true}) } />} >
        <Modal.Content>
        <Grid textAlign='center' style={{ height: '40vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large'>
            <Segment stacked>
               <Form.Input fluid icon='user' iconPosition='left' type="email" placeholder='E-mail address' 
                 onChange={e => this.setState({ email: e.target.value})}
               />
               <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password' 
                onChange={e => this.setState({ password: e.target.value})}
                />
                <Button color='teal' fluid size='large' onClick={this.login}>
                  Login
                </Button>
            </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}


