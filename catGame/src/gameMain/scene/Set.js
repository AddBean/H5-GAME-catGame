/**
 * Created by jd on 2014/10/13.
 */
/**
 * Created by jd on 2014/10/13.
 */
/**
 * Created by Administrator on 2014/9/30.
 */
/*设置场景*/
var SetLayer = cc.Layer.extend({





    ctor: function () {
        this._super();
        this.init();
    },
    /* 初始化添加游戏对象、事件监听*/
    init: function () {

        var locChildren = this.children;
        var dstPoint = cc.p(0, 0);


        this.addBg();
        this.addBackButton();

        this.addSoundSet();
        this.addParticleEffectsSet();
        //this.addGrivitySet();

        for (var i = 1; i < locChildren.length; i++) {
            var selChild = locChildren[i];
            if (selChild) {
                dstPoint.x = selChild.x - GC.W / 4;
                dstPoint.y = selChild.y;
                var offset = 0 | (GC.W / 2 + 100);
                if (i % 2 == 0)
                    offset = -offset;

                selChild.x = dstPoint.x + offset;
                selChild.y = dstPoint.y;
                selChild.runAction(cc.moveBy(2, cc.p(dstPoint.x - offset, 0)).easing(cc.easeElasticOut(0.35)));
            }
        }
    },
    //添加开始按钮；
    addBackButton: function () {

        var b1 = new cc.LabelTTF("返回", "Arial", 20);
        var menu1 = new cc.MenuItemLabel(b1, function () {
            cc.log("返回");
            var scene = new cc.Scene();
            scene.addChild(new GMSLayer());
            cc.director.runScene(new cc.TransitionFade(1.2, scene));
        });
        var cocos2dMenu1 = new cc.Menu(menu1);
        cocos2dMenu1.alignItemsVerticallyWithPadding(10);
        cocos2dMenu1.x = GC.W / 2 - 60;
        cocos2dMenu1.y = GC.H - 30;
        this.addChild(cocos2dMenu1, 2, 1);


    },
    //添加背景；
    addBg: function () {
        var bg = new GMSBGLayer();
        this.addChild(bg, 0);

    },
    onSoundSet: function () {
        if (GC.SOUND == 0) {
            GC.SOUND = 1;
        } else if (GC.SOUND == 1) {
            GC.SOUND = 0;
        }
        cc.log("回调函数:" + GC.SOUND);

    },
    //声音设置;
    addSoundSet: function () {
        var sound_text = new cc.LabelTTF("声音", "Arial", 20);
        sound_text.x = GC.W / 2-20;
        sound_text.y = GC.H * 2 / 3
        this.addChild(sound_text, 2);

        cc.MenuItemFont.setFontSize(20);
        var sound_item = new cc.MenuItemToggle(
            new cc.MenuItemFont("关"),
            new cc.MenuItemFont("开"),
            this.onSoundSet,
            this
        );
        sound_item.setSelectedIndex(GC.SOUND);//初始化选择第2个；
        sound_item.setCallback(this.onSoundSet, this);
        var menu = new cc.Menu(
            sound_item);
        menu.x = GC.W / 2+25;
        menu.y = GC.H * 2 / 3
        this.addChild(menu, 2);

    },
    onParticleEffectsSet: function () {
        if (GC.PE == 0) {
            GC.PE = 1;
        } else if (GC.PE == 1) {
            GC.PE = 0;
        }
        cc.log("回调函数:" + GC.PE);

    },
    //粒子特效开关；
    addParticleEffectsSet: function () {
        var sound_text = new cc.LabelTTF("粒子特效", "Arial", 20);
        sound_text.x = GC.W / 2-20;
        sound_text.y = GC.H / 2;
        this.addChild(sound_text, 2);

        cc.MenuItemFont.setFontSize(20);
        var sound_item = new cc.MenuItemToggle(
            new cc.MenuItemFont("关"),
            new cc.MenuItemFont("开"),
            this.onParticleEffectsSet,
            this
        );
        sound_item.setSelectedIndex(GC.PE);//初始化选择第2个；
        sound_item.setCallback(this.onParticleEffectsSet, this);
        var menu = new cc.Menu(
            sound_item);
        menu.x = GC.W / 2+25;
        menu.y = GC.H / 2;
        this.addChild(menu, 2);
    },
    onGrivitySet: function () {
        if (GC.GRIVITY == 0) {
            GC.GRIVITY = 1;
        } else if (GC.GRIVITY == 1) {
            GC.GRIVITY = 0;
        }
        cc.log("回调函数:" + GC.GRIVITY);

    },
    //重力感应设置；
    addGrivitySet: function () {
        var sound_text = new cc.LabelTTF("重力感应", "Arial", 20);
        sound_text.x = GC.W / 2-20;
        sound_text.y = GC.H /3
        this.addChild(sound_text, 2);

        cc.MenuItemFont.setFontSize(20);
        var sound_item = new cc.MenuItemToggle(
            new cc.MenuItemFont("关"),
            new cc.MenuItemFont("开"),
            this.onGrivitySet,
            this
        );
        sound_item.setSelectedIndex(GC.GRIVITY);//初始化选择第2个；
        sound_item.setCallback(this.onGrivitySet, this);
        var menu = new cc.Menu(
            sound_item);
        menu.x = GC.W / 2+25;
        menu.y = GC.H / 3
        this.addChild(menu, 2);

    }
});


