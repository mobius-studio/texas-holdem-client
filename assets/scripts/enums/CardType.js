// 卡牌类型
var CardType = cc.Enum({
    Hole: -1,       // 底牌
    Community: -1,  // 公共牌
    Turn: -1,       // 转牌
    River: -1,      // 河牌
    Burn: -1,       // 销牌
});

module.exports = CardType;
