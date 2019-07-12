import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts/publications.js';

import Users from '../api/users';
import ShowLinks from '../api/example'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            text :'type',
            counter: 0,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    saveText(event){
        event.preventDefault();
        // VDOM attr인 refs로 접근
        // const tt = ReactDOM.findDOMNode(this.refs.textInput).value;
        // this.setState({text: tt});
        
        //mini mongo
        // Users.insert({
        //     text: this.state.text, 
        //     createAt: new Date(),
        // });
        // mongo db - server -> method call
        Meteor.call('posts.insert', this.state.text);

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
  }
  handleChange(e){
    this.setState({text: e.target.value});
  }
  showPosts(post) {
    return (
      <li key={post._id}>
        {post.text}
        <button onClick={()=> Meteor.call('posts.remove', post._id)}>del</button>
      </li>
      
    );
  }
  deleteThisPost(id){
      console.log(id);
      Meteor.call('posts.remove',id);
  }
  render() {
      const posts = this.props.posts.map(
          post => this.showPosts(post)
      );
    return (
      <div>
          <form onSubmit={this.saveText.bind(this)}>
             <input onChange={this.handleChange} type="text" text={this.state.text} ref="textInput" />
          </form>
        <button onClick={this.saveText.bind(this)}>Save Text</button>
        <br/>
        <button onClick={() => this.increment()}>Click Me</button>
        <ul>{ posts }</ul>
      </div>
    );
  }

  
}

export default LoginContainer = withTracker(() => {
    Meteor.subscribe('posts');
    return {
        //Login의 props로 넘겨준다. 
      posts: Posts.find({ }).fetch(),
    };
  })(Login);