var PlayerType = require('PlayerType');
var PlayerStatus = require('PlayerStatus');

/**
 * 玩家类
 * @class
 */
var Player = cc.Class({
    properties: {
        // 玩家号
        playerID: null,
        // 玩家名称
        playerName: null,
        // 玩家筹码
        chips: 0,
        // 玩家头像号
        profileID: 0,
        // 玩家类型
        playerType: null,
        // 玩家状态
        playerStatus: null,
        // 玩家位置
        playerPosition: null,
        // 玩家是否有效（本局游戏开始后进入游戏的玩家无效，只能观看游戏，下局开始后参与进来）
        active: true,
        // 玩家手牌
        cards: {
            default: [],
            type: [cc.Class]
        },
    },

    // 字符串函数
    toString: function() {
        var array = [];
        array.push(this.playerID);
        array.push(this.playerName);
        array.push(this.chips);
        array.push(this.profileID);
        array.push(this.playerType);
        array.push(this.playerStatus);
        return array.join('_');
    }
});

module.exports = Player;
