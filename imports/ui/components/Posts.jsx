import React, { Component } from 'react';
import { Card, Icon, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/posts/posts.js';


class PostsContainer extends Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)
    }
    clickHandler(e, postId) {
        if(!Meteor.user())
            alert("로그인을 해주세요")
    } 
    renderPost(){
        let posts = this.props.posts;
        return posts.map((post) => {
            return (
                <Card href={ this.props.userId ? `/postView/${post._id}` : '/'} key={post._id} color='teal' onClick={(e, d) => {this.clickHandler(post._id)}} style={{margin:10}} >
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
                    {this.renderPost()}
                </Card.Group>
            </Container>
        );
    }
}
export default withTracker(() => {
    Meteor.subscribe('posts');
    return {
      posts: Posts.find({ }).fetch(),
      userId: Meteor.userId(),
    };
  })(PostsContainer);