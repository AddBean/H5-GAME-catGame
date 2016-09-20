/**
 * Created by jd on 2014/10/29.
 */
var TextLayer2 = cc.Layer.extend({
        _context: null,
        _msg: null,
        _touch_flag: true,
        /* 初始化5个能级*/
        ctor: function (context, msg) {
            this._super();
            this._active = 1;
            this._context = context;
            this._msg = msg;
            this.apear();
            this.addMsg();
            this.addAd();
            this.addRestartkButton();
            this.addShareButton();
        },
        /* 出现动画*/
        apear: function () {
            this.y = -100;
            var action1 = cc.moveTo(3, cc.p(0, 0));
            this.runAction(cc.spawn(action1));
        },
        /* 消失并自毁*/
        share: function () {
            cc.log("分享");
            this.addShareArr();
        },
        /* 自毁*/
        destroyAll: function () {
            energy_level._touch_enable = true;
            this.visible = false;
            this.active = false;
            this.stopAllActions();
            this.unschedule(this);
            cc.log("el destory");
        },
        addShareArr: function () {
            var share_arr = new cc.Sprite(res.share_arr);
            share_arr.setPosition(cc.p(300, 310));
            this.addChild(share_arr, 1);
            var action1 = cc.moveTo(0.5, cc.p(300, 280));
            var action2 = cc.moveTo(0.5, cc.p(300, 310));
            var action3 = cc.fadeOut(0.5).repeatForever();
            var action4 = cc.fadeIn(0.5).repeatForever();
            share_arr.runAction(cc.repeatForever(cc.spawn(cc.sequence(action1, action2), cc.sequence(action3, action4))));


            var msg1 = new cc.LabelTTF("分享", "Arail", 15);
            ;
            msg1.setPosition(cc.p(300, 250));
            msg1.color = cc.color.BLACK;
            this.addChild(msg1, 10);
            var Maction1 = cc.moveTo(0.5, cc.p(300, 270));
            var Maction2 = cc.moveTo(0.5, cc.p(300, 250));
            var Maction3 = cc.fadeOut(0.5).repeatForever();
            var Maction4 = cc.fadeIn(0.5).repeatForever();
            msg1.runAction(cc.repeatForever(cc.spawn(cc.sequence(Maction2, Maction1), cc.sequence(Maction3, Maction4))));
        },
        /* 显示text*/
        addMsg: function () {
            var msg = new cc.LabelTTF(this._msg, "Arail", 20);
            msg.x = GC.W / 2;
            msg.y = GC.H / 2 - 70;
            msg.color = cc.color.BLACK;
            this.msgApear(msg);
            this.addChild(msg, 10);

        },
        //添加重新开始按钮；
        addRestartkButton: function () {

            var b1 = new cc.LabelTTF("重新开始", "Arial", 20);
            b1.color = cc.color.BLACK;
            var menu1 = new cc.MenuItemLabel(b1, function () {
                cc.log("重新开始");
                var scene = new cc.Scene();
                scene.addChild(new Chapter1());
                cc.director.runScene(new cc.TransitionFade(1.2, scene));
            });
            var cocos2dMenu1 = new cc.Menu(menu1);
            cocos2dMenu1.alignItemsVerticallyWithPadding(10);
            cocos2dMenu1.x = GC.W / 2 - 70;
            cocos2dMenu1.y = GC.H / 2 - 160;
            this.addChild(cocos2dMenu1, 2, 1);


        },
        //添加分享按钮；
        addShareButton: function () {
            var self = this;
            var b1 = new cc.LabelTTF("立即分享", "Arial", 20);
            b1.color = cc.color.BLACK;
            var menu1 = new cc.MenuItemLabel(b1, function () {
                cc.log("分享");
                self.onShare();
            });
            var cocos2dMenu1 = new cc.Menu(menu1);
            cocos2dMenu1.alignItemsVerticallyWithPadding(10);
            cocos2dMenu1.x = GC.W / 2 + 70;
            cocos2dMenu1.y = GC.H / 2 - 160;
            this.addChild(cocos2dMenu1, 2, 1);

        },
        /* msg出现动画*/
        msgApear: function (msg) {
            this.y = 50;
            var self = this;
            var action1 = cc.fadeIn(0);
            var action2 = cc.fadeIn(1);
            msg.color = cc.color.BLACK;
            msg.runAction(cc.sequence(action1, action2));
        },
        destroy: function () {
            this.unschedule(this.shoot);
            this._active = 0;
            this.visible = false;
            this.active = false;
            this.stopAllActions();
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
            admenu.y = -125;
        },
        onAd: function () {
            cc.log("点击广告");
            window.location.href = "http://114.215.191.133:9002/";
        },
        onShare: function () {
            cc.log("分享");
            this.addShareArr();
            var share_get = new XMLHttpRequest();
            share_get.open("GET", "http://game.yoopoon.com/fxtj.html?from=catGame");    //get到分享统计页面，from后跟游戏名
            share_get.onreadystatechange = function () {
            };
            share("我通关了游戏，游戏也可以这么文雅", this._msg, 10);
        }
    })
    ;