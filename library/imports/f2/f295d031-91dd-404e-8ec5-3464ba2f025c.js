// 牌型，值越大越厉害
"use strict";

var HandType = cc.Enum({
    HighCard: -1, // 高牌
    OnePair: -1, // 一对
    TowPair: -1, // 两对
    Trips: -1, // 三条
    Straight: -1, // 顺子
    Flush: -1, // 同花
    FullHouse: -1, // 葫芦
    Quads: -1, // 四條
    StraightFlush: -1, // 同花顺
    RoyalFlush: -1 });

// 皇家同花顺
module.exports = {
    HandType: HandType
};