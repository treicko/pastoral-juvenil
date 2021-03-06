/* global Template ReactiveVar FlowRouter Meteor $ Groups */
/* eslint-disable no-param-reassign */
import GroupController from './../../../../../lib/controllers/group.controller';

Template.groupPublications.onRendered(function() {
});

Template.groupPublications.onCreated(function() {
  this.groupController = new ReactiveVar(new GroupController());
  this.group = new ReactiveVar(null);

  this.autorun(() => {
    const groupId = FlowRouter.getParam('id');
    this.subscribe('singleGroupByPublications', groupId);

    if (Template.instance().subscriptionsReady()) {
      const groupFound = Groups.find({ _id: groupId }).fetch();
      if (groupFound && groupFound.length) {
        this.group.set(groupFound[0]);
      }
    }
  });
});

Template.groupPublications.helpers({
  group: () => {
    const groupFound = Template.instance().group.get();
    if (groupFound) {
      return groupFound;
    }
    return {};
  },
  publications: () => {
    const groupFound = Template.instance().group.get();
    if (groupFound) {
      return groupFound.publications;
    }
    return [];
  },
  user: () => {
    const currentUser = Meteor.user();
    return {
      _id: currentUser._id,
      email: currentUser.emails[0],
      name: currentUser.profile.name,
    };
  },
});

Template.groupPublications.events({
  'submit #new-publication-group': (event) => {
    event.preventDefault();
    const newPublication = {
      groupId: event.target.group_publication_groupId.value,
      description: event.target.group_publication_description.value,
      userName: event.target.group_publication_userName.value,
      userId: event.target.group_publication_userId.value,
      userImage: '',
      comments: [],
    };
    Template.instance().groupController.get().savePublication({
      newPublication,
      group: Template.instance().group.get(),
    });
    $('form')[0].reset();
    $('#group_publication_description').trigger('autoresize');
    return false;
  },

  'keypress .group-publication-comment': (event) => {
    if (event.which === 13) {
      const newComment = {
        groupId: document.getElementById('group_publication_groupId').value,
        publicationId: document.getElementById('group_comment_publicationId').value,
        userName: document.getElementById('group_publication_userName').value,
        userId: document.getElementById('group_publication_userId').value,
        userImage: '',
        comment: `${event.target.value}`,
      };

      Template.instance().groupController.get().saveComment({
        newComment,
        group: Template.instance().group.get(),
      });
      event.target.value = '';
      $(':focus').blur();
    }
  },
});
