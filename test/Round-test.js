const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round');
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Turn = require('../src/Turn');

describe('Round', function() {

  // beforeEach(() => {
  //   var card1 = new Card({ id: 1, question: 'What is Robbie\'s favorite animal', answers: ['sea otter', 'pug', 'capybara'], correctAnswer: 'sea otter' });
  //   var card2 = new Card({ id: 14, question: 'What organ is Khalid missing?', answers: ['spleen', 'appendix', 'gallbladder'], correctAnswer: 'gallbladder' });
  //   var card3 = new Card({ id: 12, question: 'What is Travis\'s favorite stress reliever?', answers: ['listening to music', 'watching Netflix', 'playing with bubble wrap'], correctAnswer: 'playing with bubble wrap' })
  //   var deck = new Deck([card1, card2, card3])
  //   var round = new Round(deck);
  // });


  it('should be a function', function() {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', function() {
    const round = new Round();
    expect(round).to.be.an.instanceof(Round);
  });

  it('should take in a deck of cards for the Round', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');

    const deck = new Deck([card1, card2, card3]);

    const round = new Round(deck);
    expect(round.deck).to.equal(deck);
  });

  it('should return the current card for the round', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');

    const deck = new Deck([card1, card2, card3]);

    const round = new Round(deck);
    expect(round.returnCurrentCard()).to.equal(deck.cards[0]);
    round.takeTurn('test');
    expect(round.returnCurrentCard()).to.equal(deck.cards[1]);
  });

  it('should start out at 0 turns', function() {
    const round = new Round();
    expect(round.turnCount).to.equal(0);
  });

  it('Starts with no incorrect answers', function() {
    const round = new Round();
    expect(round.incorrectAnswers).to.eql([]);
  });

  it('Should be able to take turns, increasing the turn counter', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    round.takeTurn('test');
    round.takeTurn('test');
    expect(round.turnCount).to.equal(2);
  });

  it('Should be able to take turns, checking the answer against the current card', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    expect(round.takeTurn('sea otter')).to.equal('correct!');
    expect(round.turnCount).to.equal(1);
    expect(round.takeTurn('spleen')).to.equal('incorrect!');
    expect(round.turnCount).to.equal(2);
    expect(round.incorrectAnswers).to.eql([14])
    expect(round.returnCurrentCard()).to.equal(card3);
  });

  it('Should be able to let the user know the percent of correct answers', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    expect(round.takeTurn('sea otter')).to.equal('correct!');
    expect(round.turnCount).to.equal(1);
    expect(round.takeTurn('spleen')).to.equal('incorrect!');
    
    var percentCorrect = round.calculatePercentCorrect();
    expect(percentCorrect).to.equal(67);
  });

  it('Should be able to end the round and let the user know the percent of correct answers', function() {
    const card1 = new Card(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = new Card(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = new Card(12, 'What is Travis\'s favorite stress reliever?', ['listening to music', 'watching Netflix', 'playing with bubble wrap'], 'playing with bubble wrap');
    const deck = new Deck([card1, card2, card3]);
    const round = new Round(deck);
    expect(round.takeTurn('sea otter')).to.equal('correct!');
    expect(round.turnCount).to.equal(1);
    expect(round.takeTurn('spleen')).to.equal('incorrect!');
    
    round.endRound();
  });
}); 