var SuitEnum = require('SuitEnum');
var PointEnum = require('PointEnum');
var CardModule = require('CardModule');

cc.Class({
    extends: cc.Component,

    properties: {
        suit: {
            default: null,
            type: cc.Sprite
        },
        point: {
            default: null,
            type: cc.Label
        },
        contents: {
            default: null,
            type: cc.Sprite
        },
        front: {
            default: null,
            type: cc.SpriteFrame
        },
        back: {
            default: null,
            type: cc.SpriteFrame
        },
        suits: {
            default: [],
            type: cc.SpriteFrame
        },
        faces: {
            default: [],
            type: cc.SpriteFrame
        },
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

    render: function(card) {
        // suit
        this.suit.spriteFrame = this.suits[card.suit - 1];
        // point
        this.point.string = PointEnum[card.point];
        this.point.node.width = 300;
        if (card.isRedSuit) {
            //this.point.node.color = this.redColor;
        } else if(card.isBlackSuit) {
            //this.point.node.color = this.blackColor;
        }
        // contents
        if (card.point > 10) {
            this.contents.spriteFrame = this.faces[card.point - 10 - 1];
        } else {
            this.contents.spriteFrame = this.contentsSuits[card.suit - 1];
        }
    },

    show: function() {
        this.suit.node.active = true;
        this.point.node.active = true;
        this.contents.node.active = true;
        this.contents.spriteFrame = this.front;
    },

    hide: function() {
        this.suit.node.active = false;
        this.point.node.active = false;
        this.contents.node.active = true;
        this.contents.spriteFrame = this.back;
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
