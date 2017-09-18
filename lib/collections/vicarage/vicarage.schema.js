const vicarageSchema = new SimpleSchema({
  name: {
    type: String
  },
  department: {
    type: String    
  },
  isDeleted: {
    type: Boolean,
    autoValue: function() {
      return false;
    }
  },
  date: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  },
  updatedAt: {
    type: Date,  
    autoValue: function() {
      return new Date();
    }    
  }
});

module.exports = vicarageSchema;