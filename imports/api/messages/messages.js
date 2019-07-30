import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Messages = new Mongo.Collection('messages');

const schema = new SimpleSchema ({
  userId : { type : String },
  text : { type : String },
  date : { type : Date },
});

Messages.attachSchema(schema);

Meteor.methods({
  'messages.insert'(text) {
      const userId = Meteor.userId();
      if (! userId) { throw new Meteor.Error('not-authorized');}
    Messages.insert({
      userId : userId,
      text : text,
      date: new Date(),
    });
  },
});
