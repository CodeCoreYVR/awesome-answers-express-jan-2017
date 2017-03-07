const express = require('express');
const router = express.Router();
// to load all models with sequelize, require
// the index.js file in the models folder
// const models = require('../models/index');
// models.Question 👈 gets Question model object

const {Question} = require('../models/index');

router.get('/new', function (req, res, next) {
  res.render('questions/new')
});

router.post('/', function (req, res, next) {
  // check if we received body params from form post
  // res.send(req.body)
});

router.get('/', function(req, res, next) {
  // the .findAll method (available on models)
  // returns a Promise that resolves to a collection of all instances of the
  // the model
  // it can take an object as argument to configure the results
  // Here we use order to sort all questions by its createdAt column in descending order
  // then its updatedAt column in descending order
  Question
    .findAll({order: [['createdAt', 'DESC'], ['updatedAt', 'DESC']]})
    .then(
      questions => {
        res.render('questions/index', {questions})
      }
    )
});

router.get('/:id', function(req, res, next) {
  const {id} = req.params;

  // .findById is an asynchronous method that queries the database which
  // means that it returns a promise. To the get the resolved value of the promise,
  // we use its .then method and pass it a callback
  Question
    .findById(id)
    .then(
      question => res.render('questions/show', {question})
    )
    .catch(
      // The next function is a parameter passed to the callback function this is
      // part of. Calling it will tell express to move on to the next middleware
      // which are error handlers (in this case)
      // 👇 in this situation, we let the error handlers display the error message
      err => next(err)
    )
});

module.exports = router;











/* */
