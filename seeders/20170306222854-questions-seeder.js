'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    // when seeding a model, make sure to also include
    // the createdAt & updatedAt fields
    // you can assign it a new Date() as value
    const questions = [
      {
        title: 'John Doe',
        content: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    // .bulkInsert first argument is the name of the table
    // we want to use
    // its second argument is an array of objects where each object
    // as key and values representing the columns of the table
    return queryInterface.bulkInsert('Questions', questions, {});
  },
  // Sequelize seeds also have a reverse operation
  // We can tell it to delete all Questions in this context
  // sequelize db:seed:undo
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
