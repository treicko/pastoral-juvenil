/* global Meteor */
/* eslint-disable meteor/audit-argument-checks */
/* eslint-disable no-undef */
/* eslint-disable no-dupe-keys */

import MemberSchema from './member.schema';

Members = new Meteor.Collection('members');

/* Members.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
}); */

Members.attachSchema(MemberSchema);

Meteor.methods({
  insertMember: (member) => {
    Members.insert(member);
  },
  addMessageToMailer: (member) => {
    Members.update(
      { userId: member.mailerId },
      { $push: { messages: member.messageId } },
    );
  },
  addMessageToMember: (member) => {
    Members.update(
      { userId: member.mailerId },
      { $push: { messages: member.messageId, unReadMessage: member.unReadMessage } },
      { multi: true },
    );
  },
  updateMemberByUserId: (memberId, data) => {
    Members.update({ userId: memberId }, { $set: data });
  },
  updateMessageToReceiver: (member) => {
    Members.update(
      { userId: member.userId },
      { $push: { unReadMessage: member.unReadMessage } },
    );
  },
});
