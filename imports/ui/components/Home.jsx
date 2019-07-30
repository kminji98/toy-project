import React, { Component } from 'react';
import { Container, Feed, Grid, Card, Image, Icon, Search, Segment, Message} from 'semantic-ui-react';
import Posts from './Posts.jsx';
import Users from './Users.jsx';
import Profile from './Profile.jsx';
import Messages from './Messages.jsx';

class Home extends Component {
  constructor(props){
    super(props);
    this.state={
        selectedUser: '',
    }
  }

  handleSelectUser = (result) => {
    this.setState({selectedUser : result})
  }

  render() {
    return (
      <Container>
      <Grid>
          <Grid.Row>
          <Users onChange={this.handleSelectUser} />
          <Profile selectedUser={this.state.selectedUser} />
          <Messages />
          </Grid.Row>
      </Grid>
          <Posts />
      </Container>
    );
  }
}

export default Home;