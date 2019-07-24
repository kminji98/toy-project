import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Form, Container, Grid, Header, Segment } from 'semantic-ui-react'
import { Posts } from '../../api/posts/posts.js';
import { withTracker } from 'meteor/react-meteor-data';
import '../stylesheets/postView'


class PostEdit extends Component{
    constructor(props){
        super(props);
        this.state = {
            title : '',
            subtitle : '',
            description :'',
            errors:{},
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.isReady !== this.props.isReady && prevProps.post !== this.props.post){
            this.setState({
                title: this.props.post.title,
                subtitle: this.props.post.subtitle,
                description: this.props.post.description,
            })
        }
    }
    

    update = () => {
        Meteor.call('posts.update', this.props.post._id , this.state.title, this.state.subtitle, this.state.description,(err)=>{console.log(err)}); 
    }

    render(){
        return(
             <Container>
                <Grid>
                    <Grid.Row centered >
                        <Grid.Column width={12}>
                                <Segment basic>
                                 <Header style={{textDecoration:'underline'}}> Edit Your Post! </Header>
                                </Segment>
                            <Form>
                                <Form.Field>
                                    <Form.Input label="Title" placeholder="title" value={this.state.title} 
                                    onChange={e => this.setState({ title: e.target.value })} />
                                </Form.Field>
                                <Form.Field >
                                    <Form.Input label="Subtitle" placeholder="Describe title" 
                                    value={this.state.subtitle} onChange={e => this.setState({ subtitle: e.target.value })}/>
                                </Form.Field>
                                <Form.TextArea label='Description' placeholder='Tell us your story..' 
                                value={this.state.description} onChange={e => this.setState({ description: e.target.value })}/> 
                                <Form.Field align='right'>
                                    <NavLink to="/"><Form.Button color='teal' onClick={() => this.update()}>Submit</Form.Button></NavLink>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}
export default PostEdit = withTracker((props) => {
    const postsSubs = Meteor.subscribe('posts');
    return {
      isReady: postsSubs.ready(),
      post: Posts.find({_id : props.match.params._id}).fetch()[0],
      userId : Meteor.userId(),
    };
  })(PostEdit);
