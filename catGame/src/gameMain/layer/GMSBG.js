/**
 * Created by Administrator on 2014/9/30.
 */

var GMSBGLayer = cc.Layer.extend({

    map00:null,
    map01:null,
    mapWidth:0,
    mapIndex:0,

    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        var bg_sp =  new cc.DrawNode();
        bg_sp.drawRect(cc.p(0, 0), cc.p(GC.W, GC.H), cc.color(255, 255, 255, 255),1,cc.color(255, 255, 255, 255));
        this.addChild(bg_sp);
        bg_sp.x = 0;
        bg_sp.y = 0;
        return true;
    }
});

