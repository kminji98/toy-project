import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'

import { Button, Modal, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Accounts } from 'meteor/accounts-base';


class EditProfileModal extends Component{
  constructor(props){
    super(props);
    this.state = { 
      isOpen: false,
      email:'',
      password:'',
      newPassword:'',
      phone:'',
      username: '',
      errors:'',
    }
  }
  componentDidMount(){
    if(this.props.user){
      this.setState({ 
        username : this.props.user.profile.username, 
        phone : this.props.user.profile.phone, 
      })
    } 
  }
  componentDidUpdate(prevProps){
    if(prevProps.user !== this.props.user){
      this.setState({ 
        username : this.props.user.profile.username, 
        phone : this.props.user.profile.phone, 
      })
    }
  }

  editProfile = () => {
    const oldPassword = this.state.password; 
    const newPassword = this.state.newPassword; 
    const phone = this.state.phone;
    const username = this.state.username;

    if(!oldPassword || !newPassword){
      window.alert("password를 입력해주세요");
      return;
    }

    Accounts.changePassword(oldPassword, newPassword, (err)=> {
      if(err){
        window.alert(err);
      }else{ 
        Meteor.users.update( Meteor.userId(),{
          $set: {
            profile: {
              phone,
              username
            }
          }
        }, (err)=>{ if(!err){ window.location.reload() } });
      }
    })
  }

  render(){

    return(
      <Modal closeOnDimmerClick={true} 
        onClose={e => this.setState({isOpen : false})} open={this.state.isOpen} dimmer="inverted" 
        trigger={ <Button icon="user" content={this.props.user ? this.props.user.profile.username : 'null'} 
            onClick={e => this.setState({isOpen : true}) }
            inverted basic ></Button>} >
        <Modal.Content>
        <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Header.Content >Edit Profile</Header.Content>
              </Header>
              <Form size='large' onSubmit={this.signUp}>
                <Segment stacked>
           
                  <Form.Input fluid icon='mail' iconPosition='left' type="email" 
                     value={this.props.user ? this.props.user.emails[0].address : ''} readOnly 
                  />

                  <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' 
                     value={this.state.username} 
                     onChange={e => this.setState({ username: e.target.value})}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.password} 
                    onChange={e => this.setState({ password: e.target.value})}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='New Password'
                    type='password'
                    value={this.state.newPassword} 
                    onChange={e => this.setState({ newPassword: e.target.value})}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='New Password Confirm'
                    type='password'
                  />
                  <Form.Input fluid icon='phone' iconPosition='left' placeholder='Phone Number' 
                   value={this.state.phone} 
                   onChange={e => this.setState({ phone: e.target.value})}
                  />
                  <Button color='teal' fluid size='large' onClick={this.editProfile} name="ok" >
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

export default EditProfileModal = withTracker(() => {
    return {
      user: Meteor.user(),
    };
  })(EditProfileModal);