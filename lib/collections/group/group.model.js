import GroupSchema from './group.schema';

Groups = new Meteor.Collection('groups');

Groups.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
});
Groups.attachSchema(GroupSchema);

Meteor.methods({
  insertGroup: function(group) {
    console.log("Call groups: ", group);
    Groups.insert(group);
  },
  updateMembers: function(id, currentState) {
    Groups.update(id, {
      $set: {
        members: currentState
      }
    });
  },
});
