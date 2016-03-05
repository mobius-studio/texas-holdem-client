var Card = require('Card');

/**
 * 一副牌
 * @class
 */
var Deck = cc.Class({
    properties: {
        _suitNum: 4,
        _pointNum: 13,
        _cards: {
            default: [],
            type: [cc.Class]
        },
    },

    // 构造函数
    ctor: function() {
        this._initDeck();
    },

    // 初始化一副牌
    _initDeck: function() {
        for (var suit = 0; suit < this._suitNum; suit++) {
            for (var point = 1; point <= this._pointNum; point++) {
                this._cards.push(new Card(suit, point));
            }
        }
    },

    // 发牌
    deal: function() {
        return this._cards.pop();
    },

    // 洗牌
    shuffle: function() {
        this.shuffleArray(this._cards);
    },

    /**
     * 洗牌默认算法
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     * http://stackoverflow.com/a/12646864
     */
    shuffleArray: function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = (Math.random() * (i + 1)) | 0;
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    },
});

module.exports = Deck;
