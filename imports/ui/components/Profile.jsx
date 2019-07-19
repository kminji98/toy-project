import React, { Component } from 'react';
import { Feed, Grid, Card, Image, Icon, Search, Segment, Message} from 'semantic-ui-react';
class Profile extends Component{

    render(){
        return (
           <Grid.Column width={3}>
                    <Card>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>Daniel</Card.Header>
                        <Card.Meta>Joined in 2016</Card.Meta>
                        <Card.Description>
                            Daniel is a comedian living in Nashville.
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            10 Friends
                        </a>
                        </Card.Content>
                    </Card>
            </Grid.Column>
        );
    }
}

export default Profile;