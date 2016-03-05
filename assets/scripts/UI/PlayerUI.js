cc.Class({
    extends: cc.Component,

    properties: {
        playerPrefab: {
            default: null,
            type: cc.Prefab
        },
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        anthors: {
            default: [],
            type: [cc.Node]
        },
        _Players: {
            default: [],
            type: [cc.Node]
        },
    },

    // 初始化玩家画面
    init: function() {
        for (var i = 0; i < 9; i++) {
            var player = cc.instantiate(this.playerPrefab);
            player.parent = this.anthors[i];
            var Player = player.getComponent('PlayerPrefab');
            Player.hide();
            this._Players.push(Player);
        }
    },

    // 初始化玩家
    initPlayer: function(player) {
        var Player = this._Players[player.playerPosition];
        Player.init(player);
    },

    // 收底牌（每个玩家有两张底牌）
    receiveHoldCard: function(player, card) {
        // 添加卡牌到玩家的对象中
        if (player.cards.length < 2) {
            player.cards.push(card);
        }
        var cardPrefab = cc.instantiate(this.cardPrefab);
        cardPrefab.parent = this.anthors[player.playerPosition];
        var Card = cardPrefab.getComponent('CardPrefab');
        Card.init(card);
        if (player.playerPosition == 4) {
            // 庄家
            if (player.cards.length == 1) {
                this.action = cc.spawn(
                    cc.scaleTo(0, 0.7),
                    cc.rotateBy(0, -5),
                    cc.moveTo(0, cc.p(120, 60))
                );
            } else {
                this.action = cc.spawn(
                    cc.scaleTo(0, 0.7),
                    cc.rotateBy(0, 5),
                    cc.moveTo(0, cc.p(135, 56))
                );
            }
            Card.reveal(true);
        } else {
            if (player.cards.length == 1) {
                this.action = cc.spawn(
                    cc.scaleTo(0, 0.5),
                    cc.rotateBy(0, -5),
                    cc.moveTo(0, cc.p(120, 60))
                );
            } else {
                this.action = cc.spawn(
                    cc.scaleTo(0, 0.5),
                    cc.rotateBy(0, 5),
                    cc.moveTo(0, cc.p(135, 58))
                );
            }
            Card.reveal(false);
        }
        cardPrefab.runAction(this.action);
        // 设置第二个手牌的位置偏右一些
        if (player.cards.length == 1) {
            //cardPrefab.setPosition(cc.p(50, 80));
        } else if (player.cards.length == 2) {
            //cardPrefab.setPosition(cc.p(75, 80));
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
