class Deck {
  constructor(cards) {
    this.cards = cards;
  }

  checkLength() {
    return this.cards.length
  }
}

module.exports = Deck;