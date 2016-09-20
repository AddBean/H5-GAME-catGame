/**
 * Created by jd on 2014/10/20.
 */
var Orbit = cc.Sprite.extend({
        _context: null,
        _dir: 0,//0左1右
        _random_pick: 0,//随机挑选；
        _alive_flag: true,
        _r: 10,
        _origin_point: cc.p(160, 0),
        _sel_color: cc.color( 255,255 ,255, 255),
        _def_color: cc.color(255, 255, 255, 255),
        _seleted_flag: false,//选中标志；
        ctor: function (context, r) {
            this._super();
            //this.setLoc();
            this._r = r;
            this.setFrom();
        },
        setFrom: function () {
            var draw = new cc.DrawNode();
            draw.drawCircle(this._origin_point, this._r, cc.degreesToRadians(90), 100, false, 1, this._def_color);
            this.addChild(draw, 0, 0);
        },
        /* 自毁*/
        destroy: function () {
            //Explosion.getOrCreateExplosion(this.x, this.y);//动画
            this._alive_flag = 0;
            this.visible = false;
            this.active = false;
            this.stopAllActions();
            this.unschedule(this);
            this._alive_flag = false;
        },
        getSelSta: function () {
            return this._seleted_flag;
        },
        /* 被选中轨道高亮显示*/
        OrbitSeleted: function () {
            this._seleted_flag = true;
            var draw = new cc.DrawNode();
            draw.drawCircle(this._origin_point, this._r, cc.degreesToRadians(90), 100, false, 3, this._sel_color);
            this.addChild(draw, 1, 1);
        },
        /* 不被选中轨道低亮显示*/
        OrbitDisSeleted: function () {
            this.removeChildByTag(1);
            this._seleted_flag = false;
        },
        setLoc: function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        }
    })
    ;
