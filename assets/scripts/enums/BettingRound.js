// 下注轮
var BettingRound = cc.Enum({
    PreFlop: -1,    // 翻牌前轮
    Flop: -1,       // 翻牌轮
    Third: -1,      // 第三轮
    Fourth: -1,     // 第四轮
    Showdown: -1,   // 摊牌
});

module.exports = BettingRound;
