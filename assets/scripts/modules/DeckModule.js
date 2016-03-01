var CardModule = require('CardModule');

/**
 * 卡牌管理类，用来管理一副或多副牌。
 * @class Deck
 * @constructor
 * @param {number} numberOfDeck - 总共几副牌
 */
function DeckModule (numberOfDeck) {
    Object.defineProperties(this, {
        numberOfDeck: {
            value: numberOfDeck,
            writable: false
        },
        cards: {
            value: [],
            writable: true
        }
    });
    this.init();
}

DeckModule.prototype.init = function() {
    for (var i = 0; i < this.numberOfDeck; i++) {
        this.initDeck();
    }
}

DeckModule.prototype.initDeck = function() {
    for (var s = 0; s < 4; s++) {
        for (var p = 1; p <= 13; p++) {
            var card = new CardModule(s, p);
            this.cards.push(card);
        }
    }
}

/**
* 发一张牌
* @method deal
* @return {Card}
*/
DeckModule.prototype.deal = function () {
    return this.cards.pop();
};

/**
* 洗牌
* @method shuffle
*/
DeckModule.prototype.shuffle = function () {
    shuffleArray(this.cards);
};

/**
* Randomize array element order in-place.
* Using Durstenfeld shuffle algorithm.
* http://stackoverflow.com/a/12646864
*/
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = (Math.random() * (i + 1)) | 0;
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

module.exports = DeckModule;
