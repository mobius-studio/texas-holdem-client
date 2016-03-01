var Suit = require('Suit');
var Point = require('Point');

/**
 * 卡牌对象，表示卡牌的基本属性，不包含游戏逻辑，
 * 所有属性只读，全局需要有52个实例（去掉大小王）。
 * @class Card
 * @param {Number} suit
 * @param {Number} point
 */
function CardModule (suit, point) {
    Object.defineProperties(this, {
        suit: {
            value: suit,
            writable: false
        },
        point: {
            value: point,
            writable: false
        },
		id: {
			value: (suit - 1) * 13 + (point - 1),
			writable: false
		},
		suitName: {
		    get: function() {
		        return Suit[suit];
		    }
		},
		pointName: {
            get: function() {
                return Point[point];
            }
		},
        isBlackSuit: {
            get: function() {
                return suit == Suit.Spade || suit == Suit.Club;
            }
        },
        isRedSuit: {
            get: function() {
                return suit == Suit.Heart || suit == Suit.Diamond;
            }
        }
    });
}

CardModule.prototype.toString = function() {
    return Point[this.point] + '[' + Suit[this.suit] + ']';
}

module.exports = CardModule;
