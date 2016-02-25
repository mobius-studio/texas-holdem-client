cc.Class({
    extends: cc.Component,

    properties: {
        suit: {
            default: null,
            type: cc.Label
        },
        point: {
            default: null,
            type: cc.Label
        },
        front: {
            default: null,
            type: cc.Sprite
        },
        back: {
            default: null,
            type: cc.Sprite
        },
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

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
