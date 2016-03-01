var Suit = require('Suit');
var Point = require('Point');
var CardModule = require('CardModule');

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
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    init: function(card) {
        // suit
        this.suit.spriteFrame = this.suits[card.suit];
        // point
        this.point.string = Point[card.point];
        if (card.isRedSuit) {
            //this.point.node.color = this.redColor;
        } else if(card.isBlackSuit) {
            //this.point.node.color = this.blackColor;
        }
        // contents
        if (card.point > 10) {
            this.contents.spriteFrame = this.faces[card.point - 10 - 1];
        } else {
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
