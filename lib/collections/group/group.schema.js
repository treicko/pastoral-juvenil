/* global SimpleSchema Meteor */

const groupSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  inCharges: {
    type: [String],
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  members: {
    type: [String],
  },
  publications: {
    type: [Object],
  },
  'publications.$._id': {
    type: String,
    autoValue: () => Meteor.uuid(),
  },
  'publications.$.description': {
    type: String,
  },
  'publications.$.userName': {
    type: String,
  },
  'publications.$.userId': {
    type: String,
  },
  'publications.$.userImage': {
    type: String,
  },
  'publications.$.comments': {
    type: [Object],
  },
  'publications.$.comments.$._id': {
    type: String,
    autoValue: () => Meteor.uuid(),
  },
  'publications.$.comments.$.userName': {
    type: String,
  },
  'publications.$.comments.$.userId': {
    type: String,
  },
  'publications.$.comments.$.userImage': {
    type: String,
  },
  'publications.$.comments.$.comment': {
    type: String,
  },
  createdAt: {
    type: Date,
    autoValue: () => new Date(),
    autoform: {
      type: 'hidden',
    },
  },
  updatedAt: {
    type: Date,
    autoValue: () => new Date(),
    autoform: {
      type: 'hidden',
    },
  },
});

module.exports = groupSchema;
