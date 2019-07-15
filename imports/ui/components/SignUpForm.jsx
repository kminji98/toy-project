import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Segment, Icon, Divider } from 'semantic-ui-react'


import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default class SignUpForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'',
      username:'',
      password:'',
      phone:'',
    } 
    this.signUp = this.signUp.bind(this);
  }
  signUp(e){
    e.preventDefault();
    
    const email = this.state.email;
    const username = this.state.username;
    const password = this.state.password;
    const phone = this.state.phone;

    Accounts.createUser({
        email,
        username,
        password,
        phone,
      },()=>{
        <Redirect to="/"/>
      }
    );

  }
  
  render(){
    return(
      <Grid textAlign='center' verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Header.Content >Sign Up !</Header.Content>
        </Header>
        <Form size='large'>
          <Segment stacked>
          {/* <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='tiny' circular verticalAlign='middle'/> */}
          {/* <Divider /> */}
        
            <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' 
              onChange={e => this.setState({ email: e.target.value})}
            />
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' 
             onChange={e => this.setState({ username: e.target.value})}
            />

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={e => this.setState({ password: e.target.value})}
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password Confirm'
              type='password'
            />
            <Form.Input fluid icon='phone' iconPosition='left' placeholder='Phone Number' 
             onChange={e => this.setState({ phone: e.target.value})}
            />
            <Button color='teal' fluid size='large' onClick={this.signUp}>
              OK
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    );
  }
}