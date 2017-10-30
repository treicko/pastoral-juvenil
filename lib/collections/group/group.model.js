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
  insertComment: function(comment) {
    console.log('Group model: ', comment);
    const newComment = {
      userName: comment.userName,
      userId: comment.userId,
      userImage: comment.userImage,
      comment: comment.comment
    };

    Groups.update(
      { _id: comment.groupId, 'publications._id': comment.publicationId },
      { $push: { 'publications.$.comments': newComment }
    });
  },
  updateMembers: function(groupId, currentState) {
    Groups.update(groupId, {
      $set: {
        members: currentState
      }
    });
  }
});