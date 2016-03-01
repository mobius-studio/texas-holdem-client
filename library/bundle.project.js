require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"BettingRoundEnum":[function(require,module,exports){
cc._RFpush(module, '253c2oRFo1K4rNf5EdBWix6', 'BettingRoundEnum');
// scripts/enums/BettingRoundEnum.js

// 下注轮
"use strict";

var BettingRoundEnum = cc.Enum({
    PreFlop: 1, // "pre-flop" betting round
    Flop: 2, // "flop" betting round
    Third: 3, // a third betting round
    Fourth: 4 });

// a fourth betting round
module.exports = BettingRoundEnum;

cc._RFpop();
},{}],"CardModule":[function(require,module,exports){
cc._RFpush(module, '128a9d5E/lKz60mXwh2udXL', 'CardModule');
// scripts/modules/CardModule.js

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

cc._RFpop();
},{"PointEnum":"PointEnum","SuitEnum":"SuitEnum"}],"CardPrefab":[function(require,module,exports){
cc._RFpush(module, '7dabauTFOFHNrDx4ulnujZa', 'CardPrefab');
// scripts/prefabs/CardPrefab.js

'use strict';

var SuitEnum = require('SuitEnum');
var PointEnum = require('PointEnum');
var CardModule = require('CardModule');

cc.Class({
    'extends': cc.Component,

    properties: {
        // 花色
        suit: {
            'default': null,
            type: cc.Sprite
        },
        // 点数
        point: {
            'default': null,
            type: cc.Label
        },
        // 正面图案
        contents: {
            'default': null,
            type: cc.Sprite
        },
        // 正面背景
        frontBG: {
            'default': null,
            type: cc.SpriteFrame
        },
        // 反面背景
        backBG: {
            'default': null,
            type: cc.SpriteFrame
        },
        // 花色资源
        suits: {
            'default': [],
            type: cc.SpriteFrame
        },
        // 图案资源
        faces: {
            'default': [],
            type: cc.SpriteFrame
        },
        // 图案花色资源
        // TODO 目前只是一个大的花色图案，之后需要变成真正的花色图案。
        contentsSuits: {
            'default': [],
            type: cc.SpriteFrame
        },
        redColor: cc.Color.RED,
        blackColor: cc.Color.BLACK
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
    render: function render(card) {
        // suit
        this.suit.spriteFrame = this.suits[card.suit - 1];
        // point
        this.point.string = PointEnum[card.point];
        if (card.isRedSuit) {
            //this.point.node.color = this.redColor;
        } else if (card.isBlackSuit) {}
            //this.point.node.color = this.blackColor;

            // contents
        if (card.point > 10) {
            this.contents.spriteFrame = this.faces[card.point - 10 - 1];
        } else {
            this.contents.spriteFrame = this.contentsSuits[card.suit - 1];
        }
    },

    /**
     * 翻牌
     * @param {boolean} - faceUP: true, faceDown: false
     */
    reveal: function reveal(isFaceUp) {
        this.suit.node.active = isFaceUp;
        this.point.node.active = isFaceUp;
        this.contents.node.active = isFaceUp;
        this.contents.spriteFrame = isFaceUp ? this.frontBG : this.backBG;
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"CardModule":"CardModule","PointEnum":"PointEnum","SuitEnum":"SuitEnum"}],"DeckModule":[function(require,module,exports){
cc._RFpush(module, 'df963Gq3YNDwoC6HJUi44vv', 'DeckModule');
// scripts/modules/DeckModule.js

'use strict';

var CardModule = require('CardModule');

/**
 * 卡牌管理类，用来管理一副或多副牌。
 * @class Deck
 * @constructor
 * @param {number} numberOfDeck - 总共几副牌
 */
function DeckModule(numberOfDeck) {
    Object.defineProperties(this, {
        _numberOfDeck: {
            value: numberOfDeck,
            writable: false
        },
        _cards: {
            value: [],
            writable: true
        }
    });
    for (var i = 1; i <= numberOfDeck; i++) {
        this.init();
    }
}

DeckModule.prototype.init = function () {
    for (var s = 1; s <= 4; s++) {
        for (var p = 1; p <= 13; p++) {
            var card = new CardModule(s, p);
            cc.log('init card {}.', card);
            this._cards.push(card);
        }
    }
};

/**
* 发一张牌
* @method deal
* @return {Card}
*/
DeckModule.prototype.deal = function () {
    return this._cards.pop();
};

/**
* 洗牌
* @method shuffle
*/
DeckModule.prototype.shuffle = function () {
    shuffleArray(this._cards);
};

/**
* Randomize array element order in-place.
* Using Durstenfeld shuffle algorithm.
* http://stackoverflow.com/a/12646864
*/
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.random() * (i + 1) | 0;
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

module.exports = DeckModule;

cc._RFpop();
},{"CardModule":"CardModule"}],"Game":[function(require,module,exports){
cc._RFpush(module, 'e3dbfyqwPxNl4kmoKQFh06m', 'Game');
// scripts/Game.js

'use strict';

var DeckModule = require('DeckModule');
var UserTypeEnum = require('UserTypeEnum');

var Game = cc.Class({
    'extends': cc.Component,

    properties: {
        i: 0,
        // 底池
        pot: {
            'default': null,
            type: cc.Label
        },
        cardPrefab: {
            'default': null,
            type: cc.Prefab
        },
        userPrefab: {
            'default': null,
            type: cc.Prefab
        },
        testNode: {
            'default': null,
            type: cc.Node
        },
        gameBG: {
            'default': null,
            type: cc.Sprite
        },
        users: {
            'default': [],
            type: [cc.Node]
        },
        totalChips: 0,
        numberOfDeck: 1,
        bettingRound: 0
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
    initDealer: function initDealer(UserPrefab) {
        UserPrefab.setUserType(UserTypeEnum.Dealer);
    },

    initSmallBlind: function initSmallBlind() {
        UserPrefab.setUserType(UserTypeEnum.SmallBlind);
    },

    initBigBlind: function initBigBlind() {
        UserPrefab.setUserType(UserTypeEnum.BigBlind);
    },

    createUsers: function createUsers() {
        for (var i = 0; i < 8; i++) {
            var userPrefab = cc.instantiate(this.userPrefab);
            var userNode = this.users[i];
            userPrefab.parent = userNode;
            userPrefab.setPosition = cc.p(0, 0);
            var UserPrefab = userPrefab.getComponent('UserPrefab');
        }
    },

    createCards: function createCards() {
        var card = this.deck.deal();
    },

    // 第一轮下注
    preflopBettingRound: function preflopBettingRound() {},

    // 第二轮下注
    flopBettingRound: function flopBettingRound() {},

    // 第三轮下注
    thirdBettingRound: function thirdBettingRound() {},

    // 第四轮下注
    fourthBettingRound: function fourthBettingRound() {},

    start: function start() {
        this.deck = new DeckModule(this.numberOfDeck);
        this.deck.shuffle();
    },

    // use this for initialization
    onLoad: function onLoad() {
        Game.instance = this;
        // 初始化一副牌
        this.deck = new DeckModule(this.numberOfDeck);
        this.deck.shuffle();
    },

    addStake: function addStake() {},

    // 洗牌
    shuffle: function shuffle() {
        this.deck.shuffle();
    },

    // 发牌
    deal: function deal() {
        var card = this.deck.deal();
    },

    backToMenu: function backToMenu() {
        cc.director.loadScene('menu');
    },

    test: function test() {
        var card = this.deck.deal();
        console.log(this.i);
        var cardPrefab = cc.instantiate(this.cardPrefab);
        cardPrefab.parent = this.testNode;
        var pos = cc.p(-300 + this.i * 50, -300 + this.i * 50);
        cardPrefab.setPosition(pos);
        var cardComponent = cardPrefab.getComponent('CardPrefab');
        cardComponent.render(card);
        this.i = this.i + 1;
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"DeckModule":"DeckModule","UserTypeEnum":"UserTypeEnum"}],"HandModule":[function(require,module,exports){
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
        playerName: null,
        gold: null,
        profileID: null
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
},{"CardModule":"CardModule","HandModule":"HandModule"}],"PointEnum":[function(require,module,exports){
cc._RFpush(module, 'b76bfSE5KxP/odm5c+mRE84', 'PointEnum');
// scripts/enums/PointEnum.js

// 卡牌号
"use strict";

var PointEnum = cc.Enum({
    A: 1, // ACE
    2: 2, // 2
    3: 3, // 3
    4: 4, // 4
    5: 5, // 5
    6: 6, // 6
    7: 7, // 7
    8: 8, // 8
    9: 9, // 9
    10: 10, // 10
    J: 11, // Jack (侍从)
    Q: 12, // Queen (皇后)
    K: 13 });

// King (国王)
module.exports = PointEnum;

cc._RFpop();
},{}],"SuitEnum":[function(require,module,exports){
cc._RFpush(module, '81a8a30gr9Fc58LNhL/hQW3', 'SuitEnum');
// scripts/enums/SuitEnum.js

// 花色
"use strict";

var SuitEnum = cc.Enum({
    Spade: 1, // 黑桃
    Heart: 2, // 红桃
    Club: 3, // 梅花
    Diamond: 4 });

// 方块
module.exports = SuitEnum;

cc._RFpop();
},{}],"UserPrefab":[function(require,module,exports){
cc._RFpush(module, '8a19cutXlFCPbZNjFnMh/XS', 'UserPrefab');
// scripts/prefabs/UserPrefab.js

'use strict';

var UserTypeEnum = require('UserTypeEnum');

cc.Class({
    'extends': cc.Component,

    properties: {
        nickname: {
            'default': null,
            type: cc.Label
        },
        profile: {
            'default': null,
            type: cc.Sprite
        },
        chips: {
            'default': null,
            type: cc.Label
        },
        status: {
            'default': null,
            type: cc.Label
        },
        userType: UserTypeEnum.Normal
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
},{"UserTypeEnum":"UserTypeEnum"}],"UserTypeEnum":[function(require,module,exports){
cc._RFpush(module, 'd4f64GMA6VDG7fpAGTkDo3/', 'UserTypeEnum');
// scripts/enums/UserTypeEnum.js

// 用户类型
"use strict";

var UserTypeEnum = cc.Enum({
    Normal: -1, // 普通
    Dealer: -1, // 庄家
    SmallBlind: -1, // 小盲注
    BigBlind: -1 });

// 大盲注
module.exports = UserTypeEnum;

cc._RFpop();
},{}]},{},["CardModule","Hand","BettingRoundEnum","CardPrefab","SuitEnum","UserPrefab","PointEnum","UserTypeEnum","DeckModule","Game","Player","HandModule"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL0FwcGxpY2F0aW9ucy9Db2Nvc0NyZWF0b3IuYXBwL0NvbnRlbnRzL1Jlc291cmNlcy9hcHAuYXNhci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiYXNzZXRzL3NjcmlwdHMvZW51bXMvQmV0dGluZ1JvdW5kRW51bS5qcyIsImFzc2V0cy9zY3JpcHRzL21vZHVsZXMvQ2FyZE1vZHVsZS5qcyIsImFzc2V0cy9zY3JpcHRzL3ByZWZhYnMvQ2FyZFByZWZhYi5qcyIsImFzc2V0cy9zY3JpcHRzL21vZHVsZXMvRGVja01vZHVsZS5qcyIsImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiLCJhc3NldHMvc2NyaXB0cy9tb2R1bGVzL0hhbmRNb2R1bGUuanMiLCJhc3NldHMvc2NyaXB0cy9IYW5kLmpzIiwiYXNzZXRzL3NjcmlwdHMvUGxheWVyLmpzIiwiYXNzZXRzL3NjcmlwdHMvZW51bXMvUG9pbnRFbnVtLmpzIiwiYXNzZXRzL3NjcmlwdHMvZW51bXMvU3VpdEVudW0uanMiLCJhc3NldHMvc2NyaXB0cy9wcmVmYWJzL1VzZXJQcmVmYWIuanMiLCJhc3NldHMvc2NyaXB0cy9lbnVtcy9Vc2VyVHlwZUVudW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzI1M2Myb1JGbzFLNHJOZjVFZEJXaXg2JywgJ0JldHRpbmdSb3VuZEVudW0nKTtcbi8vIHNjcmlwdHMvZW51bXMvQmV0dGluZ1JvdW5kRW51bS5qc1xuXG4vLyDkuIvms6jova5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgQmV0dGluZ1JvdW5kRW51bSA9IGNjLkVudW0oe1xuICAgIFByZUZsb3A6IDEsIC8vIFwicHJlLWZsb3BcIiBiZXR0aW5nIHJvdW5kXG4gICAgRmxvcDogMiwgLy8gXCJmbG9wXCIgYmV0dGluZyByb3VuZFxuICAgIFRoaXJkOiAzLCAvLyBhIHRoaXJkIGJldHRpbmcgcm91bmRcbiAgICBGb3VydGg6IDQgfSk7XG5cbi8vIGEgZm91cnRoIGJldHRpbmcgcm91bmRcbm1vZHVsZS5leHBvcnRzID0gQmV0dGluZ1JvdW5kRW51bTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICcxMjhhOWQ1RS9sS3o2MG1Yd2gydWRYTCcsICdDYXJkTW9kdWxlJyk7XG4vLyBzY3JpcHRzL21vZHVsZXMvQ2FyZE1vZHVsZS5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTdWl0RW51bSA9IHJlcXVpcmUoJ1N1aXRFbnVtJyk7XG52YXIgUG9pbnRFbnVtID0gcmVxdWlyZSgnUG9pbnRFbnVtJyk7XG5cbi8qKlxuICog5Y2h54mM5a+56LGh77yM6KGo56S65Y2h54mM55qE5Z+65pys5bGe5oCn77yM5LiN5YyF5ZCr5ri45oiP6YC76L6R77yMXG4gKiDmiYDmnInlsZ7mgKflj6ror7vvvIzlhajlsYDpnIDopoHmnIk1MuS4quWunuS+i++8iOWOu+aOieWkp+Wwj+eOi++8ieOAglxuICogQGNsYXNzIENhcmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdWl0XG4gKiBAcGFyYW0ge051bWJlcn0gcG9pbnRcbiAqL1xuZnVuY3Rpb24gQ2FyZE1vZHVsZShzdWl0LCBwb2ludCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICAgc3VpdDoge1xuICAgICAgICAgICAgdmFsdWU6IHN1aXQsXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgcG9pbnQ6IHtcbiAgICAgICAgICAgIHZhbHVlOiBwb2ludCxcbiAgICAgICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgICB9LFxuICAgICAgICBpZDoge1xuICAgICAgICAgICAgdmFsdWU6IChzdWl0IC0gMSkgKiAxMyArIChwb2ludCAtIDEpLFxuICAgICAgICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIHN1aXROYW1lOiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gU3VpdEVudW1bc3VpdF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHBvaW50TmFtZToge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBvaW50RW51bVtwb2ludF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzQmxhY2tTdWl0OiB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VpdCA9PSBTdWl0RW51bS5TcGFkZSB8fCBzdWl0ID09IFN1aXRFbnVtLkNsdWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGlzUmVkU3VpdDoge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1aXQgPT0gU3VpdEVudW0uSGVhcnQgfHwgc3VpdCA9PSBTdWl0RW51bS5EaWFtb25kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbkNhcmRNb2R1bGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBQb2ludEVudW1bdGhpcy5wb2ludF0gKyAnWycgKyBTdWl0RW51bVt0aGlzLnN1aXRdICsgJ10nO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYXJkTW9kdWxlO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzdkYWJhdVRGT0ZITnJEeDR1bG51alphJywgJ0NhcmRQcmVmYWInKTtcbi8vIHNjcmlwdHMvcHJlZmFicy9DYXJkUHJlZmFiLmpzXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFN1aXRFbnVtID0gcmVxdWlyZSgnU3VpdEVudW0nKTtcbnZhciBQb2ludEVudW0gPSByZXF1aXJlKCdQb2ludEVudW0nKTtcbnZhciBDYXJkTW9kdWxlID0gcmVxdWlyZSgnQ2FyZE1vZHVsZScpO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIOiKseiJslxuICAgICAgICBzdWl0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcbiAgICAgICAgLy8g54K55pWwXG4gICAgICAgIHBvaW50OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICAvLyDmraPpnaLlm77moYhcbiAgICAgICAgY29udGVudHM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICAvLyDmraPpnaLog4zmma9cbiAgICAgICAgZnJvbnRCRzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5Y+N6Z2i6IOM5pmvXG4gICAgICAgIGJhY2tCRzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgLy8g6Iqx6Imy6LWE5rqQXG4gICAgICAgIHN1aXRzOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5Zu+5qGI6LWE5rqQXG4gICAgICAgIGZhY2VzOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAgICAgdHlwZTogY2MuU3ByaXRlRnJhbWVcbiAgICAgICAgfSxcbiAgICAgICAgLy8g5Zu+5qGI6Iqx6Imy6LWE5rqQXG4gICAgICAgIC8vIFRPRE8g55uu5YmN5Y+q5piv5LiA5Liq5aSn55qE6Iqx6Imy5Zu+5qGI77yM5LmL5ZCO6ZyA6KaB5Y+Y5oiQ55yf5q2j55qE6Iqx6Imy5Zu+5qGI44CCXG4gICAgICAgIGNvbnRlbnRzU3VpdHM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogW10sXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZVxuICAgICAgICB9LFxuICAgICAgICByZWRDb2xvcjogY2MuQ29sb3IuUkVELFxuICAgICAgICBibGFja0NvbG9yOiBjYy5Db2xvci5CTEFDS1xuICAgIH0sXG5cbiAgICAvLyBmb286IHtcbiAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgIC8vIH0sXG4gICAgLy8gLi4uXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoY2FyZCkge1xuICAgICAgICAvLyBzdWl0XG4gICAgICAgIHRoaXMuc3VpdC5zcHJpdGVGcmFtZSA9IHRoaXMuc3VpdHNbY2FyZC5zdWl0IC0gMV07XG4gICAgICAgIC8vIHBvaW50XG4gICAgICAgIHRoaXMucG9pbnQuc3RyaW5nID0gUG9pbnRFbnVtW2NhcmQucG9pbnRdO1xuICAgICAgICBpZiAoY2FyZC5pc1JlZFN1aXQpIHtcbiAgICAgICAgICAgIC8vdGhpcy5wb2ludC5ub2RlLmNvbG9yID0gdGhpcy5yZWRDb2xvcjtcbiAgICAgICAgfSBlbHNlIGlmIChjYXJkLmlzQmxhY2tTdWl0KSB7fVxuICAgICAgICAgICAgLy90aGlzLnBvaW50Lm5vZGUuY29sb3IgPSB0aGlzLmJsYWNrQ29sb3I7XG5cbiAgICAgICAgICAgIC8vIGNvbnRlbnRzXG4gICAgICAgIGlmIChjYXJkLnBvaW50ID4gMTApIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudHMuc3ByaXRlRnJhbWUgPSB0aGlzLmZhY2VzW2NhcmQucG9pbnQgLSAxMCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50cy5zcHJpdGVGcmFtZSA9IHRoaXMuY29udGVudHNTdWl0c1tjYXJkLnN1aXQgLSAxXTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDnv7vniYxcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IC0gZmFjZVVQOiB0cnVlLCBmYWNlRG93bjogZmFsc2VcbiAgICAgKi9cbiAgICByZXZlYWw6IGZ1bmN0aW9uIHJldmVhbChpc0ZhY2VVcCkge1xuICAgICAgICB0aGlzLnN1aXQubm9kZS5hY3RpdmUgPSBpc0ZhY2VVcDtcbiAgICAgICAgdGhpcy5wb2ludC5ub2RlLmFjdGl2ZSA9IGlzRmFjZVVwO1xuICAgICAgICB0aGlzLmNvbnRlbnRzLm5vZGUuYWN0aXZlID0gaXNGYWNlVXA7XG4gICAgICAgIHRoaXMuY29udGVudHMuc3ByaXRlRnJhbWUgPSBpc0ZhY2VVcCA/IHRoaXMuZnJvbnRCRyA6IHRoaXMuYmFja0JHO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnZGY5NjNHcTNZTkR3b0M2SEpVaTQ0dnYnLCAnRGVja01vZHVsZScpO1xuLy8gc2NyaXB0cy9tb2R1bGVzL0RlY2tNb2R1bGUuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FyZE1vZHVsZSA9IHJlcXVpcmUoJ0NhcmRNb2R1bGUnKTtcblxuLyoqXG4gKiDljaHniYznrqHnkIbnsbvvvIznlKjmnaXnrqHnkIbkuIDlia/miJblpJrlia/niYzjgIJcbiAqIEBjbGFzcyBEZWNrXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXJPZkRlY2sgLSDmgLvlhbHlh6Dlia/niYxcbiAqL1xuZnVuY3Rpb24gRGVja01vZHVsZShudW1iZXJPZkRlY2spIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICAgIF9udW1iZXJPZkRlY2s6IHtcbiAgICAgICAgICAgIHZhbHVlOiBudW1iZXJPZkRlY2ssXG4gICAgICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgX2NhcmRzOiB7XG4gICAgICAgICAgICB2YWx1ZTogW10sXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gbnVtYmVyT2ZEZWNrOyBpKyspIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxufVxuXG5EZWNrTW9kdWxlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIHMgPSAxOyBzIDw9IDQ7IHMrKykge1xuICAgICAgICBmb3IgKHZhciBwID0gMTsgcCA8PSAxMzsgcCsrKSB7XG4gICAgICAgICAgICB2YXIgY2FyZCA9IG5ldyBDYXJkTW9kdWxlKHMsIHApO1xuICAgICAgICAgICAgY2MubG9nKCdpbml0IGNhcmQge30uJywgY2FyZCk7XG4gICAgICAgICAgICB0aGlzLl9jYXJkcy5wdXNoKGNhcmQpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4qIOWPkeS4gOW8oOeJjFxuKiBAbWV0aG9kIGRlYWxcbiogQHJldHVybiB7Q2FyZH1cbiovXG5EZWNrTW9kdWxlLnByb3RvdHlwZS5kZWFsID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLl9jYXJkcy5wb3AoKTtcbn07XG5cbi8qKlxuKiDmtJfniYxcbiogQG1ldGhvZCBzaHVmZmxlXG4qL1xuRGVja01vZHVsZS5wcm90b3R5cGUuc2h1ZmZsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzaHVmZmxlQXJyYXkodGhpcy5fY2FyZHMpO1xufTtcblxuLyoqXG4qIFJhbmRvbWl6ZSBhcnJheSBlbGVtZW50IG9yZGVyIGluLXBsYWNlLlxuKiBVc2luZyBEdXJzdGVuZmVsZCBzaHVmZmxlIGFsZ29yaXRobS5cbiogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTI2NDY4NjRcbiovXG5mdW5jdGlvbiBzaHVmZmxlQXJyYXkoYXJyYXkpIHtcbiAgICBmb3IgKHZhciBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICB2YXIgaiA9IE1hdGgucmFuZG9tKCkgKiAoaSArIDEpIHwgMDtcbiAgICAgICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcbiAgICAgICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICAgICAgYXJyYXlbal0gPSB0ZW1wO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGVja01vZHVsZTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICdlM2RiZnlxd1B4Tmw0a21vS1FGaDA2bScsICdHYW1lJyk7XG4vLyBzY3JpcHRzL0dhbWUuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRGVja01vZHVsZSA9IHJlcXVpcmUoJ0RlY2tNb2R1bGUnKTtcbnZhciBVc2VyVHlwZUVudW0gPSByZXF1aXJlKCdVc2VyVHlwZUVudW0nKTtcblxudmFyIEdhbWUgPSBjYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGk6IDAsXG4gICAgICAgIC8vIOW6leaxoFxuICAgICAgICBwb3Q6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICB1c2VyUHJlZmFiOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgdGVzdE5vZGU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgZ2FtZUJHOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcbiAgICAgICAgdXNlcnM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogW10sXG4gICAgICAgICAgICB0eXBlOiBbY2MuTm9kZV1cbiAgICAgICAgfSxcbiAgICAgICAgdG90YWxDaGlwczogMCxcbiAgICAgICAgbnVtYmVyT2ZEZWNrOiAxLFxuICAgICAgICBiZXR0aW5nUm91bmQ6IDBcbiAgICB9LFxuXG4gICAgLy8gZm9vOiB7XG4gICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAvLyB9LFxuICAgIC8vIC4uLlxuICAgIGluaXREZWFsZXI6IGZ1bmN0aW9uIGluaXREZWFsZXIoVXNlclByZWZhYikge1xuICAgICAgICBVc2VyUHJlZmFiLnNldFVzZXJUeXBlKFVzZXJUeXBlRW51bS5EZWFsZXIpO1xuICAgIH0sXG5cbiAgICBpbml0U21hbGxCbGluZDogZnVuY3Rpb24gaW5pdFNtYWxsQmxpbmQoKSB7XG4gICAgICAgIFVzZXJQcmVmYWIuc2V0VXNlclR5cGUoVXNlclR5cGVFbnVtLlNtYWxsQmxpbmQpO1xuICAgIH0sXG5cbiAgICBpbml0QmlnQmxpbmQ6IGZ1bmN0aW9uIGluaXRCaWdCbGluZCgpIHtcbiAgICAgICAgVXNlclByZWZhYi5zZXRVc2VyVHlwZShVc2VyVHlwZUVudW0uQmlnQmxpbmQpO1xuICAgIH0sXG5cbiAgICBjcmVhdGVVc2VyczogZnVuY3Rpb24gY3JlYXRlVXNlcnMoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdXNlclByZWZhYiA9IGNjLmluc3RhbnRpYXRlKHRoaXMudXNlclByZWZhYik7XG4gICAgICAgICAgICB2YXIgdXNlck5vZGUgPSB0aGlzLnVzZXJzW2ldO1xuICAgICAgICAgICAgdXNlclByZWZhYi5wYXJlbnQgPSB1c2VyTm9kZTtcbiAgICAgICAgICAgIHVzZXJQcmVmYWIuc2V0UG9zaXRpb24gPSBjYy5wKDAsIDApO1xuICAgICAgICAgICAgdmFyIFVzZXJQcmVmYWIgPSB1c2VyUHJlZmFiLmdldENvbXBvbmVudCgnVXNlclByZWZhYicpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUNhcmRzOiBmdW5jdGlvbiBjcmVhdGVDYXJkcygpIHtcbiAgICAgICAgdmFyIGNhcmQgPSB0aGlzLmRlY2suZGVhbCgpO1xuICAgIH0sXG5cbiAgICAvLyDnrKzkuIDova7kuIvms6hcbiAgICBwcmVmbG9wQmV0dGluZ1JvdW5kOiBmdW5jdGlvbiBwcmVmbG9wQmV0dGluZ1JvdW5kKCkge30sXG5cbiAgICAvLyDnrKzkuozova7kuIvms6hcbiAgICBmbG9wQmV0dGluZ1JvdW5kOiBmdW5jdGlvbiBmbG9wQmV0dGluZ1JvdW5kKCkge30sXG5cbiAgICAvLyDnrKzkuInova7kuIvms6hcbiAgICB0aGlyZEJldHRpbmdSb3VuZDogZnVuY3Rpb24gdGhpcmRCZXR0aW5nUm91bmQoKSB7fSxcblxuICAgIC8vIOesrOWbm+i9ruS4i+azqFxuICAgIGZvdXJ0aEJldHRpbmdSb3VuZDogZnVuY3Rpb24gZm91cnRoQmV0dGluZ1JvdW5kKCkge30sXG5cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIHRoaXMuZGVjayA9IG5ldyBEZWNrTW9kdWxlKHRoaXMubnVtYmVyT2ZEZWNrKTtcbiAgICAgICAgdGhpcy5kZWNrLnNodWZmbGUoKTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIEdhbWUuaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICAvLyDliJ3lp4vljJbkuIDlia/niYxcbiAgICAgICAgdGhpcy5kZWNrID0gbmV3IERlY2tNb2R1bGUodGhpcy5udW1iZXJPZkRlY2spO1xuICAgICAgICB0aGlzLmRlY2suc2h1ZmZsZSgpO1xuICAgIH0sXG5cbiAgICBhZGRTdGFrZTogZnVuY3Rpb24gYWRkU3Rha2UoKSB7fSxcblxuICAgIC8vIOa0l+eJjFxuICAgIHNodWZmbGU6IGZ1bmN0aW9uIHNodWZmbGUoKSB7XG4gICAgICAgIHRoaXMuZGVjay5zaHVmZmxlKCk7XG4gICAgfSxcblxuICAgIC8vIOWPkeeJjFxuICAgIGRlYWw6IGZ1bmN0aW9uIGRlYWwoKSB7XG4gICAgICAgIHZhciBjYXJkID0gdGhpcy5kZWNrLmRlYWwoKTtcbiAgICB9LFxuXG4gICAgYmFja1RvTWVudTogZnVuY3Rpb24gYmFja1RvTWVudSgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdtZW51Jyk7XG4gICAgfSxcblxuICAgIHRlc3Q6IGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICAgIHZhciBjYXJkID0gdGhpcy5kZWNrLmRlYWwoKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5pKTtcbiAgICAgICAgdmFyIGNhcmRQcmVmYWIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpO1xuICAgICAgICBjYXJkUHJlZmFiLnBhcmVudCA9IHRoaXMudGVzdE5vZGU7XG4gICAgICAgIHZhciBwb3MgPSBjYy5wKC0zMDAgKyB0aGlzLmkgKiA1MCwgLTMwMCArIHRoaXMuaSAqIDUwKTtcbiAgICAgICAgY2FyZFByZWZhYi5zZXRQb3NpdGlvbihwb3MpO1xuICAgICAgICB2YXIgY2FyZENvbXBvbmVudCA9IGNhcmRQcmVmYWIuZ2V0Q29tcG9uZW50KCdDYXJkUHJlZmFiJyk7XG4gICAgICAgIGNhcmRDb21wb25lbnQucmVuZGVyKGNhcmQpO1xuICAgICAgICB0aGlzLmkgPSB0aGlzLmkgKyAxO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICdmMjk1ZEF4a2QxQVRvN0ZOR1M2THdKYycsICdIYW5kTW9kdWxlJyk7XG4vLyBzY3JpcHRzL21vZHVsZXMvSGFuZE1vZHVsZS5qc1xuXG4vLyDniYzlnovvvIzlgLzotorlpKfotorljonlrrNcblwidXNlIHN0cmljdFwiO1xuXG52YXIgSGFuZFR5cGUgPSBjYy5FbnVtKHtcbiAgICBIaWdoQ2FyZDogLTEsIC8vIOmrmOeJjFxuICAgIE9uZVBhaXI6IC0xLCAvLyDkuIDlr7lcbiAgICBUb3dQYWlyOiAtMSwgLy8g5Lik5a+5XG4gICAgVHJpcHM6IC0xLCAvLyDkuInmnaFcbiAgICBTdHJhaWdodDogLTEsIC8vIOmhuuWtkFxuICAgIEZsdXNoOiAtMSwgLy8g5ZCM6IqxXG4gICAgRnVsbEhvdXNlOiAtMSwgLy8g6JGr6IqmXG4gICAgUXVhZHM6IC0xLCAvLyDlm5vmop1cbiAgICBTdHJhaWdodEZsdXNoOiAtMSwgLy8g5ZCM6Iqx6aG6XG4gICAgUm95YWxGbHVzaDogLTEgfSk7XG5cbi8vIOeah+WutuWQjOiKsemhulxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgSGFuZFR5cGU6IEhhbmRUeXBlXG59O1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzE3YjAwNGY0WlpBUjU3Vmk0cnEwa0tkJywgJ0hhbmQnKTtcbi8vIHNjcmlwdHMvSGFuZC5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDYXJkTW9kdWxlID0gcmVxdWlyZSgnQ2FyZE1vZHVsZScpO1xudmFyIEhhbmRNb2R1bGUgPSByZXF1aXJlKCdIYW5kTW9kdWxlJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcGxheWVyUHJlZmFiOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfVxuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2U5OTEyOGUzUnhEMUxSNGQxcGM3SHFqJywgJ1BsYXllcicpO1xuLy8gc2NyaXB0cy9QbGF5ZXIuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FyZE1vZHVsZSA9IHJlcXVpcmUoJ0NhcmRNb2R1bGUnKTtcbnZhciBIYW5kTW9kdWxlID0gcmVxdWlyZSgnSGFuZE1vZHVsZScpO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGlkOiAnJyxcbiAgICAgICAgcGxheWVyTmFtZTogbnVsbCxcbiAgICAgICAgZ29sZDogbnVsbCxcbiAgICAgICAgcHJvZmlsZUlEOiBudWxsXG4gICAgfSxcblxuICAgIC8vIGZvbzoge1xuICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgLy8gfSxcbiAgICAvLyAuLi5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnYjc2YmZTRTVLeFAvb2RtNWMrbVJFODQnLCAnUG9pbnRFbnVtJyk7XG4vLyBzY3JpcHRzL2VudW1zL1BvaW50RW51bS5qc1xuXG4vLyDljaHniYzlj7dcblwidXNlIHN0cmljdFwiO1xuXG52YXIgUG9pbnRFbnVtID0gY2MuRW51bSh7XG4gICAgQTogMSwgLy8gQUNFXG4gICAgMjogMiwgLy8gMlxuICAgIDM6IDMsIC8vIDNcbiAgICA0OiA0LCAvLyA0XG4gICAgNTogNSwgLy8gNVxuICAgIDY6IDYsIC8vIDZcbiAgICA3OiA3LCAvLyA3XG4gICAgODogOCwgLy8gOFxuICAgIDk6IDksIC8vIDlcbiAgICAxMDogMTAsIC8vIDEwXG4gICAgSjogMTEsIC8vIEphY2sgKOS+jeS7jilcbiAgICBROiAxMiwgLy8gUXVlZW4gKOeah+WQjilcbiAgICBLOiAxMyB9KTtcblxuLy8gS2luZyAo5Zu9546LKVxubW9kdWxlLmV4cG9ydHMgPSBQb2ludEVudW07XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnODFhOGEzMGdyOUZjNThMTmhML2hRVzMnLCAnU3VpdEVudW0nKTtcbi8vIHNjcmlwdHMvZW51bXMvU3VpdEVudW0uanNcblxuLy8g6Iqx6ImyXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFN1aXRFbnVtID0gY2MuRW51bSh7XG4gICAgU3BhZGU6IDEsIC8vIOm7keahg1xuICAgIEhlYXJ0OiAyLCAvLyDnuqLmoYNcbiAgICBDbHViOiAzLCAvLyDmooXoirFcbiAgICBEaWFtb25kOiA0IH0pO1xuXG4vLyDmlrnlnZdcbm1vZHVsZS5leHBvcnRzID0gU3VpdEVudW07XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnOGExOWN1dFhsRkNQYlpOakZuTWgvWFMnLCAnVXNlclByZWZhYicpO1xuLy8gc2NyaXB0cy9wcmVmYWJzL1VzZXJQcmVmYWIuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVXNlclR5cGVFbnVtID0gcmVxdWlyZSgnVXNlclR5cGVFbnVtJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbmlja25hbWU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICBjaGlwczoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgc3RhdHVzOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICB1c2VyVHlwZTogVXNlclR5cGVFbnVtLk5vcm1hbFxuICAgIH0sXG5cbiAgICAvLyBmb286IHtcbiAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgIC8vIH0sXG4gICAgLy8gLi4uXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2Q0ZjY0R01BNlZERzdmcEFHVGtEbzMvJywgJ1VzZXJUeXBlRW51bScpO1xuLy8gc2NyaXB0cy9lbnVtcy9Vc2VyVHlwZUVudW0uanNcblxuLy8g55So5oi357G75Z6LXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFVzZXJUeXBlRW51bSA9IGNjLkVudW0oe1xuICAgIE5vcm1hbDogLTEsIC8vIOaZrumAmlxuICAgIERlYWxlcjogLTEsIC8vIOW6hOWutlxuICAgIFNtYWxsQmxpbmQ6IC0xLCAvLyDlsI/nm7Lms6hcbiAgICBCaWdCbGluZDogLTEgfSk7XG5cbi8vIOWkp+ebsuazqFxubW9kdWxlLmV4cG9ydHMgPSBVc2VyVHlwZUVudW07XG5cbmNjLl9SRnBvcCgpOyJdfQ==
