/**
 * Created by jd on 2014/10/29.
 */
var TextLayer1 = cc.Layer.extend({
        _context: null,
        _msg: null,
        _msg1: null,
        _touch_flag:true,
        /* 初始化5个能级*/
        ctor: function (context, msg,msg1) {
            this._super();
            this._active = 1;
            this._context = context;
            this._msg = msg;
            this._msg1 = msg1;
            this.addMsg();
            this.apear();
        },
        addBtn: function () {
            energy_level._touch_enable=false;
            togglemenu1 = new cc.MenuItemImage(res.btn);
            togglemenu2 = new cc.MenuItemImage(res.btn);
            this.menuItemToggle = new cc.MenuItemToggle(togglemenu1, togglemenu2, this.btnCallback, this);
            this.menuItemToggle.setPosition(cc.pAdd(cc.visibleRect.bottom, cc.p(0, 0)));
            var togglemenu = new cc.Menu(this.menuItemToggle);
            togglemenu.x = 0;
            togglemenu.y = -200;
            this.addChild(togglemenu, 1);
            var action1 = cc.rotateBy(5, 360).repeatForever();

            var action2 = cc.fadeOut(2).repeatForever();
            var action3 = cc.fadeIn(2).repeatForever();
            var action4=cc.scaleTo(2.1,0.5);
            var action5=cc.scaleTo(2.1,0.9);
            var action6 = cc.moveTo(1.5, cc.p(0,0));
            togglemenu.runAction(action6);
            togglemenu1.runAction(cc.repeatForever(cc.spawn(action1,cc.sequence(action4, action5),cc.sequence(action2, action3))));
            //togglemenu2.runAction(cc.repeatForever(cc.spawn(action1,cc.sequence(action4, action5),cc.sequence(action2, action3))));
        },
        btnCallback: function (sender) {
            cc.log("btn");
            energy_level._touch_enable=false;
            if(this._touch_flag){
                this._touch_flag=false;
                this.disapear();
            }
        },
        /* 出现动画*/
        apear: function () {

            this.y = -100;
            var action1 = cc.moveTo(3, cc.p(0, GC.H / 2-140));
            this.runAction(cc.spawn(action1));
        },
        /* 消失并自毁*/
        disapear: function () {

            var self = this;
            GamePanelLayer.setGameLayer();
            var action1 = cc.moveTo(2, cc.p(0, -400));
            var action2 = cc.fadeOut(2.0);
            this.runAction(cc.sequence(cc.spawn(action1,action2), cc.callFunc(function () {
                self.destroyAll();
            })));
        },
        /* 自毁*/
        destroyAll: function () {
            energy_level._touch_enable=true;
            this.visible = false;
            this.active = false;
            this.stopAllActions();
            this.unschedule(this);
            cc.log("el destory");
        },
        /* 诗句显示*/
        addMsg: function () {
            var msg = new cc.LabelTTF(this._msg, "Arail", 20);
            msg.x = GC.W / 2;
            msg.y = GC.H / 2-110;
            msg.color = cc.color.BLACK;

            var msg1 = new cc.LabelTTF(this._msg1, "Arail", 20);
            msg1.x = GC.W / 2;
            msg1.y = GC.H / 2 -150;
            msg1.color = cc.color.BLACK;
            this.msgApear(msg,msg1);
            this.addChild(msg, 10);

        },
        /* msg出现动画*/
        msgApear: function (msg,msg1) {
            this.y = 50;
            var self = this;
            var action1 = cc.fadeIn(0);
            var action2 = cc.fadeIn(3);
            msg.color = cc.color.BLACK;
            //msg.runAction(action1);
            msg.runAction(cc.sequence(action1,cc.delayTime(1), action2, cc.callFunc(function () {
                self.msg1Apear(msg1);
            })));
        },
        /* msg1出现动画*/
        msg1Apear: function (msg) {
            this.addChild(msg, 10);
            msg.color = cc.color.BLACK;
            var self = this;
            var action1 = cc.fadeIn(0);
            var action2 = cc.fadeIn(3);
            msg.runAction(cc.sequence(action1, cc.delayTime(1), action2, cc.callFunc(function () {
                self.addBtn();
            })));

        },
        destroy: function () {
            this.unschedule(this.shoot);
            this._active = 0;
            this.visible = false;
            this.active = false;
            this.stopAllActions();
        }
    })
    ;