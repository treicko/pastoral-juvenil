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
  editGroup: function(groupId, editedGroup){
    Groups.update(groupId, {
      $set: {
        name: editedGroup.name,
        location: editedGroup.location,
        inCharge: editedGroup.inCharge,
        description: editedGroup.description,
        latitude: editedGroup.latitude,
        longitude: editedGroup.longitude,
        members: editedGroup.members
      }
    });
  },
  insertGroup: function(group) {
    Groups.insert(group);
  },
  insertPublication: function(publication) {
    const newPublication = {
      description: publication.description,
      userName: publication.userName,
      userId: publication.userId,
      userImage: publication.userImage,
      comments: publication.comments
    };
    Groups.update(publication.groupId, {
      $push: { publications: newPublication }
    });
  },
  updateMembers: function(id, currentState) {
    Groups.update(id, {
      $set: {
        members: currentState
      }
    });
  }
});