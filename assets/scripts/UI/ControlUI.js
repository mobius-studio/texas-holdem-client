var Round = require('Round');
var ButtonType = require('ButtonType');

cc.Class({
    extends: cc.Component,

    properties: {
        buttons: {
            default: [],
            type: [cc.Button]
        }
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

    init: function() {
        this.bindEvent();
    },

    bindEvent: function() {
        for (var i = 0; i < 6; i++) {
            this.bindButtonEvent(ButtonType[i], this.buttons[i]);
        }
    },

    bindButtonEvent: function(buttonType, button) {
        button.node.on(cc.Node.EventType.TOUCH_END, function(e) {
            this.handleButton(buttonType, e);
        }, this);
    },

    handleButton: function(buttonType, e) {
        switch (buttonType) {
            case 'Bet':
                this.handleBet(e);
                break;
            case 'Raise':
                this.handleRaise(e);
                break;
            case 'Fold':
                this.handleFold(e);
                break;
            case 'Allin':
                this.handleAllin(e);
                break;
            case 'Call':
                this.handleCall(e);
                break;
            case 'Check':
                this.handleCheck(e);
                break;
        }
    },

    // 处理下注
    handleBet: function(e) {
        alert('Bet Button Clicked.');
    },

    // 处理加注
    handleRaise: function(e) {
        alert('Raise Button Clicked.');
    },

    // 处理弃牌
    handleFold: function(e) {
        alert('Fold Button Clicked.');
    },

    // 处理All-in
    handleAllin: function(e) {
        alert('All-in Button Clicked.');
    },

    // 处理跟注
    handleCall: function(e) {
        alert('Call Button Clicked.');
    },

    // 处理让牌
    handleCheck: function(e) {
        alert('Check Button Clicked.');
    },

    // use this for initialization
    onLoad: function () {
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
