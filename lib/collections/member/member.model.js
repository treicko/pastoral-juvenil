/* global Meteor */
/* eslint-disable meteor/audit-argument-checks */

import MemberSchema from './member.schema';

const Members = new Meteor.Collection('members');

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
        $push: {
          messages: {
            userId: member.receiverId,
            messageId: member.messageId,
            mailerMessageId: member.mailerMessageId,
          },
        },
      },
    );
  },
});
