import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Form, Container, Grid } from 'semantic-ui-react'
//import { Posts } from '../../api/posts/posts.js';
import { NavLink } from "react-router-dom";


export default class PostForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            title : '',
            subtitle : '',
            description :'',
            writer : '',
            errors:{},
        }
    }
    submit = () => {
        Meteor.call('posts.insert', Meteor.userId(), Meteor.user().profile.username , this.state.title, this.state.subtitle, this.state.description); 
    }

    render(){
        return(
            <Container>
                <Grid>
                    <Grid.Row centered >
                        <Grid.Column width={12}>
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
                                    <NavLink to="/"><Form.Button color='teal' onClick={() => this.submit()}>Submit</Form.Button></NavLink>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            
        );
    }
}

