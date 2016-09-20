/**
 * Created by Administrator on 2014/9/29.
 */

var GSSMenuLayer = cc.Layer.extend({

    map00: null,
    map01: null,
    mapWidth: 0,
    mapIndex: 0,

    ctor: function () {
        this._super();

        this.init();
    },
    init: function () {


        this.addMenu();

    },
    addMenu: function () {
        var play1Normal = new cc.Sprite(res.start);
        var play1Selected = new cc.Sprite(res.start);
        var play1Disabled = new cc.Sprite(res.start);

        var play1 = new cc.MenuItemSprite(
            play1Normal, play1Selected, play1Disabled,
            function () {
                cc.log("开始游戏");
                var scene = new cc.Scene();
                scene.addChild(new GMSLayer());
                cc.director.runScene(new cc.TransitionFade(1.2, scene));
            }, this);

        var cocos2dMenu = new cc.Menu(play1);
        cocos2dMenu.alignItemsVerticallyWithPadding(10);
        cocos2dMenu.x = 160;
        cocos2dMenu.y = 80;
        this.addChild(cocos2dMenu);
    }


});

GSSMenuLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GSSMenuLayer();
    scene.addChild(layer);
    return scene;
};