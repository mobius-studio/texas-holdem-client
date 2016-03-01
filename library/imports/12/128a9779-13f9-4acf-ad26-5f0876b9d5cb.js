'use strict';

var SuitEnum = require('SuitEnum');
var PointEnum = require('PointEnum');

/**
 * 卡牌对象，表示卡牌的基本属性，不包含游戏逻辑，
 * 所有属性只读，全局需要有52个实例（去掉大小王）。
 * @class Card
 * @param {Number} suit
 * @param {Number} point
 */
function CardModule(suit, point) {
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
            get: function get() {
                return SuitEnum[suit];
            }
        },
        pointName: {
            get: function get() {
                return PointEnum[point];
            }
        },
        isBlackSuit: {
            get: function get() {
                return suit == SuitEnum.Spade || suit == SuitEnum.Club;
            }
        },
        isRedSuit: {
            get: function get() {
                return suit == SuitEnum.Heart || suit == SuitEnum.Diamond;
            }
        }
    });
}

CardModule.prototype.toString = function () {
    return PointEnum[this.point] + '[' + SuitEnum[this.suit] + ']';
};

module.exports = CardModule;