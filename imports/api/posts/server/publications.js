import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts.js';

Meteor.publish('posts', function post() {
     return Posts.find();
 });
 Meteor.publish('posts.favorites', function post() {
    return Posts.find({ favorites: Meteor.userId() });
});

