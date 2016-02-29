var DeckModule = require('DeckModule');

cc.Class({
    extends: cc.Component,

    properties: {
        i: 0,
        // 底池
        pot: {
            default: null,
            type: cc.Label
        },
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        testNode: {
            default: null,
            type: cc.Node
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

    // use this for initialization
    onLoad: function () {
        console.log('Game starting... ');
        this.deck = new DeckModule(1);
        this.deck.shuffle();
    },

    test: function() {
        var card = this.deck.deal();
        console.log(this.i);
        var cardPrefab = cc.instantiate(this.cardPrefab);
        cardPrefab.parent = this.testNode;
        var pos = cc.p(-300 + this.i * 50, -300 + this.i * 50);
        cardPrefab.setPosition(pos);
        var cardComponent = cardPrefab.getComponent('CardPrefab');
        cardComponent.render(card);
        this.i = this.i + 1;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
