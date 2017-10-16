import MemberSchema from './member.schema';

Members = new Meteor.Collection('members');

Members.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});
Members.attachSchema(MemberSchema);

Meteor.methods({
  insertMember: function(member) {
    Members.insert(member);
  }
});
