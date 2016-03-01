cc.Class({
    extends: cc.Component,

    properties: {
        userPrefab: {
            default: null,
            type: cc.Prefab
        },
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        users: {
            default: [],
            type: [cc.Node]
        },
        profileImages: {
            default: [],
            type: [cc.SpriteFrame]
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

    init: function() {
        this._users = [];
        for (var i = 0; i < 9; i++) {
            var user = cc.instantiate(this.userPrefab);
            var User = user.getComponent('UserPrefab');
            user.parent = this.users[i];
        }
    },

    deal: function(deck) {
        for (var i = 0; i < 9; i++) {
            // card
            var card = cc.instantiate(this.cardPrefab);
            var Card = card.getComponent('CardPrefab');
            card.parent = this.users[i];
            Card.init(deck.deal());
            i != 4 ? Card.reveal(false) : Card.reveal(true);
            // card1
            var card1 = cc.instantiate(this.cardPrefab);
            var Card1 = card1.getComponent('CardPrefab');
            card1.parent = this.users[i];
            card1.setPosition(cc.p(80,65));
            Card1.init(deck.deal());
            i != 4 ? Card1.reveal(false) : Card1.reveal(true);
        }
    },

    // use this for initialization
    onLoad: function () {
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
