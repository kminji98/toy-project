import { Meteor } from 'meteor/meteor';

export const Posts = new Mongo.Collection('posts');

Meteor.methods({
    'posts.insert'(userId, userName, title, subtitle, description) {
      if (! this.userId) { throw new Meteor.Error('not-authorized');}
      Posts.insert({
        userId,
        userName,
        title,
        subtitle,
        description,
        createdAt: new Date(),
      });
    },
    'posts.comment'(postId, userId, userName, content) {
        if (! this.userId) { throw new Meteor.Error('not-authorized'); }
        Posts.update(
          { _id : postId},
          {
            $push: {comments : {userId : userId, userName : userName, content : content, createdAt : new Date() } }       
          }
        );
      },
      'posts.favorite'(postId, userId) {
        if (! this.userId) { throw new Meteor.Error('not-authorized'); }
        Posts.update(
          { _id : postId},
          {
            $addToSet: { favorites : userId }       
          }
        );
      },
      'posts.cancelFavorite'(postId, userId) {
        if (! this.userId) { throw new Meteor.Error('not-authorized'); }
        Posts.update(
          { _id : postId},
          {
            $pull: { favorites : userId }       
          }
        );
      },
  });
