import React, { Component } from 'react';
import { Feed, Grid, Search, Segment} from 'semantic-ui-react';
class Users extends Component{

    render(){
        return (
            <Grid.Column width={4}>
                    <Segment>
                        <Search aligned='center'></Search>
                        <Feed style={{ overflow: 'auto', height: '19em'}} color='teal'> 
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Summary>
                                    <Feed.User>Elliot Fu</Feed.User>
                                    <Feed.Date>1 Hour Ago</Feed.Date>
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Segment>
            </Grid.Column>
        );
    }
}

export default Users;