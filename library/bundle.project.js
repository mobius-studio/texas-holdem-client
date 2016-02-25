require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"CardModule":[function(require,module,exports){
cc._RFpush(module, '128a9d5E/lKz60mXwh2udXL', 'CardModule');
// scripts/modules/CardModule.js

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

cc._RFpop();
},{}],"Card":[function(require,module,exports){
cc._RFpush(module, 'f0da5aqkQNIxLqBLAGN8du+', 'Card');
// scripts/Card.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        suit: {
            "default": null,
            type: cc.Label
        },
        point: {
            "default": null,
            type: cc.Label
        },
        front: {
            "default": null,
            type: cc.Sprite
        },
        back: {
            "default": null,
            type: cc.Sprite
        }
    },

    // foo: {
    //    default: null,
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"Game":[function(require,module,exports){
cc._RFpush(module, 'e3dbfyqwPxNl4kmoKQFh06m', 'Game');
// scripts/Game.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        // 底池
        pot: {
            "default": null,
            type: cc.Label
        }
    },

    // foo: {
    //    default: null,
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"HandModule":[function(require,module,exports){
cc._RFpush(module, 'f295dAxkd1ATo7FNGS6LwJc', 'HandModule');
// scripts/modules/HandModule.js

// 牌型，值越大越厉害
"use strict";

var HandType = cc.Enum({
    HighCard: -1, // 高牌
    OnePair: -1, // 一对
    TowPair: -1, // 两对
    Trips: -1, // 三条
    Straight: -1, // 顺子
    Flush: -1, // 同花
    FullHouse: -1, // 葫芦
    Quads: -1, // 四條
    StraightFlush: -1, // 同花顺
    RoyalFlush: -1 });

// 皇家同花顺
module.exports = {
    HandType: HandType
};

cc._RFpop();
},{}],"Hand":[function(require,module,exports){
cc._RFpush(module, '17b004f4ZZAR57Vi4rq0kKd', 'Hand');
// scripts/Hand.js

'use strict';

var CardModule = require('CardModule');
var HandModule = require('HandModule');

cc.Class({
    'extends': cc.Component,

    properties: {
        playerPrefab: {
            'default': null,
            type: cc.Prefab
        }
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"CardModule":"CardModule","HandModule":"HandModule"}],"Player":[function(require,module,exports){
cc._RFpush(module, 'e99128e3RxD1LR4d1pc7Hqj', 'Player');
// scripts/Player.js

'use strict';

var CardModule = require('CardModule');
var HandModule = require('HandModule');

cc.Class({
    'extends': cc.Component,

    properties: {
        id: '',
        playerName: {
            'default': null,
            type: cc.Label
        }

    },

    // foo: {
    //    default: null,
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"CardModule":"CardModule","HandModule":"HandModule"}]},{},["CardModule","Hand","Game","Player","Card","HandModule"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdHMvbW9kdWxlcy9DYXJkTW9kdWxlLmpzIiwiYXNzZXRzL3NjcmlwdHMvQ2FyZC5qcyIsImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiLCJhc3NldHMvc2NyaXB0cy9tb2R1bGVzL0hhbmRNb2R1bGUuanMiLCJhc3NldHMvc2NyaXB0cy9IYW5kLmpzIiwiYXNzZXRzL3NjcmlwdHMvUGxheWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2MuX1JGcHVzaChtb2R1bGUsICcxMjhhOWQ1RS9sS3o2MG1Yd2gydWRYTCcsICdDYXJkTW9kdWxlJyk7XG4vLyBzY3JpcHRzL21vZHVsZXMvQ2FyZE1vZHVsZS5qc1xuXG4vLyDoirHoibJcbid1c2Ugc3RyaWN0JztcblxudmFyIFN1aXQgPSBjYy5FbnVtKHtcbiAgICBTcGFkZTogMSwgLy8g6buR5qGDXG4gICAgSGVhcnQ6IDIsIC8vIOe6ouahg1xuICAgIENsdWI6IDMsIC8vIOaiheiKsVxuICAgIERpYW1vbmQ6IDQgfSk7XG4vLyDljaHniYzlj7dcbi8vIOaWueWdl1xudmFyIFBvaW50ID0gY2MuRW51bSh7XG4gICAgQTogMSxcbiAgICAyOiAyLFxuICAgIDM6IDMsXG4gICAgNDogNCxcbiAgICA1OiA1LFxuICAgIDY6IDYsXG4gICAgNzogNyxcbiAgICA4OiA4LFxuICAgIDk6IDksXG4gICAgMTA6IDEwLFxuICAgIEo6IDExLFxuICAgIFE6IDEyLFxuICAgIEs6IDEzXG59KTtcbi8qKlxuICog5Y2h54mM5a+56LGh77yM6KGo56S65Y2h54mM55qE5Z+65pys5bGe5oCn77yM5LiN5YyF5ZCr5ri45oiP6YC76L6R77yMXG4gKiDmiYDmnInlsZ7mgKflj6ror7vvvIzlhajlsYDpnIDopoHmnIk1MuS4quWunuS+i++8iOWOu+aOieWkp+Wwj+eOi++8ieOAglxuICogQGNsYXNzIENhcmRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdWl0XG4gKiBAcGFyYW0ge251bWJlcn0gcG9pbnRcbiAqL1xuZnVuY3Rpb24gQ2FyZChzdWl0LCBwb2ludCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICAgc3VpdDoge1xuICAgICAgICAgICAgdmFsdWU6IHN1aXQsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgcG9pbnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwb2ludCxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBzdWl0TmFtZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN1aXRbdGhpcy5zdWl0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcG9pbnROYW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9pbnRbdGhpcy5wb2ludF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuQ2FyZC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VpdE5hbWUgKyAnICcgKyB0aGlzLnBvaW50TmFtZTtcbn07XG5cbnZhciBjYXJkcyA9IFtdO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIHMgPSAxOyBzIDw9IDQ7IHMrKykge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSAxMzsgaSsrKSB7XG4gICAgICAgICAgICBjYXJkcy5wdXNoKG5ldyBDYXJkKHMsIGkpKTtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFN1aXQ6IFN1aXQsXG4gICAgUG9pbnQ6IFBvaW50LFxuICAgIENhcmQ6IENhcmRcbn07XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnZjBkYTVhcWtRTkl4THFCTEFHTjhkdSsnLCAnQ2FyZCcpO1xuLy8gc2NyaXB0cy9DYXJkLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3VpdDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBwb2ludDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBmcm9udDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcbiAgICAgICAgYmFjazoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBmb286IHtcbiAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgIC8vIH0sXG4gICAgLy8gLi4uXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2UzZGJmeXF3UHhObDRrbW9LUUZoMDZtJywgJ0dhbWUnKTtcbi8vIHNjcmlwdHMvR2FtZS5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOW6leaxoFxuICAgICAgICBwb3Q6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBmb286IHtcbiAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgIC8vIH0sXG4gICAgLy8gLi4uXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2YyOTVkQXhrZDFBVG83Rk5HUzZMd0pjJywgJ0hhbmRNb2R1bGUnKTtcbi8vIHNjcmlwdHMvbW9kdWxlcy9IYW5kTW9kdWxlLmpzXG5cbi8vIOeJjOWei++8jOWAvOi2iuWkp+i2iuWOieWus1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBIYW5kVHlwZSA9IGNjLkVudW0oe1xuICAgIEhpZ2hDYXJkOiAtMSwgLy8g6auY54mMXG4gICAgT25lUGFpcjogLTEsIC8vIOS4gOWvuVxuICAgIFRvd1BhaXI6IC0xLCAvLyDkuKTlr7lcbiAgICBUcmlwczogLTEsIC8vIOS4ieadoVxuICAgIFN0cmFpZ2h0OiAtMSwgLy8g6aG65a2QXG4gICAgRmx1c2g6IC0xLCAvLyDlkIzoirFcbiAgICBGdWxsSG91c2U6IC0xLCAvLyDokavoiqZcbiAgICBRdWFkczogLTEsIC8vIOWbm+ainVxuICAgIFN0cmFpZ2h0Rmx1c2g6IC0xLCAvLyDlkIzoirHpobpcbiAgICBSb3lhbEZsdXNoOiAtMSB9KTtcblxuLy8g55qH5a625ZCM6Iqx6aG6XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBIYW5kVHlwZTogSGFuZFR5cGVcbn07XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnMTdiMDA0ZjRaWkFSNTdWaTRycTBrS2QnLCAnSGFuZCcpO1xuLy8gc2NyaXB0cy9IYW5kLmpzXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENhcmRNb2R1bGUgPSByZXF1aXJlKCdDYXJkTW9kdWxlJyk7XG52YXIgSGFuZE1vZHVsZSA9IHJlcXVpcmUoJ0hhbmRNb2R1bGUnKTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwbGF5ZXJQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnZTk5MTI4ZTNSeEQxTFI0ZDFwYzdIcWonLCAnUGxheWVyJyk7XG4vLyBzY3JpcHRzL1BsYXllci5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDYXJkTW9kdWxlID0gcmVxdWlyZSgnQ2FyZE1vZHVsZScpO1xudmFyIEhhbmRNb2R1bGUgPSByZXF1aXJlKCdIYW5kTW9kdWxlJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWQ6ICcnLFxuICAgICAgICBwbGF5ZXJOYW1lOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gZm9vOiB7XG4gICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAvLyB9LFxuICAgIC8vIC4uLlxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge31cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7Il19
