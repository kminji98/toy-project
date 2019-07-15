import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Posts } from '../posts.js';

Meteor.publish('posts', function postsInList() {
     return Posts.find();
 });


