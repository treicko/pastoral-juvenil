/* global Meteor */
/* eslint-disable meteor/audit-argument-checks */
/* eslint-disable no-undef */

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
  addMessageToMember: (member) => {
    Members.update(
      { userId: member.mailerId },
      {
        $push: { messages: member.messageId },
        $inc: { unReadMessage: 1 },
      },
    );
  },
});
