var PlayerType = require('PlayerType');

cc.Class({
    extends: cc.Component,

    properties: {
        nickname: {
            default: null,
            type: cc.Label
        },
        chips: {
            default: null,
            type: cc.Label
        },
        profile: {
            default: null,
            type: cc.Sprite
        },
        profiles: {
            default: [],
            type: [cc.SpriteFrame]
        },
    },

    // 初始化一个玩家组件
    init: function (player) {
        this.Nickname = this.nickname.node.getComponent(cc.Label);
        this.Nickname.string = player.playerName;
        this.Chips = this.chips.node.getComponent(cc.Label);
        this.Chips.string = '$' + player.chips;
        this.Profile = this.profile.node.getComponent(cc.Sprite);
        this.Profile.spriteFrame = this.profiles[player.profileID];
        this.node.active = true;
    },

    // 销毁玩家
    hide: function() {
        this.node.active = false;
    },

    // use this for initialization
    onLoad: function () {

    },
});
