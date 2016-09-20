/**
 * Created by jd on 2014/10/28.
 */
var SystemLayout = cc.Layer.extend({
    _context: null,
    _active: true,
    level_arr: new Array(),
    _context: null,
    _origin_point:cc.p(160,0),
    /* 初始化5个能级*/
    ctor: function (context, level1, level2, level3, level4, level5, level6) {
        this._super();
        this._active = 1;
        this._context = context;
        this.level_arr[0] = level1;
        this.level_arr[1] = level2;
        this.level_arr[2] = level3;
        this.level_arr[3] = level4;
        this.level_arr[4] = level5;
        this.level_arr[5] = level6;
        this.x = 0;
        this.y = GC.H / 2;
        this.drawLevel();
    },
    drawLevel: function () {
        var draw = new cc.DrawNode();
        //电子轨道；
        for(var i=0;i<5;i++){
            draw.drawCircle(this._origin_point, 40+i*GC.ORBIT_R, cc.degreesToRadians(90), 50, false, 1, cc.color(255, 255, 255, 100));
        }
        //电子；
        for(var i=0;i<6;i++){
            var r=40+this.level_arr[i]*GC.ORBIT_R;
            draw.drawDot(cc.p(160+r*Math.cos(i*Math.PI/3),r*Math.sin(i*Math.PI/3)), GC.ELE_R, cc.color(255, 255, 255, 100));
        }
        this.addChild(draw, 10);
    },
    destroy: function () {
        this.unschedule(this.shoot);
        this._active = 0;
        this.visible = false;
        this.active = false;
        this.stopAllActions();
    }
});