var Suit = require('Suit');
var Point = require('Point');

/**
 * 卡牌预制资源
 * @class
 */
cc.Class({
    extends: cc.Component,

    properties: {
        // 花色
        suit: {
            default: null,
            type: cc.Sprite
        },
        // 点数
        point: {
            default: null,
            type: cc.Label
        },
        // 正面图案
        contents: {
            default: null,
            type: cc.Sprite
        },
        // 正面背景
        frontBG: {
            default: null,
            type: cc.SpriteFrame
        },
        // 反面背景
        backBG: {
            default: null,
            type: cc.SpriteFrame
        },
        // 花色资源
        suits: {
            default: [],
            type: cc.SpriteFrame
        },
        // 图案资源
        faces: {
            default: [],
            type: cc.SpriteFrame
        },
        // 图案花色资源
        // TODO 目前只是一个大的花色图案，之后需要变成真正的花色图案。
        contentsSuits: {
            default: [],
            type: cc.SpriteFrame
        },
        redColor: cc.Color.RED,
        blackColor: cc.Color.BLACK,
    },

    // 初始化一个卡牌组件
    init: function(card) {
        // 设置卡牌的花色图片
        this.suit.spriteFrame = this.suits[card.suit];
        // 设置卡牌的点数文字
        this.point.string = Point[card.point];
        // 取得点数的Node组件
        var Node = this.point.node.getComponent(cc.Node);
        if (card.isRedSuit) {
            Node.color = this.redColor;;
        } else if(card.isBlackSuit) {
            Node.color = this.blackColor;;
        }
        // 设置正面图案
        if (card.point > 10) {
            // 设置J，Q，K的正面图案
            this.contents.spriteFrame = this.faces[card.point - 10 - 1];
        } else {
            // 设置A~10的正面图案
            this.contents.spriteFrame = this.contentsSuits[card.suit];
        }
    },

    /**
     * 翻牌
     * @param {boolean} - faceUp: true, faceDown: false
     */
    reveal: function(isFaceUp) {
        this.suit.node.active = isFaceUp;
        this.point.node.active = isFaceUp;
        this.contents.node.active = isFaceUp;
        var Sprite = this.node.getComponent(cc.Sprite);
        Sprite.spriteFrame = isFaceUp ? this.frontBG : this.backBG;
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
