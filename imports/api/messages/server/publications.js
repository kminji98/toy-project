import { Messages } from '../messages.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('messages', function () {
    return Messages.find();
});