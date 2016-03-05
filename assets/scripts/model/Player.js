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
        playerChips: 0,
        // 玩家头像号
        playerProfileID: 0,
        // 玩家类型
        playerType: null,
        // 玩家状态
        playerStatus: null,
        // 玩家位置
        playerPosition: null,
        // 玩家手牌
        playerCards: {
            default: [],
            type: [cc.Class]
        },
    },

    // 字符串函数
    toString: function() {
        var array = [];
        array.push(this.playerID);
        array.push(this.playerName);
        array.push(this.playerChips);
        array.push(this.playerProfileID);
        array.push(this.playerType);
        array.push(this.playerStatus);
        return array.join('_');
    }
});

module.exports = Player;
