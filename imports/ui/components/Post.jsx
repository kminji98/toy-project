import React, { Component } from 'react';
import { Form, Container, Grid } from 'semantic-ui-react'


export default class Post extends Component{

    handleChange = (e, { value }) => this.setState({ value })

    render(){
        return(
            <Container>
                <Grid>
                    <Grid.Row centered >
                        <Grid.Column width={12}>
                            <Form>
                                <Form.Field>
                                    <Form.Input label="Title" placeholder="title" />
                                </Form.Field>
                                <Form.Field >
                                    <Form.Input label="Title Description" placeholder="type something.." />
                                </Form.Field>
                                <Form.TextArea label='Description' placeholder='Tell us your story..' /> 
                                <Form.Field align='right'>
                                 <Form.Button color='teal'>Submit</Form.Button>
                                </Form.Field>

                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            
        );
    }
}

