import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'

import { Button, Modal, Form, Grid, Header, Image, Segment, Icon } from 'semantic-ui-react'


class EditProfileModal extends Component{
  constructor(props){
    super(props);
  }
  state = { 
    email:'',
    password:'',
    errors:'',
  }


  render(){
      if(this.props.user){
          console.log(this.props.user.emails[0].address);
        }
    return(
      <Modal dimmer="inverted" trigger={ <Button icon="user" content={this.props.user ? this.props.user.profile.username : 'null'} 
            inverted basic ></Button>}>
        <Modal.Content>
        <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                <Header.Content >Edit Profile</Header.Content>
              </Header>
              <Form size='large' onSubmit={this.signUp}>
                <Segment stacked>
                {/* <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='tiny' circular verticalAlign='middle'/> */}
                {/* <Divider /> */}
              
                  <Form.Input fluid icon='mail' iconPosition='left' type="email" 
                     value={this.props.user ? this.props.user.emails[0].address : ''} readOnly />

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
                    placeholder='New Password'
                    type='password'
                    onChange={e => this.setState({ password: e.target.value})}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='New Password Confirm'
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


export default EditProfileModal = withTracker(() => {

    return {
        //Login의 props로 넘겨준다. 
      user: Meteor.user(),
      
    };
  })(EditProfileModal);