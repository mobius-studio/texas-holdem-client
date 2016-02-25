// 花色
'use strict';

var Suit = cc.Enum({
    Spade: 1, // 黑桃
    Heart: 2, // 红桃
    Club: 3, // 梅花
    Diamond: 4 });
// 卡牌号
// 方块
var Point = cc.Enum({
    A: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13
});
/**
 * 卡牌对象，表示卡牌的基本属性，不包含游戏逻辑，
 * 所有属性只读，全局需要有52个实例（去掉大小王）。
 * @class Card
 * @param {number} suit
 * @param {number} point
 */
function Card(suit, point) {
    Object.defineProperties(this, {
        suit: {
            value: suit,
            writable: false
        },
        point: {
            value: point,
            writable: false
        },
        suitName: {
            get: function get() {
                return Suit[this.suit];
            }
        },
        pointName: {
            get: function get() {
                return Point[this.point];
            }
        }
    });
}

Card.prototype.toString = function () {
    return this.suitName + ' ' + this.pointName;
};

var cards = [];

(function () {
    for (var s = 1; s <= 4; s++) {
        for (var i = 1; i <= 13; i++) {
            cards.push(new Card(s, i));
        }
    }
})();

module.exports = {
    Suit: Suit,
    Point: Point,
    Card: Card
};