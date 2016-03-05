var GameServer = require('GameServer');

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
        // 玩家画面
        this.PlayerUI = this.playerUI.getComponent('PlayerUI');
        this.PlayerUI.init();
        // 控制按钮
        this.ControlUI = this.controlUI.getComponent('ControlUI');
        this.ControlUI.init();
    },

    // 初始化游戏服务器
    initGameServer: function() {
        // 构造游戏服务器
        this.gameServer = new GameServer();
        // 初始化配置信息
        this.configs = this.gameServer.getConfigs();
        this.smallBlind = this.configs.smallBlind;
        this.bigBlind = this.configs.bigBlind;
        // 初始化玩家
        this.players = this.gameServer.getPlayers();
    },

    // 初始化玩家
    initPlayer: function() {
        for (var i in this.players) {
            this.PlayerUI.initPlayer(this.players[i]);
        }
    },

    // 初始化游戏规则
    initRule: function() {
        // TODO 根据玩家人数，确定游戏规则。
    },

    // 第个玩家发两张底牌
    dealHoldCard: function() {
        for (var i in this.players) {
            var player = this.players[i];
            if (player.active) {
                this.PlayerUI.receiveHoldCard(player, this.gameServer.dealCard());
            }
        }
    },

    // 下小盲注
    betSmallBind: function() {
        this.PlayerUI.bet(this.players[1], this.smallBlind);
    },

    betBigBlind: function() {
        this.PlayerUI.bet(this.players[2], this.bigBlind);
    },

    // use this for initialization
    onLoad: function () {
        // 游戏画面初始化
        this.init();
        // 初始化游戏服务器
        this.initGameServer();
        // 初始化玩家（通过Server取得）
        this.initPlayer();
        // 初始化游戏规则
        this.initRule();
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
