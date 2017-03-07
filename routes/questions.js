const express = require('express');
const router = express.Router();
// to load all models with sequelize, require
// the index.js file in the models folder
// const models = require('../models/index');
// models.Question 👈 gets Question model object

// grab Question and Answer model objects from
// models/index module
const {Question, Answer} = require('../models/index');

// PATH /questions/new METHOD: get
router.get('/new', function (req, res, next) {
  res.render('questions/new', {question: Question.build()})
});

// Answers#create
// PATH /questions/:questionId/answers METHOD: post
router.post('/:questionId/answers', function (req, res, next) {
  const {questionId} = req.params;
  const {content} = req.body;

  Answer
    .create({content, QuestionId: questionId})
    .then(() => res.redirect(`/questions/${questionId}`))
    .catch(err => next(err))
})

// PATH /questions METHOD: post
router.post('/', function (req, res, next) {
  // check if we received body params from form post
  // res.send(req.body)

  // We destructure form fields for our Question from the req.body
  // title & content map to the name (i.e. html attribute name) of
  // the respective fields in our new Question form
  const {title, content} = req.body;

  // All Sequelize models have a .create method that takes an object
  // that represent the attributes of the model instance to be created
  Question
    .create({title, content})
    .then(question => res.redirect(`/questions/${question.id}`))
    // next is a function passed to this callback that will
    // make the next middleware handle the request
    .catch(err => next(err))
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

// Questions#destroy
// PATH /questions/:id METHOD: delete
router.delete('/:id', function (req, res, next) {
  const {id} = req.params;

  Question
    .findById(id)
    .then(question => question.destroy())
    .then(() => res.redirect(`/questions`))
    .catch(err => next(err));
})

// Questions#edit
// PATH /questions/:id/edit METHOD: get
router.get('/:id/edit', function (req, res, next) {
  const {id} = req.params;

  Question
    .findById(id)
    .then(question => res.render('questions/edit', {question}))
    .catch(err => next(err))
})

// Questions#show
// PATH /questions/:id METHOD: get
router.get('/:id', function(req, res, next) {
  const {id} = req.params;

  // .findById is an asynchronous method that queries the database which
  // means that it returns a promise. To the get the resolved value of the promise,
  // we use its .then method and pass it a callback
  Question
    .findById(id)
    // promises can only resolve one value
    // to resolve "multiple values" we wrap them in an array
    // If any of the values in our array is a promise, we need to resolve them
    // use Promise.all to do so. It will resolve an array with the resolved values
    // of elements of the array.
    .then(question => Promise.all([question, question.getAnswers({order: [['updatedAt', 'DESC']]})]))
    .then(
      ([question, answers]) => res.render('questions/show', {question, answers})
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
