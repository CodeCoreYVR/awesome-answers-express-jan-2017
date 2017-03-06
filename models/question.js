'use strict';
module.exports = function(sequelize, DataTypes) {
  const Question = sequelize.define('Question', {
    title: {type: DataTypes.STRING, unique: true},
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Question;
};
