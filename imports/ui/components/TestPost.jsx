import React, { Component } from 'react';
import { Posts } from '../../api/posts/posts.js'; 
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

//Post component - represents a single todo item
export default class TestPost extends Component {
    render(){
      const postClassName = classnames({
        key: this.props.post._id,
        text: this.props.post.text,
      });
      return(
          <li className={postClassName}>
              <span className="text">{this.props.post.text}</span>
              <button onClick={()=> Meteor.call('posts.remove', this.props.post._id)}>del</button>
          </li>
      );
    }
}