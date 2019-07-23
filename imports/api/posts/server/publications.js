import { Meteor } from 'meteor/meteor';
import { Posts } from '../posts.js';

Meteor.publish('posts', function () {
     return Posts.find();
 });
 Meteor.publish('posts.favorites', function () {
    return Posts.find({ favorites: Meteor.userId() });
});

