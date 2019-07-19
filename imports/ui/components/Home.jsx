import React, { Component } from 'react';
import { Container, Feed, Grid, Card, Image, Icon, Search, Segment, Message} from 'semantic-ui-react';
import Posts from './Posts.jsx';
import Users from './Users.jsx';
import Profile from './Profile.jsx';
import Messages from './Messages.jsx';

class Home extends Component {
    render() {
        return (
            <Container>
            <Grid>
                <Grid.Row>
                <Users />
                <Profile />
                <Messages />
                </Grid.Row>
            </Grid>
                <Posts />
            </Container>
        );
    }
}

export default Home;