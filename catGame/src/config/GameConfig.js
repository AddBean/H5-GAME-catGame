/**
 * Created by Administrator on 2014/9/22.
 */

var GC = GC || {};

GC.winSize = cc.size(320, 480);
GC.H = GC.winSize.height;
GC.W = GC.winSize.width;
GC.SCORE = 0;


GC.SOUND = 1;//声效；

GC.ORBIT_R = 14;//轨道宽度；
GC.ORBIT_COUNT = 6;//轨道数量；
GC.ORBIT_DEF_R = 40;//轨道初始半径；

GC.ELE_R = 5;//电子半径；
GC.ELE_COUNT = GC.ORBIT_COUNT;//电子数量，只能是偶数；
GC.ELE_SPEED = 1;//电子速度；

GC.SCORE1 = 0;

GC.CHAPTER1_1 = "第一章";
GC.CHAPTER1_2 = "欢乐";

GC.POEM1 = "眼睛,在流泪";
GC.POEM2 = "不是怨恨，不是悲伤";
GC.POEM3 = "脸颊，布满皱纹";
GC.POEM4 = "不是衰老，不是哀愁";
GC.POEM5 = "是欢乐";
GC.POEM6 = "也是生活";

GC.CHAPTER2_1 = "第二章";
GC.CHAPTER2_2 = "平静";

GC.POEM7 = "寂静的夜";
GC.POEM8 = "听不见白天的喧嚣";
GC.POEM9 = "却能听见";
GC.POEM10 = "自己的心跳";
GC.POEM11 = "那声音";
GC.POEM12 = "便是平静";

GC.CHAPTER3_1 = "第三章";
GC.CHAPTER3_2 = "哀伤";

GC.POEM13 = "如此宁静";
GC.POEM14 = "却也如此喧嚣";
GC.POEM15 = "叹息";
GC.POEM16 = "在荡漾";
GC.POEM17 = "激起的";
GC.POEM18 = "是哀伤";

GC.EL = {
    ATOM: [],
    ORBIT: []
};
GC.CHAPTER_LEVEL1 = {//第一章节,6；
    SCORE1:0,
    SCORE2:3,
    SCORE3:6,
    L1:[5,5,5,5,5,5],
    L2:[0,0,0,0,0,0],
    L3:[3,3,3,3,3,3]
};
GC.CHAPTER_LEVEL2 = {//第二章节,8；
    SCORE1:0,
    SCORE2:3,
    SCORE3:6,
    L1:[7,4,3,4,5,7,0,7],
    L2:[2,6,4,1,2,7,2,3],
    L3:[1,3,6,2,3,5,3,7]
};
GC.CHAPTER_LEVEL3 = {//第三章节,10；
    SCORE1:0,
    SCORE2:3,
    SCORE3:6,
    L1:[1,2,3,4,5,6,7,8,9,0],
    L2:[2,1,4,5,7,8,9,3,5,4],
    L3:[3,4,6,3,9,3,2,0,3,4]
};
GC.MSG1 = "He Lies Somewhere here.";