import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Posts = new Mongo.Collection('posts');

//server side 
if(Meteor.isServer){
   Meteor.publish('posts', function postsInList() {
        return Posts.find();
    });
}


Meteor.methods({
    'posts.insert'(text) {
      check(text, String);
   
    // Make sure the user is logged in before inserting a task
    //   if (! this.userId) {
    //     throw new Meteor.Error('not-authorized');
    //   }
      Posts.insert({
        text,
        createdAt: new Date(),
      });
    },
    'posts.remove'(postId){
        check(postId, String);
        const post = Posts.findOne(postId);
        Posts.remove(post);
    },
  });