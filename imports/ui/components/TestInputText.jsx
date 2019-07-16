import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/posts/posts.js';
import TestPost from './TestPost.jsx';
import BaseComponent from './BaseComponent.jsx';


class TestInputText extends BaseComponent {
  constructor(props){
    super(props);
    
    this.state = {
        text :'',
        counter: 0,
        redirectTo: null,
        errors:{},
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  saveText(event){
      event.preventDefault();
      // VDOM attr인 refs로 접근
      // const tt = ReactDOM.findDOMNode(this.refs.textInput).value;
      // ReactDOM.findDOMNode(this.refs.textInput).value = '';
      // this.setState({text: tt});
      
      //mini mongo
      // Users.insert({
      //     text: this.state.text, 
      //     createAt: new Date(),
      // });
      // mongo db - server -> method call
      //callback ?????
      Meteor.call('posts.insert', this.state.text,()=>{ 
        this.redirectTo('/');
      });
      console.log('text: ', this.state.text);
      // Clear form
      this.setState({
        text: ''}
      );
  }
  handleChange(e){
      this.setState({text: e.target.value});
  }
  
  deleteThisPost(id){
      Meteor.call('posts.remove',id);
  }
  showPosts(post) {
      return (
      <li key={post._id}>
          {post.text}
          <button onClick={()=> Meteor.call('posts.remove', post._id)}>del</button>
      </li>
      );
  }
  renderPost(){
    let postsList = this.props.posts;
    return postsList.map((post) => {
        return (
            <TestPost
                key={post._id}
                post={post}
            />
        );
    });     
  }
  
  render() {
    return (
      <div>
          <form onSubmit={this.saveText.bind(this)}>
             <input onChange={this.handleChange} type="text" value={this.state.text} ref="textInput" />
          </form>
        <button onClick={this.saveText.bind(this)}>Save Text</button>
        <br/>
        <button onClick={() => this.increment()}>Click Me</button>
        <ul>{ this.renderPost() }</ul>
        {/* {this.renderRedirect()}        */}
      </div>
    );
  }
}

export default TestInputTextContainer = withTracker(() => {
    Meteor.subscribe('posts');
    return {
        //Login의 props로 넘겨준다. 
      posts: Posts.find({ }).fetch(),
    };
  })(TestInputText);