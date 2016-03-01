var DeckModule = require('DeckModule');
var UserTypeEnum = require('UserTypeEnum');

var Game = cc.Class({
    extends: cc.Component,

    properties: {
        i: 0,
        // 底池
        pot: {
            default: null,
            type: cc.Label
        },
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        userPrefab: {
            default: null,
            type: cc.Prefab
        },
        testNode: {
            default: null,
            type: cc.Node
        },
        gameBG: {
            default: null,
            type: cc.Sprite
        },
        users: {
            default: [],
            type: [cc.Node]
        },
        totalChips: 0,
        numberOfDeck: 1,
        bettingRound: 0,
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

    initDealer: function(UserPrefab) {
        UserPrefab.setUserType(UserTypeEnum.Dealer);
    },

    initSmallBlind: function() {
        UserPrefab.setUserType(UserTypeEnum.SmallBlind);
    },

    initBigBlind: function() {
        UserPrefab.setUserType(UserTypeEnum.BigBlind);
    },

    createUsers: function() {
        for (var i = 0; i < 8; i++) {
            var userPrefab = cc.instantiate(this.userPrefab);
            var userNode = this.users[i];
            userPrefab.parent = userNode;
            userPrefab.setPosition = cc.p(0, 0);
            var UserPrefab = userPrefab.getComponent('UserPrefab');
        }
    },

    createCards: function() {
        var card = this.deck.deal();
    },

    // 第一轮下注
    preflopBettingRound: function() {
        
    },

    // 第二轮下注
    flopBettingRound: function() {
        
    },

    // 第三轮下注
    thirdBettingRound: function() {
        
    },

    // 第四轮下注
    fourthBettingRound: function() {
        
    },

    start: function() {
        this.deck = new DeckModule(this.numberOfDeck);
        this.deck.shuffle();
    },

    // use this for initialization
    onLoad: function () {
        Game.instance = this;
        // 初始化一副牌
        this.deck = new DeckModule(this.numberOfDeck);
        this.deck.shuffle();
    },

    addStake: function() {
        
    },

    // 洗牌
    shuffle: function() {
        this.deck.shuffle();
    },

    // 发牌
    deal: function() {
        var card = this.deck.deal();
        
    },

    backToMenu: function() {
        cc.director.loadScene('menu');
    },

    test: function() {
        var card = this.deck.deal();
        console.log(this.i);
        var cardPrefab = cc.instantiate(this.cardPrefab);
        cardPrefab.parent = this.testNode;
        var pos = cc.p(-300 + this.i * 50, -300 + this.i * 50);
        cardPrefab.setPosition(pos);
        var cardComponent = cardPrefab.getComponent('CardPrefab');
        cardComponent.render(card);
        this.i = this.i + 1;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
