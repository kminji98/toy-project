import React, { Component } from 'react';
import { Header, Modal, Button, Form, Grid, Image, Segment, Icon, Divider } from 'semantic-ui-react'
import { Accounts } from 'meteor/accounts-base';

export default class SignUpModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      email:'',
      username:'',
      password:'',
      phone:'',
      errors:'',
      emailError:'',
    } 
    this.signUp = this.signUp.bind(this);
  }
  signUp(e){
    e.preventDefault();
    
    const email = this.state.email;
    const username = this.state.username;
    const password = this.state.password;
    const phone = this.state.phone;

    if(!(email.trim() || username.trim())){
      window.alert('필수항목을 입력해주세요.');
      return;
    }
    if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))) { 
      window.alert('이메일 형식이 잘못되었습니다.');
      console.log("wrong email address "+this.state.email);
      this.setState({ emailError: '이메일 형식이 잘못되었습니다.'});
      return;
    }
   
    Accounts.createUser({
        email,
        password,
        profile: {
         phone,
         username
        }
      }, (err)=>{
        if (err) {
          this.setState({
            errors: { none: err.reason },
          });
          window.alert(err)
        }else{
          this.setState({ isOpen : false })
        }
      });
  }
  render(){
    return(
      <Modal closeOnDimmerClick={true} 
            onClose={e => this.setState({open : false})} 
            open={this.state.open} dimmer="inverted" 
            trigger={ <Button content='Sign Up' inverted basic onClick={e => this.setState({open : true}) }/>}>
        <Modal.Content>
          <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Header.Content >Sign Up !</Header.Content>
              </Header>
              <Form size='large' onSubmit={this.signUp}>
                <Segment stacked>
                {/* <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='tiny' circular verticalAlign='middle'/> */}
                {/* <Divider /> */}
              
                  <Form.Input fluid icon='mail' iconPosition='left' type="email" placeholder='E-mail address' required
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
                  <Button color='teal' fluid size='large' onClick={this.signUp} name="ok" >
                    OK
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