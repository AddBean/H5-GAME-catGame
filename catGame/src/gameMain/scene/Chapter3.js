/**
 * Created by jd on 2014/10/30.
 */
/**
 * Created by Administrator on 2014/9/30.
 */
/*此为游戏主场景的逻辑控制及层显示初始化*/
var GamePanelLayer = null;
var Chapter3 = cc.Layer.extend({

        _level_arr: new Array(),
        _togglemenu: null,
        _togglemenu1: null,
        _energyLevel_list: new Array(),
        _energyLevel: null,
        _TextLevel: null,
        _music_btn: true,
        _part_count: 0,
        _score_msg: "",
        _score_msg_img: null,
        _score_flag: false,
        _over_flag: true,
        ctor: function () {
            this._super();
            this.init();
        },
        /* 初始化添加游戏对象、事件监听*/
        init: function () {
            GamePanelLayer = this;
            playBgMusics3(true);
            this.initConst();
            this.addBg();
            this.initUI();
            //this.scheduleUpdate();//每帧刷新；
        },
        initConst: function () {
            GamePanelLayer = this;
            GC.SOUND = 1;//声效；

            GC.ORBIT_R = 10;//轨道宽度；
            GC.ORBIT_COUNT = 10;//轨道数量；
            GC.ORBIT_DEF_R = 40;//轨道初始半径；

            GC.ELE_R = 5;//电子半径；
            GC.ELE_COUNT = GC.ORBIT_COUNT;//电子数量，只能是偶数；
            GC.ELE_SPEED = 1;//电子速度；

            GC.SCORE1 = 0;

        },
        initUI: function () {
            this._TextLevel = new TextLayer(this, GC.CHAPTER3_1, GC.CHAPTER3_2);
            this.addChild(this._TextLevel);
        },
        addMainLayer: function () {
            this.addScore();
            var poem1 = "";
            var poem2 = "";
            var ele_arr = GC.CHAPTER_LEVEL3.L1;
            var self = this;
            switch (this._part_count) {
                case 0:
                    poem1 = GC.POEM13;
                    poem2 = GC.POEM14;
                    this.setGC(GC.CHAPTER_LEVEL3.SCORE1, 10);//设置该关分数，电子数；
                    this.setScore(GC.SCORE1);
                    ele_arr = GC.CHAPTER_LEVEL3.L1.slice(0);
                    break;
                case 1:
                    poem1 = GC.POEM15;
                    poem2 = GC.POEM16;
                    this.setGC(GC.CHAPTER_LEVEL3.SCORE2, 10);//设置该关分数，电子数；
                    this.setScore(GC.SCORE1);
                    ele_arr = GC.CHAPTER_LEVEL3.L2.slice(0);
                    share("我过了第三章第一关，游戏也可以这么文雅", this._msg, 10);
                    break;
                case 2:
                    poem1 = GC.POEM17;
                    poem2 = GC.POEM18;
                    this.setGC(GC.CHAPTER_LEVEL3.SCORE3, 10);//设置该关分数，电子数；
                    this.setScore(GC.SCORE1);
                    ele_arr = GC.CHAPTER_LEVEL3.L3.slice(0);
                    share("我过了第三章第二关，游戏也可以这么文雅", this._msg, 10);
                    break;
                default:
                    //延时切换场景；
                    share("我通关了游戏，游戏也可以这么文雅", this._msg, 10);
                    if (this._over_flag) {
                        this._over_flag = false;
                        this.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function () {
                            var textLevel = new TextLayer2(this, "完结");
                            self.addChild(textLevel);
                            self.removeControler();
                        })));
                    }
                    break;

            }
            if (this._part_count < 3) {
                this._energyLevel = new EnergyLevel(this, ele_arr);
                this._energyLevel.apear();
                this.addChild(this._energyLevel);
                this._TextLevel = new TextLayer1(this, poem1, poem2);
                this.addChild(this._TextLevel);
                if (this._music_btn) {
                    this.addMusicControl();
                    this._music_btn = false;
                }
            }
            this._part_count++;
        },
        removeControler: function () {
            this.removeChild(this._togglemenu);
            this.removeChild(this._score_msg);
            this.removeChild(this._score_msg_img);

        },
        /* 加入目标分数显示*/
        addScore: function () {
            if (!this._score_flag) {
                var Score = new cc.LabelTTF(" ", "Arail", 15);
                Score.color = cc.color.BLACK;
                Score.setPosition(cc.pAdd(cc.visibleRect.top, cc.p(-130, -20)));

                var Score_img = new cc.Sprite(res.score_bg);
                Score_img.setPosition(cc.pAdd(cc.visibleRect.top, cc.p(-130, -20)));

                this._score_msg = Score;
                this._score_msg_img = Score_img;

                var action2 = cc.fadeOut(2);
                var action3 = cc.fadeIn(2);
                this._score_msg.runAction(cc.repeatForever(cc.spawn(cc.sequence(action2, action3))));
                this._score_msg_img.runAction(cc.repeatForever(cc.spawn(cc.sequence(action2.clone(), action3.clone()))));

                this.addChild(Score, 10);
                this.addChild(Score_img, 9);
                this._score_flag = true;
            }
        },
        setScore: function (msg) {
            this._score_msg.setString(msg);
        },
        setGC: function (score, count) {
            GC.SCORE1 = score;
            GC.ORBIT_R = 11;  //轨道宽度；
            GC.ORBIT_DEF_R = 40;        //轨道初始半径；
            GC.ORBIT_COUNT = count;     //轨道数量；
            GC.ELE_COUNT = count;       //电子数量，只能是偶数；

            GC.SCORE1 = Math.floor(Math.random() * 90);
            cc.log("本关分数：" + GC.SCORE1);
        },
        setGameLayer: function () {
            this._energyLevel.setToNomal();
        },
        addMusicControl: function () {
            this._togglemenu1 = new cc.MenuItemImage(res.music_sel);
            this.menuItemToggle = new cc.MenuItemToggle(this._togglemenu1, new cc.MenuItemImage(res.music), this.toggleMusicCallback, this);
            this.menuItemToggle.setPosition(cc.pAdd(cc.visibleRect.top, cc.p(100, -20)));
            this._togglemenu = new cc.Menu(this.menuItemToggle);
            this._togglemenu.x = 40;
            this._togglemenu.y = 0;
            this.addChild(this._togglemenu, 1);
            var action1 = cc.rotateBy(5, 360).repeatForever();
            var action2 = cc.fadeOut(2).repeatForever();
            var action3 = cc.fadeIn(2).repeatForever();
            this._togglemenu1.runAction(cc.repeatForever(cc.spawn(action1, cc.sequence(action2, action3))));
        },

        toggleMusicCallback: function (sender) {
            if (sender.getSelectedIndex() == 0) {
                GC.SOUND = 1;
                playBgMusics3(true);
            } else {
                GC.SOUND = 0;
                playBgMusics3(false);
            }
        },
        addBg: function () {
            var bg = new GMSBGLayer();
            this.addChild(bg, 0, 0);
        }
    })
    ;
Chapter3.scene = function () {
    var scene = new cc.Scene();
    var layer = new Chapter3();
    scene.addChild(layer);
    return scene;
};

var audioEngine = cc.audioEngine;
var playBgMusics3 = function (status) {
    if (status) {
        audioEngine.playMusic(res.bg2_mp3, true);
    } else {
        audioEngine.pauseMusic();
    }
    ;
};
