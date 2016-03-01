var UserTypeEnum = require('UserTypeEnum');

cc.Class({
    extends: cc.Component,

    properties: {
        nickname: {
            default: null,
            type: cc.Label
        },
        profile: {
            default: null,
            type: cc.Sprite
        },
        chips: {
            default: null,
            type: cc.Label
        },
        status: {
            default: null,
            type: cc.Label
        },
        userType: UserTypeEnum.Normal,
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
