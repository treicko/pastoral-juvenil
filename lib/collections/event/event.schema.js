const eventSchema = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String    
  },
  ubication: {
    type: String
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  /*map: {
    type: Array,
    minCount: 1,
    maxCount: 2,
    autoform: {
      type: "hidden"
    }
  },
  'map.$': {
    type: Object
  },
  'map.$.type': {
    type: String
  },
  'map.$.latitude': {
    type: String
  },
  'map.$.longitude': {
    type: String
  },
  'map.$.radius': {
    type: Number
  },*/
  participants: {
    type: [String],
    autoValue: function() {
      return [];
    },
    autoform: {
      type: "hidden"
    }
  },
  comments: {
    type: [String],
    autoValue: function() {
      return [];
    },
    autoform: {
      type: "hidden"
    }
  },
  isDeleted: {
    type: Boolean,
    label: "Is deleted",
    autoValue: function() {
      return false;
    },
    autoform: {
      type: "hidden"
    }
  },
  date: {
    type: Date,
    label: "Event date",
    autoform: {
        value: new Date(moment().format())
    }
  },
  createdAt: {
    type: Date,
    label: "Create at",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  },
  updatedAt: {
    type: Date,
    label: "Updated at",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: "hidden"
    }
  }
});

module.exports = eventSchema;