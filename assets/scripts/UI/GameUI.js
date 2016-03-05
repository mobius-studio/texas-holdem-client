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
        potUI: {
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
        this.ControlUI.init(this);
        // 底池画面
        this.PotUI = this.potUI.getComponent('PotUI');
        this.PotUI.init();
    },

    // 初始化游戏服务器
    initGameServer: function() {
        // 构造游戏服务器
        this.gameServer = new GameServer();
        // 初始化配置信息
        this.configs = this.gameServer.getConfigs();
        this.smallBlind = this.configs.smallBlind;
        this.bigBlind = this.configs.bigBlind;
    },

    // 初始化玩家
    initPlayer: function() {
        this.players = this.gameServer.getPlayers();
        for (var i in this.players) {
            this.PlayerUI.initPlayer(this.players[i]);
        }
    },

    // 初始化底池
    initPot: function() {
        this.PotUI.updateChips(this.gameServer.potChips);
    },

    // 初始化游戏规则
    initRule: function() {
        // TODO 根据玩家人数，确定游戏规则。
    },

    // 更新游戏状态
    updateStatus: function() {
        // 初始化玩家（通过Server取得）
        this.initPlayer();
        // 初始化底池
        this.initPot();
        // 初始化游戏规则
        this.initRule();
    },

    // use this for initialization
    onLoad: function () {
        // 初始化游戏服务器
        this.initGameServer();
        // 游戏画面初始化
        this.init();
        // 更新游戏状态
        this.updateStatus();
        // =============== 游戏开始 ===============
        // 每个玩家发两张底牌
        this.dealHoldCard();
        this.dealHoldCard();
        // 翻牌前轮
        this.preflopRound();
    },

    // =============== 模拟游戏开始 ===============
    // 每个玩家发两张底牌
    dealHoldCard: function() {
        for (var i in this.players) {
            var player = this.players[i];
            if (player.active) {
                this.PlayerUI.receiveHoldCard(player, this.gameServer.dealHoldCard());
            }
        }
    },

    // 翻牌前轮
    preflopRound: function() {
        // 下小盲注
        this.gameServer.bet(1, this.smallBlind);
        this.updateStatus();
        // 下大盲注
        this.gameServer.bet(2, this.bigBlind);
        this.updateStatus();
        // 设置当前激活玩家是第4个
        this.i = 4;
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
