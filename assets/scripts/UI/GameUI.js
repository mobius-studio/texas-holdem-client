var Deck = require('Deck');
var Player = require('Player');
var Players = require('Players');

cc.Class({
    extends: cc.Component,

    properties: {
        playerUI: {
            default: null,
            type: cc.Node
        },
        controlUI: {
            default: null,
            type: cc.Node
        },
    },

    // 初始化游戏画面
    init: function() {
        this.PlayerUI = this.playerUI.getComponent('PlayerUI');
        this.ControlUI = this.controlUI.getComponent('ControlUI');
        this.PlayerUI.init();
        this.ControlUI.init();
        this.initPlayer();
        this.initDeck();
    },

    // 初始化玩家画面
    initPlayer: function() {
        this._loadData();
        for (var i in this._players) {
            this.PlayerUI.initPlayer(this._players[i]);
        }
    },

    // 创建Sample玩家数据（将来数据会通过Socket从后台取得）
    _loadData: function() {
        this._players = [];
        for (var i in Players) {
            var player = new Player();
            player.playerID = Players[i].id;
            player.playerName = Players[i].name;
            player.playerChips = Players[i].chips;
            player.playerProfileID = Players[i].profile;
            player.playerPosition = Players[i].position;
            this._players.push(player);
        }
    },

    // 初始化一副牌
    initDeck: function() {
        this.deck = new Deck();
        // 洗牌
        this.deck.shuffle();
    },

    // 第个玩家发两张底牌
    dealHoldCards: function() {
        // 发第一张底牌
        for (var i in this._players) {
            this.PlayerUI.receiveHoldCard(this._players[i], this.deck.deal());
        }
        // 发第二张底牌
        for (var i in this._players) {
            this.PlayerUI.receiveHoldCard(this._players[i], this.deck.deal());
        }
    },

    // use this for initialization
    onLoad: function () {
        this.init();
        this.dealHoldCards();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
