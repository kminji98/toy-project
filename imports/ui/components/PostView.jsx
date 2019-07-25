import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Form, Container, Grid, Header, Icon, Comment, Card, Segment } from 'semantic-ui-react'
import { Posts } from '../../api/posts/posts.js';
import { withTracker } from 'meteor/react-meteor-data';
import '../stylesheets/postView'


class PostView extends Component{
    constructor(props){
        super(props);
        this.state = {
            title : '',
            subtitle : '',
            description :'',
            commentContent : '',
            errors:{},
        }
    }

    insertComment = () => {
        Meteor.call('posts.comment',this.props.post._id , this.props.userId , Meteor.user().profile.username ,this.state.commentContent)
        this.setState({commentContent:''});
    }

    favorite = (e, isFavorite) => {
        if(!this.props.post) return;
        if(isFavorite){
            Meteor.call('posts.cancelFavorite', this.props.post._id, this.props.userId)
        }else{
            Meteor.call('posts.favorite', this.props.post._id, this.props.userId)
        }
    } 

    renderComments(){
        if(!this.props.post) return;
        let commentsList = this.props.post.comments;
        if(!commentsList) return;
        return commentsList.map((comment) => {
            let commentDateToPass = moment(comment.createdAt).fromNow()
            return(
                <Comment>
                    <Comment.Content>
                        <Comment.Author as='a'>{comment.userName}</Comment.Author>
                        <Comment.Metadata>
                        <span>{commentDateToPass}</span>
                        </Comment.Metadata>
                        <Comment.Text>{comment.content}</Comment.Text>
                    </Comment.Content>
                </Comment>
            );
        });
    }

    render(){
        let isFavorite, isWriter='';
        if(this.props.post){
            var dateToPass = moment(this.props.post.createdAt).fromNow()
            if(this.props.post.favorites){ isFavorite = this.props.post.favorites.includes(this.props.userId) }
        }else{
            isFavorite = false; dateToPass ='';
        }
    
        if(this.props.post && this.props.post.userId == this.props.userId ){
            isWriter = (<Segment textAlign='center' color='grey'>
                         <NavLink to={`/postEdit/${this.props.post._id}`}> Edit </NavLink>
                        </Segment>)
        }
        return(
            <Grid centered>
            <Grid.Row verticalAlign='middle'>
                <Grid.Column width={8} > 
                    <Segment.Group >
                    <Segment placeholder raised>
                        <Header as='h2' centered='true'>
                            {this.props.post ? this.props.post.title : ''} 
                            <Icon name={isFavorite ? 'heart': 'heart outline'} color='red' style={{margin:10}}
                            onClick={e => this.favorite(e, isFavorite)} />
                        </Header>
                        <Container textAlign='center'><b>{this.props.post ? this.props.post.subtitle : ''}</b></Container><br/>
                        <Container >{this.props.post ? this.props.post.description : ''}</Container>
                    </Segment>
                    <Segment.Group horizontal >
                        <Segment textAlign='center' color='grey'>writer : {this.props.post ? this.props.post.userName : ''} </Segment>
                        <Segment textAlign='center' color='grey'><i> {dateToPass} </i></Segment>
                        { isWriter }
                    </Segment.Group>
                    </Segment.Group>
                </Grid.Column>

                <Grid.Column width={6} >
                    <Comment.Group>
                    <Header as='h3'>Comments</Header>
                        <Form onSubmit={this.insertComment}>
                            <Form.Input value={this.state.commentContent} onChange={e => this.setState({ commentContent:e.target.value })} />
                            <Form.Field>
                                <Form.Button color='teal' floated='right' ><Icon name='edit' />Add Comment</Form.Button>
                            </Form.Field>
                        </Form><br/><br/>
                        {this.renderComments()}
                    </Comment.Group>
                </Grid.Column>
            </Grid.Row>
            </Grid>
        );
    }
}
export default PostView = withTracker((props) => {
    Meteor.subscribe('posts');
    return {
      post: Posts.find({_id : props.match.params._id}).fetch()[0],
      userId : Meteor.userId(),
    };
  })(PostView);
