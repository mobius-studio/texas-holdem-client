// 按钮类型
var ButtonType = cc.Enum({
    Bet: -1,    // 下注
    Raise: -1,  // 加注
    Fold: -1,   // 弃牌
    Allin: -1,  // All-in
    Call: -1,   // 跟注
    Check: -1,  // 让牌
});

module.exports = ButtonType;
