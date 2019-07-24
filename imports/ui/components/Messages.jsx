import React, { Component } from 'react';
import { Feed, List, Grid, Icon, Search, Segment, Input, Form, Label} from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../../api/messages/messages.js';

class MessagesContainer extends Component{
    constructor(props){
        super(props);
        this.messagesRef = React.createRef(); 
    }
    
    state = {
        text : '',
    }
    
    handleMessage = () => {
        Meteor.call( 'messages.insert' , this.state.text );
        this.setState({text:''})
    }

    componentDidUpdate(prevProps){
        if(prevProps.messsages !== this.props.messages ){
            this.messagesRef.current.scrollTop = this.messagesRef.current.scrollHeight;
        }
    }
    renderMessages(){
        let messages = this.props.messages;
        return messages.map((message)=>{
            let content = '';
            if( message.userId === this.props.userId){
                content = (<List.Content floated='right'  style={{color:'grey'}}> 
                                 <span style={{color:'grey'}}>{moment(message.date).fromNow()}</span>
                            <Label pointing='right' size='large'> {message.text}</Label>  
                            <List.Icon name='user' /> 
                            </List.Content>)
            }else {
                content = (<List.Item floated='left' style={{color:'teal'}}>  
                            <List.Icon name='user' /> 
                            <Label pointing='left' size='large' color='teal'> {message.text} </Label>
                                <span style={{color:'grey'}}>{moment(message.date).fromNow()}</span>
                            </List.Item>)
            }
            return (
                 <List.Item key={message._id}>{content}</List.Item>
            );
        });
    }
    render(){
        return (
           <Grid.Column width={8}>
                <Segment>
                    <div  style={{ overflow: 'auto', height: '21em'}} ref={this.messagesRef} >
                    <List >
                        {this.props.userId ? this.renderMessages() : (<List.Item style={{color:'grey'}}>Please Login</List.Item>)}
                    </List>
                    </div>
                    { this.props.userId ? 
                        (<Form onSubmit={e => this.handleMessage()}>
                            <Input fluid icon='send' placeholder='message to others......' value={this.state.text} onChange={e => this.setState({ text : e.target.value })} />
                        </Form>) 
                        :  
                        ( <Input fluid icon='send' placeholder='Please Login.....' disabled /> )
                    }
                </Segment>
            </Grid.Column>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('messages');
    return {
      messages: Messages.find({ }).fetch(),
      userId: Meteor.userId(),
    };
  })(MessagesContainer);