import _ from 'lodash'
import React, { Component } from 'react';
import { Feed, Grid, Search, Segment} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Users } from '../../api/users/users.js';

class UsersContainer extends Component{
    constructor(props){
        super(props);
        this.state =  { isLoading: false, results: [], value: '' }
    }
   
    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title })
        this.props.onChange(result)
    }
    handleSearchChange = (e, { value }) => {
        let users = [];
        users = this.props.users.map((user) =>({
            title: user.profile.username,
            description : user.profile.phone,
            price: user.emails[0].address
        }));

        this.setState({ isLoading: true, value })
  
        setTimeout(() => {
            if (this.state.value.length < 1) return this.setState( { isLoading: false, results: [], value: '' })
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)
            const source = users;
            this.setState({
            isLoading: false,
            results: _.filter(source, isMatch),
            })
        }, 300)
    }

    renderUsers(){
        const users = this.props.users;
        return users.map((user)=> 
        {
            const result = {
                title: user.profile.username,
                description : user.profile.phone,
                price: user.emails[0].address
            }
            
            if(!user.status) return null
           return (
            <Feed.Event key={ user._id }>
                    <Feed.Content >
                        <Feed.Summary >
                        <Feed.User  onClick={ e => {this.props.onChange(result)} }>{ user.profile.username }</Feed.User>
                        <Feed.Date>{ user.status.online ? 'online' : moment(user.status.lastLogin.date).fromNow() }</Feed.Date>
                        </Feed.Summary>
                    </Feed.Content>
            </Feed.Event> );
        });
    }

    render(){
        const { isLoading, value, results } = this.state
        return (
            <Grid.Column width={4}>
                    <Segment>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true,
                        })}
                        results={results}
                        value={value}
                    
                        {...this.props}
                    />
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