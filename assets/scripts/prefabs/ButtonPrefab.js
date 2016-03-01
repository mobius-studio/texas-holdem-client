var ButtonType = require('ButtonType');

cc.Class({
    extends: cc.Component,

    properties: {
        
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

    render: function(buttonType) {
        switch (buttonType) {
            case Bet: break;
            case Raise: break;
            case Fold: break;
            case Allin: break;
            case Call: break;
            case Check: break;
            default:
        }
    },

    renderButton: function() {
        var node = new cc.Button();
        
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
