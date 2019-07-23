import React, { Component } from 'react';
import { Feed, Grid, Search, Segment} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/users/users.js';


class UsersContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            value : '',
        }
    }

    handleSearch = ( e ) => {
        this.setState({ value : e.target.value})
        console.log(this.state.value)
    }
    renderUsers(){
        const users = this.props.users;
        return users.map((user)=> 
        {
            if(!user.status) {
                return null;
            }
           return (
            <Feed.Event key={ user._id }>
                    <Feed.Content>
                        <Feed.Summary>
                        <Feed.User  onClick={ e => {this.props.onChange(user)} }>{ user.profile.username }</Feed.User>
                        <Feed.Date>{ user.status.online ? 'online' : 'offline' }</Feed.Date>
                        </Feed.Summary>
                    </Feed.Content>
            </Feed.Event> );
        });
    }

    render(){
        return (
            <Grid.Column width={4}>
                    <Segment>
                        <Search aligned='center' value={ this.state.value }
                        onSearchChange={ this.handleSearch } ></Search>
                        <Feed style={{ overflow: 'auto', height: '19em'}} color='teal'> 
                            {this.renderUsers()}
                        </Feed>
                    </Segment>
            </Grid.Column>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('users');
    return {
      users: Users.find({ }).fetch(),
    };
  })(UsersContainer);