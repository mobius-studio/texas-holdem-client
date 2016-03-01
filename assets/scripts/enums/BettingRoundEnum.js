// 下注轮
var BettingRoundEnum = cc.Enum({
    PreFlop: 1, // "pre-flop" betting round
    Flop: 2,    // "flop" betting round
    Third: 3,   // a third betting round
    Fourth: 4,  // a fourth betting round
});

module.exports = BettingRoundEnum;
