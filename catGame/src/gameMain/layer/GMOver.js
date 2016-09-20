/**
 * Created by jd on 2014/10/13.
 */
var GMOLayer = cc.Layer.extend({

    map00: null,
    map01: null,
    mapWidth: 0,
    mapIndex: 0,
    _score: 0,
    _msg: "无消息",
    ctor: function ( scroe, msg) {
        this._super();
        GC.SCORE = scroe;
        this._score = scroe;
        this._msg = msg;
        this.init();
    },
    init: function () {
        /*重新开始按钮*/
        this.addBg();
        this.addBut();
        this.addOther();
        this.addAd();//添加广告;
    },
    addBg: function () {
        var bg_sp = new cc.Sprite(res.overbg);
        this.addChild(bg_sp);
        bg_sp.x = GC.W/2;
        bg_sp.y = GC.H/2;
    },
    addBut: function () {
        //重新开始按键；

        var paNormal = new cc.Sprite(res.start_btn);
        var paSelected = new cc.Sprite(res.start_btn);
        var paDisabled = new cc.Sprite(res.start_btn);

        var pa = new cc.MenuItemSprite(
            paNormal, paSelected, paDisabled,
            function () {
                var scene = new cc.Scene();
                scene.addChild(new GMSLayer());
                cc.director.runScene(new cc.TransitionFade(1.2, scene));
            }, this);

        var shNormal = new cc.Sprite(res.share_btn);
        var shSelected = new cc.Sprite(res.share_btn);
        var shDisabled = new cc.Sprite(res.share_btn);

        var sh = new cc.MenuItemSprite(
            shNormal, shSelected, shDisabled,
            function () {
                cc.log("分享");
                var _share = cc.Sprite.create(res.sharebg);
                _share.setPosition(GC.W / 2, GC.H / 2);
                this.addChild(_share);

                //分享统计
                var share_get = new XMLHttpRequest();
                share_get.open("GET", "http://game.yoopoon.com/fxtj.html?from=DeathWarrant");    //get到分享统计页面，from后跟游戏名
                share_get.onreadystatechange = function () {
                };
                var cell_count = GC.SCORE;
                share(cell_count, this._msg, 10);
            }, this);
        var menu = new cc.Menu(pa, sh);
        menu.alignItemsHorizontallyWithPadding(30);
        this.addChild(menu, 100, 2);
        menu.x = GC.W / 2;
        menu.y = GC.H * 2 / 8;

    },
    addOther: function () {
        var Msg = new cc.LabelTTF(this._msg + "", "Arail", 20);
        Msg.x = GC.W / 2;
        Msg.y = GC.H / 2+35 ;
        this.addChild(Msg);

        var Score = new cc.LabelTTF(""+this._score, "Arail", 37);
        Score.setColor(cc.color(255,0,0,255));
        Score.x = GC.W / 2+25;
        Score.y = GC.H / 2-24;
        this.addChild(Score);

    },
    onPlayAgain: function () {

        cc.log("重新开始游戏");
        var scene = new cc.Scene();
        scene.addChild(new GMSLayer());
        cc.director.runScene(new cc.TransitionFade(1.2, scene));

    },
    addAd: function () {
        var adNormal = new cc.Sprite(res.AD, cc.rect(0, 0, 320, 51));
        var adSelected = new cc.Sprite(res.AD, cc.rect(0, 0, 320, 51));
        var adDisabled = new cc.Sprite(res.AD, cc.rect(0, 0, 320, 51));

        var play = new cc.MenuItemSprite(
            adNormal, adSelected, adDisabled,
            this.onAd, this);
        var admenu = new cc.Menu(play);
        this.addChild(admenu, 1, 2);
        admenu.x = 160;
        admenu.y = 25;
    },
    onAd: function () {
        cc.log("点击广告");
        window.location.href = "http://114.215.191.133:9002/";
    },
    onShare: function () {
        cc.log("分享");
        var _share = cc.Sprite.create(res.sharebg);
        _share.setPosition(GC.W / 2, GC.H / 2);
        this.addChild(_share);

        //分享统计
        var share_get = new XMLHttpRequest();
        share_get.open("GET", "http://game.yoopoon.com/fxtj.html?from=wwGame");    //get到分享统计页面，from后跟游戏名
        share_get.onreadystatechange = function () {
        };
        var cell_count = GC.SCORE;
        share(cell_count, this._msg, 10);
    }
});