var UserType = require('UserType');
var Round = require('Round');
var DeckModule = require('DeckModule');

cc.Class({
    extends: cc.Component,

    properties: {
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        totalChips: 0,
        numberOfDeck: 1,
        bettingRound: 0,
        userUI: {
            default: null,
            type: cc.Node
        },
        controlUI: {
            default: null,
            type: cc.Node
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

    // 下注
    bettingRound: function(round) {
        switch (round) {
            case PreFlop:
                this.preflopBettingRound();
                break;
            case Flop:
                this.flopBettingRound();
                break;
            case Third:
                this.thirdBettingRound();
                break;
            case Fourth:
                this.fourthBettingRound();
                break;
            default:
        }
    },

    // use this for initialization
    onLoad: function () {
        this.UserUI = this.userUI.getComponent('UserUI');
        this.ControlUI = this.controlUI.getComponent('ControlUI');
    },

    start: function() {
        // 初始化控制按钮
        this.ControlUI.init();
        // 初始化用户
        this.UserUI.init();
        // 初始化一副牌
        this.deck = new DeckModule(this.numberOfDeck);
        // 洗牌
        this.deck.shuffle();
        // 第个玩家发两张手牌
        this.dealHoldCard();
    },

    dealHoldCard: function() {
        this.UserUI.deal(this.deck);
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

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
