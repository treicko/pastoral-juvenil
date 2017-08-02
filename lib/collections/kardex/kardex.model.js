import KardexSchema from './kardex.schema';

Kardex = new Meteor.Collection('kardex');

Kardex.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});
Kardex.attachSchema(KardexSchema);

Meteor.methods({
  insertKardexOnGroup: function(userId, groupId) {
    console.log('En el insert nooooooooo');
    let newKardexOnGroup = {
      'userId': userId,
      'groups': [{ groupId: groupId }],
      'events': []
    };

    Kardex.insert(newKardexOnGroup);
  },
  insertKardexOnEvent: function(userId, eventId) {
    let newKardexOnEvent = {
      'userId': userId,
      'groups': [],
      'events': [{ eventId: eventId }]
    };

    Kardex.insert(newKardexOnEvent);
  },
  updateKardexGroups: function(id, currentState) {
    console.log('leo hermano entro en el update de kardex');
    Kardex.update(id, {
      $set: {
        groups: currentState
      }
    });
  },
  updateKardexEvents: function(id, currentState) {
    console.log('leo hermano entro en el update de kardex de eventos');
    Kardex.update(id, {
      $set: {
        events: currentState
      }
    });
  },
});