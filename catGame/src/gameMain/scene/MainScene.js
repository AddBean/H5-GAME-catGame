/**
 * Created by jd on 2014/10/30.
 */
var mainScene = cc.Layer.extend({
        _msg: null,
        _msg1: null,
        ctor: function () {
            this._super();
            this.init();

            this._msg = "戴上耳机效果更佳";
            this._msg1 = "使中央数字等于左上角数字";
            this._msg2 = "滑动手指";
            this.addMsg();
            this.addBg();
        },
        /* 初始化添加游戏对象、事件监听*/
        init: function () {
        },
        /* 添加背景*/
        addBg: function () {
            var bg_sp = new cc.DrawNode();
            bg_sp.drawRect(cc.p(0, 0), cc.p(GC.W, GC.H), cc.color(255, 255, 255, 255), 1, cc.color(255, 255, 255, 255));
            this.addChild(bg_sp);
            bg_sp.x = 0;
            bg_sp.y = -50;
        },

        /* 诗句显示*/
        addMsg: function () {
            var msg = new cc.LabelTTF(this._msg, "Arail", 20);
            msg.x = GC.W / 2;
            msg.y = GC.H / 2;
            msg.color = cc.color.WHITE;

            var msg1 = new cc.LabelTTF(this._msg1, "Arail", 20);
            msg1.x = GC.W / 2;
            msg1.y = GC.H / 2 - 20;
            msg1.color = cc.color.WHITE;
            this.msgApear(msg, msg1);
            this.addChild(msg, 10);

            this._msg2 = new cc.LabelTTF(this._msg2, "Arail", 20);
            this._msg2.x = GC.W / 2;
            this._msg2.y = GC.H / 2 + 20;
            this._color = cc.color.WHITE;

        },

        /* msg出现动画*/
        msgApear: function (msg, msg1) {
            this.y = 50;
            var self = this;
            var action1 = cc.fadeIn(0);
            var action2 = cc.fadeIn(1);
            var action3 = cc.fadeOut(1);
            msg.color = cc.color.BLACK;
            msg.runAction(cc.sequence(action1, cc.delayTime(0.1), action2, cc.delayTime(0.5), action3, cc.callFunc(function () {
                self.msg1Apear(msg1);
            })));
        },
        /* msg1出现动画*/
        msg1Apear: function (msg) {
            this.y = 50;

            var self = this;
            var action1 = cc.fadeOut(0);
            var action2 = cc.fadeIn(2);
            msg.runAction(cc.sequence(action1,  action2, cc.callFunc(function () {
                self.addTextBtn();
            })));
            this._msg2.runAction(cc.sequence(action1.clone(),  action2.clone()));
            this.addChild(msg, 10);
            this.addChild(this._msg2, 10);
            msg.color = cc.color.BLACK;
            this._msg2.color = cc.color.BLACK;
        },
        addTextBtn: function () {
            var b1 = new cc.LabelTTF("开始", "Arial", 20);
            b1.color = cc.color.BLACK;
            var menu1 = new cc.MenuItemLabel(b1, function () {
                cc.log("进入场景");
                var scene = new cc.Scene();
                scene.addChild(new Chapter1());
                cc.director.runScene(new cc.TransitionFade(1.2, scene));
            });

            var cocos2dMenu1 = new cc.Menu(menu1);
            cocos2dMenu1.alignItemsVerticallyWithPadding(10);
            cocos2dMenu1.x = GC.W / 2;
            cocos2dMenu1.y = GC.H / 2 - 90;
            this.addChild(cocos2dMenu1, 2, 1);

            var action2 = cc.fadeOut(2).repeatForever();
            var action3 = cc.fadeIn(2).repeatForever();
            b1.runAction(cc.repeatForever(cc.sequence(action2, action3)));
        }
    })
    ;
mainScene.scene = function () {
    var scene = new cc.Scene();
    var layer = new mainScene();
    scene.addChild(layer);
    return scene;
};

var audioEngine = cc.audioEngine;
