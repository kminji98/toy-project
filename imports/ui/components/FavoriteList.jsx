import React, { Component } from 'react';
import { Card, Icon, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/posts/posts.js';

class FavoriteList extends Component {
    renderFavoritePost(){
        let postsList = this.props.posts;
        return postsList.map((post) => {
            if(!post.favorites){ return; }
            return (
                <Card href={`/postView/${post._id}`} key={post._id} color='teal' style={{margin:10}} key={post._id}>
                    <Card.Content>
                        <Card.Header>{post.title}</Card.Header>
                        <Card.Meta>{post.subtitle}</Card.Meta>
                        <Card.Description>{post.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra >
                        <Icon name='heart' />
                        {post.favorites ? post.favorites.length : '0'}
                        <span className='right floated'><Icon name='comment' />
                        {post.comments ? post.comments.length : '0'}                            
                        </span>
                    </Card.Content>
                </Card>
            );
        });     
      }
    render(){
        return(
            <Container>
                <Card.Group itemsPerRow={4}>
                    {this.renderFavoritePost()}
                </Card.Group>
            </Container>
        );
    }
}
export default FavoriteList = withTracker(() => {
    Meteor.subscribe('posts.favorites');
    return {
      posts: Posts.find({ }).fetch(),
    };
  })(FavoriteList);