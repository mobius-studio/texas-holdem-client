cc.Class({
    extends: cc.Component,

    properties: {
        playerPrefab: {
            default: null,
            type: cc.Prefab
        },
        anthors: {
            default: [],
            type: [cc.Node]
        },
    },

    // 初始化玩家画面
    init: function(players) {
        for (var i in players) {
            this.player = cc.instantiate(this.playerPrefab);
			this.player.parent = this.anthors[i];
            this.Player = this.player.getComponent('PlayerPrefab');
            this.Player.init(players[i]);
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
