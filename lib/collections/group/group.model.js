/* global Meteor check */
/* eslint-disable meteor/audit-argument-checks */
/* eslint-disable no-undef */

import GroupSchema from './group.schema';

Groups = new Meteor.Collection('groups');

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
  editGroup: (groupId, data) => {
    check(groupId, String);
    Groups.update(groupId, { $set: data });
  },
  insertGroup: group => Groups.insert(group),
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
  deleteGroup: (id) => {
    Groups.remove(id);
  },
});
