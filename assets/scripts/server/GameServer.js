var Data = require('Data');
var Deck = require('Deck');

var GameServer = cc.Class({

    properties: {
    },

    // 构造函数
    ctor: function() {
        this.configs = Data.configs;
        this.players = Data.players;
        this.deck = new Deck();
        this.deck.shuffle();
        this.potChips = 0;
    },

    getConfigs: function() {
        return this.configs;
    },

    getPlayers: function() {
        return this.players;
    },

    // 发一张卡牌
    dealCard: function() {
        return this.deck.deal();
    },

    // 发一张卡牌
    dealHoldCard: function() {
        return this.deck.deal();
    },

    // 销牌
    burnCard: function() {
        this.deck.deal();
    },

    // 初始化新一轮的下注
    initBettingRound: function() {
        this.roundChips = 0;
        for (var i in this.players) {
            this.players[i].roundChips = 0;
        }
    },

    // 下注
    bet: function(i, chips) {
        if (this.players[i].chips >= chips) {
            // 减少玩家剩余筹码
            this.players[i].chips -= chips;
            // 更新玩家本局的下注筹码
            this.players[i].roundChips += chips;
            // 更新本局的下注筹码
            this.roundChips = this.players[i].roundChips > this.roundChips ? this.players[i].roundChips : this.players[i].roundChips;
            // 更新底池的下注筹码
            this.potChips += chips;
            return true;
        } else {
            alert('玩家筹码不足！');
            return false;
        }
    }

});

module.exports = GameServer;
