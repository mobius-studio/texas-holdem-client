cc.Class({
    extends: cc.Component,

    properties: {
        pot: {
            default: null,
            type: cc.Label
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

    init: function(antes) {
        return true;
    },

    // 更新底池筹码
    updateChips: function(chips) {
        this.Label = this.pot.node.getComponent(cc.Label);
        this.Label.string = chips;
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
