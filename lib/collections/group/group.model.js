/* global Meteor check */
/* eslint-disable meteor/audit-argument-checks */
import GroupSchema from './group.schema';

const Groups = new Meteor.Collection('groups');

/* Groups.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc) {
    return !!userId;
  }
}); */

Groups.attachSchema(GroupSchema);

Meteor.methods({
  editGroup: (groupId, editedGroup) => {
    check(groupId, String);
    Groups.update(groupId, {
      $set: {
        name: editedGroup.name,
        location: editedGroup.location,
        inCharge: editedGroup.inCharge,
        description: editedGroup.description,
        latitude: editedGroup.latitude,
        longitude: editedGroup.longitude,
        members: editedGroup.members,
      },
    });
  },
  insertGroup: (group) => {
    Groups.insert(group);
  },
  insertPublication: (publication) => {
    const newPublication = {
      description: publication.description,
      userName: publication.userName,
      userId: publication.userId,
      userImage: publication.userImage,
      comments: publication.comments,
    };
    Groups.update(publication.groupId, {
      $push: { publications: newPublication },
    });
  },
  insertComment: (comment) => {
    const newComment = {
      userName: comment.userName,
      userId: comment.userId,
      userImage: comment.userImage,
      comment: comment.comment,
    };

    Groups.update(
      { _id: comment.groupId, 'publications._id': comment.publicationId },
      { $push: { 'publications.$.comments': newComment } },
    );
  },
  updateMembers: (groupId, currentState) => {
    check(groupId, String);
    Groups.update(groupId, {
      $set: { members: currentState },
    });
  },
});
