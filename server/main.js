import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import Users from '/imports/api/users';
import Posts from '/imports/api/posts/publications';

function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );
  }
});
