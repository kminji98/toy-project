import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


export const Posts = new Mongo.Collection('posts');


Meteor.methods({
    'posts.insert'(userid, title, subtitle, description) {
    // Make sure the user is logged in before inserting a task
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }
      Posts.insert({
        userid,
        title,
        subtitle,
        description,
        createdAt: new Date(),
      });
    },
    'posts.remove'(postId){
        check(postId, String);
        const post = Posts.findOne(postId);
        Posts.remove(post);
    },
  });
