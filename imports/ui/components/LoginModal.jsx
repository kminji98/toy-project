import React, { Component } from 'react';
import { Button, Modal, Form, Grid, Header, Image, Segment, Icon } from 'semantic-ui-react'


export default class LoginModal extends Component{
  constructor(props){
    super(props);
  }
  state = { 
    email:'',
    password:'',
    errors:'',
  }
  // show = () => {this.setState({ open: true })}
  // close = () => {this.setState({ open: false })}
  login= () => {
    const email = this.state.email;
    const password = this.state.password;
    console.log("state email : "+ email);
    console.log("state pw : "+ password);
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          errors: { none: err.reason },
        });
        console.log("state errors : "+ this.state.errors.none);
        window.alert(this.state.errors.none);
      } else {
        window.location.reload()
      }
    });
  }

  render(){
    return(
      <Modal dimmer="inverted" trigger={ <Button content='Log In' inverted basic />}>
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


