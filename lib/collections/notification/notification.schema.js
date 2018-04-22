/* global SimpleSchema */

const notificationSchema = new SimpleSchema({
  memberActionName: {
    type: String,
  },
  action: {
    type: String,
  },
  entity: {
    type: String,
  },
  entityId: {
    type: String,
  },
  entityTag: {
    type: String,
  },
  isUnRead: {
    type: Boolean,
  },
  userName: {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: () => new Date(),
  },
});

module.exports = notificationSchema;
