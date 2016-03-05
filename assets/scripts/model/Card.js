var Suit = require('Suit');
var Point = require('Point');

/**
 * 卡牌类.
 * @class Card
 */
var Card = cc.Class({
    properties: {
        _suit: null,
        _point: null,

        // 卡牌号
        id: {
            get: function() {
                return this._suit * 13 + (this._point - 1);
            }
        },
        // 花色
        suit: {
            get: function() {
                return this._suit;
            }
        },
        // 点数
        point: {
            get: function() {
                return this._point;
            }
        },
        // 花色名
        suitName: {
            get: function() {
                return Suit[this._suit];
            }
        },
        // 点数名
        pointName: {
            get: function() {
                return Point[this._point];
            }
        },
        // 是否是红花色
        isBlackSuit: {
            get: function() {
                return this._suit == Suit.S || this._suit == Suit.C;
            }
        },
        // 是否是黑花色
        isRedSuit: {
            get: function() {
                return this._suit == Suit.H || this._suit == Suit.D;
            }
        },
    },

    // 构造函数
    ctor: function(suit, point) {
        this._suit = suit;
        this._point = point;
    },
    // 字符串方法
    toString: function() {
        return this.pointName + '_' + this.suitName;
    },
});

module.exports = Card;
