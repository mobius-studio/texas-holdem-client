'use strict';

var CardModule = require('CardModule');
var HandModule = require('HandModule');

cc.Class({
    'extends': cc.Component,

    properties: {
        id: '',
        playerName: {
            'default': null,
            type: cc.Label
        }

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
    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },