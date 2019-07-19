import React, { Component } from 'react';
import { Feed, Grid, Card, Image, Icon, Search, Segment, Message} from 'semantic-ui-react';
class Messages extends Component{

    render(){
        return (
           <Grid.Column width={9}>
                    <Segment>
                    <Feed style={{ overflow: 'auto', height: '22em'}} color='teal'> 
                        <Feed.Event
                        icon='user'
                        date='Today'
                        summary="You posted on your friend Stevie Feliciano's wall."
                        />
                    </Feed>
                    </Segment>
            </Grid.Column>
        );
    }
}

export default Messages;