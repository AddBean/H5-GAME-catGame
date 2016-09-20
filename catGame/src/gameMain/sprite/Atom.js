/**
 * Created by jd on 2014/10/20.
 */
var Atom = cc.Sprite.extend({
        _context: null,
        _dir: 0,//0左1右
        _random_pick: 0,//随机挑选；
        _alive_flag: true,
        _sel_color: cc.color(0, 0, 0, 100),
        _def_color: cc.color(255, 255, 255, 100),
        _pos: 0,
        _sector: 0,
        _seleted_flag: false,
        ctor: function (context, pos, sector) {
            this._super();
            this._context = context;
            this._pos = pos;
            this._sector = sector;
            this.setLoc(pos, sector);
            this.setFrom();
        },
        /* 设置形状圆形*/
        setFrom: function () {
            var draw = new cc.DrawNode();
            draw.drawDot(cc.p(0, 0), GC.ELE_R, this._def_color);
            this.addChild(draw);
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
        /* 获取当前能量值*/
        getPosValue: function () {
            return this._pos;
        },
        /* 被选中轨道高亮显示*/
        atomSeleted: function () {
            this._seleted_flag = true;
            var draw = new cc.DrawNode();
            draw.drawDot(cc.p(0, 0), GC.ELE_R, this._sel_color);
            this.addChild(draw, 1, 1);
        },
        /* 不被选中轨道低亮显示*/
        atomDisSeleted: function () {
            this.removeChildByTag(1);
            this._seleted_flag = false;
        },
        /* 获取当前选中状态*/
        getSelSta: function () {
            return this._seleted_flag;
        },
        /* 设置位置*/
        setLoc: function (pos, sector) {
            var r = GC.ORBIT_DEF_R + pos * GC.ORBIT_R;
            this.x = 160 + r * Math.cos(sector * Math.PI / (GC.ELE_COUNT / 2));
            this.y = r * Math.sin(sector * Math.PI / (GC.ELE_COUNT / 2));
        },
        /* 根据能值获取位置*/
        getLoc: function (pos) {
            var r = GC.ORBIT_DEF_R + pos * GC.ORBIT_R;
            var p = cc.p(160 + r * Math.cos(this._sector * Math.PI / (GC.ELE_COUNT / 2)), r * Math.sin(this._sector * Math.PI / (GC.ELE_COUNT / 2)));
            return p;
        },
        /* 电子移动*/
        moveToPos: function (pos) {
            this._pos=pos;
            var p = this.getLoc(pos);
            var action1 = cc.fadeIn(1.0);
            this.endX = p.x;
            this.endY = p.y;
            this.actionMove = cc.moveTo(GC.ELE_SPEED, cc.p(this.endX, this.endY));
            this.runAction(cc.sequence(this.actionMove,cc.callFunc(this.onCallback, this)));
        },
        /* 失能当前选择状态*/
        onCallback:function(){
            this.atomDisSeleted();
            if(energy_level.getAllValue()==GC.SCORE1){
                energy_level.gameOver();
            }
        }
    })
    ;
