import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Users from '../api/users';
import { Texts } from '../api/texts';
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
        // const tt = ReactDOM.findDOMNode(this.refs.textInput).value;
        // this.setState({text: tt});
        Users.insert({
            text: this.state.text, 
            createAt: new Date(),
        });
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
  showUsers(user) {
    return (
      <li key={user._id}>
        {user.text}
      </li>
    );
  }
  render() {
      const users = this.props.users.map(
          user => this.showUsers(user)
      );
    return (
      <div>
          <button>Another Page</button>
          <form onSubmit={this.saveText.bind(this)}>
             <input onChange={this.handleChange} type="text" text={this.state.text} ref="textInput" />
          </form>
        <button onClick={this.saveText.bind(this)}>Save Text</button>
        <br/>
        <button onClick={() => this.increment()}>Click Me</button>
        <p>You've pressed the button {this.state.counter} times.</p>
        <ul>{ users }</ul>
      </div>
    );
  }

  
}

export default LoginContainer = withTracker(() => {
    return {
      users: Users.find({ }).fetch(),
    };
  })(Login);