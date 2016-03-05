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
        this.initPlayer();
        this.initDeck();
        this.controlUI.init();
    },

    // 初始化玩家画面
    initPlayer: function() {
        this._loadData();
        this.PlayerUI.init(this._players);
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
            this._players.push(player);
        }
    },

    // 初始化一副牌
    initDeck: function() {
        this.deck = new Deck();
        // 洗牌
        this.deck.shuffle();
    },

    // use this for initialization
    onLoad: function () {
        this.PlayerUI = this.playerUI.getComponent('PlayerUI');
        this.controlUI = this.controlUI.getComponent('ControlUI');
        this.init();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
