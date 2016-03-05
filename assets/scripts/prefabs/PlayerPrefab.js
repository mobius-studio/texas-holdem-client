var PlayerType = require('PlayerType');

cc.Class({
    extends: cc.Component,

    properties: {
        playerBG: {
            default: null,
            type: cc.Sprite
        },
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
        type: {
            default: null,
            type: cc.Label
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
        this.Type = this.type.node.getComponent(cc.Label);
        this.Type.string = '';
        switch (player.playerType) {
            case PlayerType.Dealer:
                this.Type.string = '庄家';
                break;
            case PlayerType.SmallBlind:
                this.Type.string = '小盲注';
                break;
            case PlayerType.BigBlind:
                this.Type.string = '大盲注';
                break;
        }
        this.node.active = true;
        if (!player.active) {
            this.Type.string = '观战中';
        }
    },

    // 销毁玩家
    hide: function() {
        this.node.active = false;
    },

    // use this for initialization
    onLoad: function () {

    },
});
