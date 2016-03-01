// 用户类型
var UserType = cc.Enum({
    Normal: -1,     // 普通
    Dealer: -1,     // 庄家
    SmallBlind: -1, // 小盲注
    BigBlind: -1,   // 大盲注
});

module.exports = UserType;
