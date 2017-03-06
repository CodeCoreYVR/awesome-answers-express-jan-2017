'use strict';

// load faker package
const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    // when seeding a model, make sure to also include
    // the createdAt & updatedAt fields
    // you can assign it a new Date() as value

    // Array.from is method to create arrays from various array-like objects
    // and iterable things
    // it also be used as follows to create an array of determinate size:
    // - first argument an object {length: <array-size>}
    // - second argument a callback whose return value will be used for
    // array values (similar to mapping over the array)
    const questions = Array.from(
      {length: 20},
      (value, index) => ({
        title: faker.lorem.words(3),
        content: faker.lorem.paragraphs(2),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    )
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
