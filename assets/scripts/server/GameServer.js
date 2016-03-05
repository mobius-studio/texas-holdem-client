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

});

module.exports = GameServer;
