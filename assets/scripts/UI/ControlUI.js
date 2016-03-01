var Round = require('Round');

cc.Class({
    extends: cc.Component,

    properties: {
        game: {
            default: null,
            type: cc.Node
        },
        betButton: {
            default: null,
            type: cc.Button
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

    bindEvent: function() {
        this.betButton.on(cc.Node.EventType.TOUCH_START, function(e) {
            this.game.bettingRound(Round.PreFlop);
        }, this);
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
