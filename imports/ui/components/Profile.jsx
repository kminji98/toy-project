import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/users/users.js';
import { Grid, Card, Image, Icon} from 'semantic-ui-react';
class Profile extends Component{

    render(){
        let userName = 'user A';
        let phone = '010-000-0000';
        let email = 'email';
        if(this.props.selectedUser){
            userName = this.props.selectedUser.title;
            phone = this.props.selectedUser.description;
            email = this.props.selectedUser.price;
        }
        if(!Meteor.userId()){
            phone = ''; email = '';
        }

        return (
           <Grid.Column width={4}>
                    <Card>
                        <Image src='./belle.png' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>{userName}</Card.Header>
                        </Card.Content>
                       
                        <Card.Content extra>
                            <Card.Description>
                                <Icon name='phone' />
                                {phone}
                                <span className='right floated'>
                                    Phone Number                            
                                </span>
                             </Card.Description>
                             <Card.Description>
                                <Icon name='mail' />
                                {email}
                                <span className='right floated'>
                                    E-mail                          
                                </span>
                             </Card.Description>
                        </Card.Content>
                    </Card>
            </Grid.Column>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('users');
    return {
      user: Users.find({ _id : '' }).fetch(),
    };
  })(Profile);