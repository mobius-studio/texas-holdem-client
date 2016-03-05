var PlayerType = require('PlayerType');
var Deck = require('Deck');
var Player = require('Player');
var Players = require('Players');

cc.Class({
    extends: cc.Component,

    properties: {
        smallBlind: 5,
        bigBlind: 10,
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
        // 玩家画面
        this.PlayerUI = this.playerUI.getComponent('PlayerUI');
        this.PlayerUI.init();
        // 控制按钮
        this.ControlUI = this.controlUI.getComponent('ControlUI');
        this.ControlUI.init();
    },

    // 初始化玩家
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
        // 设置庄家，大小盲注
        this._players[0].playerType = PlayerType.Dealer;
        this._players[1].playerType = PlayerType.SmallBlind;
        this._players[2].playerType = PlayerType.BigBlind;
    },

    // 初始化游戏规则
    initRule: function() {
        // TODO 根据玩家人数，确定游戏规则。
    },

    // 初始化一副牌
    initDeck: function() {
        this.deck = new Deck();
        // 洗牌
        this.deck.shuffle();
    },

    // 第个玩家发两张底牌
    dealHoldCard: function() {
        for (var i in this._players) {
            var card = this.deck.deal();
            if (card) {
                this.PlayerUI.receiveHoldCard(this._players[i], card);
            }
        }
    },

    // 下小盲注
    betSmallBind: function() {
        this.PlayerUI.bet(this._players[1], this.smallBlind);
    },

    betBigBlind: function() {
        this.PlayerUI.bet(this._players[2], this.bigBlind);
    },

    // use this for initialization
    onLoad: function () {
        // 游戏画面初始化
        this.init();
        // 初始化玩家
        this.initPlayer();
        // 初始化游戏规则
        this.initRule();
        // 初始化扑克
        this.initDeck();
        // 每个玩家发两张底牌
        this.dealHoldCard();
        this.dealHoldCard();
        // 自动大小盲注（系统假定第一个玩家是庄家，接着是小盲注，大盲注）
        this.betSmallBind();
        this.betBigBlind();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
