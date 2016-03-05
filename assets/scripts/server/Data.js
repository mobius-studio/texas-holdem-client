var PlayerType = require('PlayerType');
var PlayerStatus = require('PlayerStatus');

const Data = {
    configs: {
        smallBlind: 500,
        bigBlind: 1000
    },
    players: [
        {playerID:'1001',playerName:'燃烧吧，蛋蛋儿军',chips:3000,profileID:0,playerType:PlayerType.Dealer,playerStatus:null,playerPosition:7,active:true,cards:[]},
        {playerID:'1002',playerName:'地方政府',chips:2000,profileID:1,playerType:PlayerType.SmallBlind,playerStatus:null,playerPosition:8,active:true,cards:[]},
        {playerID:'1003',playerName:'手机超人',chips:1500,profileID:2,playerType:PlayerType.BigBlind,playerStatus:null,playerPosition:0,active:true,cards:[]},
        {playerID:'1004',playerName:'天灵灵，地灵灵',chips:500,profileID:3,playerType:null,playerStatus:null,playerPosition:1,active:true,cards:[]},
        {playerID:'1005',playerName:'哟哟，切克闹',chips:9000,profileID:4,playerType:null,playerStatus:null,playerPosition:2,active:true,cards:[]},
        {playerID:'1006',playerName:'学姐不要死',chips:5000,profileID:5,playerType:null,playerStatus:null,playerPosition:3,active:false,cards:[]},
        {playerID:'1007',playerName:'提百万',chips:10000,profileID:6,playerType:null,playerStatus:null,playerPosition:4,active:true,cards:[]},
        {playerID:'1008',playerName:'九宝',chips:20000,profileID:7,playerType:null,playerStatus:null,playerPosition:5,active:true,cards:[]},
        {playerID:'1009',playerName:'传奇世界',chips:13500,profileID:8,playerType:null,playerStatus:null,playerPosition:6,active:true,cards:[]}
    ]
};

module.exports = Data;
