const Turn = require('../src/Turn');

class Round {
  constructor(deckObj) {
    this.deck = deckObj;
    this.turnCount = 0;
    this.incorrectAnswers = [];
  }

  returnCurrentCard() {
    return this.deck.cards[this.turnCount];
  }

  takeTurn(answer) {
    var turn = new Turn(answer, this.deck.cards[this.turnCount]);
    if (turn.evaluateGuess() === false) {
      this.incorrectAnswers.push(this.deck.cards[this.turnCount].id);
    }
    this.turnCount++
    return turn.giveFeedback();
  }

  calculatePercentCorrect() {
    var fraction = (this.deck.checkLength() - this.incorrectAnswers.length) / this.deck.checkLength();
    return Math.round(fraction*100)
  }

  endRound() {
    this.turnCount = 0;
    console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly!`)
  }

}

module.exports = Round;