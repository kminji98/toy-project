import { Meteor } from 'meteor/meteor';

export const Posts = new Mongo.Collection('posts');

const schema = new SimpleSchema ({
  userId : { type : String },
  userName : { type : String },
  title : { type : String },
  subtitle : { type : String },
  description : { type : String },
  createdAt : { type : Date },
  favorites : { type : Array },
  'favorites.$' : { type : String },
  comments : { type : Array },
  'comments.$':{ type: Object },
  'comments.$.userId': { type : String },
  'comments.$.userName': { type : String },
  'comments.$.content': { type : String },
  'comments.$.createdAt': { type : Date },
});

Posts.attachSchema(schema);

Meteor.methods({
    'posts.insert'(userId, userName, title, subtitle, description) {
      if (! this.userId) { throw new Meteor.Error('not-authorized');}
      Posts.insert({
        userId,
        userName,
        title,
        subtitle,
        description,
        favorites: [],
        comments: [],
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
      'posts.update'(postId, title, subtitle, description) {
        if (! this.userId) { throw new Meteor.Error('not-authorized'); }
        Posts.update(
          { _id : postId},
          {
            $set: { 
              title : title,
              subtitle: subtitle,
              description: description
            }       
          }
        );
      },
  });
