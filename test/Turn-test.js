const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');

describe('Turn', function() {

  it('should be a function', function() {
    const turn = new Turn();
    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', function() {
    const turn = new Turn();
    expect(turn).to.be.an.instanceof(Turn);
  }); 

  it('Should take two arguments a string (that represents a user’s guess to the question), and a Card object for the current card in play.', function() {
    const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const turn = new Turn('pug', card);
    expect(turn.guess).to.equal('pug');
    expect(turn.card).to.equal(card);
  });  

  it('returnGuess: method that returns the guess', function() {
    const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const turn = new Turn('pug', card);
    expect(turn.returnGuess()).to.equal('pug');
    
  });  

  it('returnCard: method that returns the Card', function() {
    const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const turn = new Turn('pug', card);
    expect(turn.returnCard()).to.equal(card);
  });

  it('evaluateGuess: method that returns a boolean indicating if the user’s guess matches the correct answer on the card', function() {
    const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const turn = new Turn('pug', card);
    const turn1 = new Turn('sea otter', card);
    expect(turn.evaluateGuess()).to.equal(false);
    expect(turn1.evaluateGuess()).to.equal(true);
  });

  it('giveFeedback - method that returns either ‘incorrect!’ or ‘correct!’ based on whether the guess is correct or not.', function() {
    const card = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const turn = new Turn('pug', card);
    const turn1 = new Turn('sea otter', card);
    expect(turn.giveFeedback()).to.equal('incorrect!');
    expect(turn1.giveFeedback()).to.equal('correct!');
  });
});