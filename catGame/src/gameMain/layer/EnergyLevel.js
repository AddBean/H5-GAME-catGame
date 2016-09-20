/**
 * Created by jd on 2014/10/24.
 */
var energy_level = null;
var EnergyLevel = cc.Layer.extend({
        _context: null,
        _active: true,
        level_arr: new Array(),
        _context: null,
        _origin_point: cc.p(160, 0),
        _atom_zOrder: 1,
        _orbit_zOrder: 1,
        _sector_zOder: 0,
        _atom_tag: 10,
        _orbit_tag: 20,
        _sector_tag: 30,

        _score_msg: 0,

        _seleted_sector: 0,//当前选中的扇面；
        _seleted_sector_draw: null,//当前选中的扇面画；
        _seleted_orbit: 0,//当前选中的轨道；
        _touch_enable: false,
        /* 初始化5个能级*/
        ctor: function (context, arr) {

            this._super();
            this._active = 1;
            this._context = context;
            this.initConst();
            this.level_arr = arr.slice(0);
            ;
            this.x = 0;
            this.y = GC.H / 2;
            this.drawLevel();
            for (var i = 0; i < GC.ELE_COUNT; i++) {
                this.drawSector(i);
            }
            this.addTouch();
            this.addScore();
            energy_level = this;
        },
        initConst: function () {
            GC.EL.ATOM = [];
            GC.EL.ORBIT = [];

            this._atom_zOrder = 1;
            this._orbit_zOrder = 1;
            this._sector_zOder = 0;
            this._atom_tag = 10;
            this._orbit_tag = 20;
            this._sector_tag = 30;

            this._score_msg = 0;

            this._touch_flag = true;
            this._seleted_sector = 0;//当前选中的扇面；
            this._seleted_sector_draw = null;//当前选中的扇面画；
            this._seleted_orbit = 0;//当前选中的轨道；

        },
        /* 出现动画*/
        apear: function () {
            this._touch_enable = false;
            this.y = GC.H + 50;
            this.scale = 0.5;
            var action1 = cc.moveTo(5, cc.p(0, GC.H / 2));
            var action2 = cc.scaleTo(5, 0.5);
            this.runAction(cc.spawn(action1, action2));
        },
        /* 设置到游戏正常大小*/
        setToNomal: function () {
            var self = this;
            var action1 = cc.moveTo(2, cc.p(0, GC.H / 2));
            var action2 = cc.scaleTo(2, 1);
            this.runAction(cc.sequence(cc.spawn(action1, action2),cc.callFunc(function () {
                self._touch_enable = true;
            })));

        },
        /* 设置缩小*/
        setToSmall: function () {
            var self = this;
            var action1 = cc.moveTo(2, cc.p(0, GC.H / 2));
            var action2 = cc.scaleTo(2, 0.5);
            this.runAction(cc.spawn(action1, action2, cc.callFunc(function () {
                self.disapear();
            })));
        },
        /* 消失并自毁*/
        disapear: function () {
            this._touch_enable = false;
            var self = this;
            var action1 = cc.moveTo(4, cc.p(0, GC.H));
            var action2 = cc.fadeOut(1.0);
            this.runAction(cc.sequence(action1, action2, cc.callFunc(function () {
                self.destroyAll();
            })));
        },
        /* 自毁*/
        destroyAll: function () {
            this.visible = false;
            this.active = false;
            this.stopAllActions();
            this.unschedule(this);
            cc.log("el destory");
        },
        /* 加入分数显示*/
        addScore: function () {

            var Score = new cc.LabelTTF(" " + this.getAllValue() + " ", "Arail", 20);
            Score.x = this._origin_point.x;
            Score.y = this._origin_point.y;
            Score.color = cc.color.BLACK;
            this._score_msg = Score;
            this.addChild(Score, 10);

        },
        /* 获取中间分数*/
        setScore: function () {
            this._score_msg.setString(" " + this.getAllValue() + " ");
        },
        /* 将所有的电子能值相加*/
        getAllValue: function () {
            //所有电子值相加；
            GC.SCORE = 0;
            for (var i = 0; i < GC.ELE_COUNT; i++) {
                GC.SCORE = GC.SCORE + GC.EL.ATOM[i].getPosValue();
            }
            return GC.SCORE;
        },
        /* 加入轨道和电子*/
        drawLevel: function () {
            for (var i = 0; i < GC.ORBIT_COUNT; i++) {
                var O = new Orbit(this, GC.ORBIT_DEF_R + i * GC.ORBIT_R);//电子轨道；
                O.OrbitSeleted();
                O.OrbitDisSeleted();
                GC.EL.ORBIT.push(O);
                this.addChild(O, this._atom_zOrder, this._atom_tag + i);
            }
            for (var i = 0; i < GC.ELE_COUNT; i++) {
                var A = new Atom(this, this.level_arr[i], i);//电子；
                GC.EL.ATOM.push(A);
                this.addChild(A, this._orbit_zOrder, this._orbit_tag + i);
            }
            /* 加入圆心*/
            var draw = new cc.DrawNode();
            draw.drawDot(this._origin_point, GC.ORBIT_DEF_R, cc.color(255, 255, 255, 255));
            this.addChild(draw, 2);
        },
        /* 画扇形*/
        drawSector: function (i) {
            var r = GC.ORBIT_DEF_R + (GC.ORBIT_COUNT + 1) * GC.ORBIT_R;
            var draw = new cc.DrawNode();
            var v = [];
            var j = 0;
            for (var i = 0; i < GC.ELE_COUNT; i++) {
                v[j] = cc.p(160 + r * Math.cos(i * Math.PI / (GC.ELE_COUNT / 2) + Math.PI / (GC.ELE_COUNT)),
                        r * Math.sin(i * Math.PI / (GC.ELE_COUNT / 2) + Math.PI / (GC.ELE_COUNT)));
                v[j++] = cc.p(160 + r * Math.cos(i * Math.PI / (GC.ELE_COUNT / 2) - Math.PI / (GC.ELE_COUNT)),
                        r * Math.sin(i * Math.PI / (GC.ELE_COUNT / 2) - Math.PI / (GC.ELE_COUNT)));
            }
            draw.drawPoly(v, cc.color(30, 144, 255, 50), 0, 0, cc.color(30, 144, 255, 50));
            this.addChild(draw, this._sector_zOder, this._sector_tag);
        },
        /* 画选中扇形*/
        drawSectorSel: function (i) {
            var r = GC.ORBIT_DEF_R + (GC.ORBIT_COUNT + 1) * GC.ORBIT_R;
            var draw = new cc.DrawNode();
            var p1 = cc.p(160 + r * Math.cos(i * Math.PI / (GC.ELE_COUNT / 2) + Math.PI / (GC.ELE_COUNT)),
                    r * Math.sin(i * Math.PI / (GC.ELE_COUNT / 2) + Math.PI / GC.ELE_COUNT));
            var p2 = cc.p(160 + r * Math.cos(i * Math.PI / (GC.ELE_COUNT / 2) - Math.PI / (GC.ELE_COUNT)),
                    r * Math.sin(i * Math.PI / (GC.ELE_COUNT / 2) - Math.PI / GC.ELE_COUNT));
            var v = [this._origin_point, p1, p2];
            draw.drawPoly(v, cc.color(220, 220, 220, 100), 0, 0, cc.color(220, 220, 220, 100));
            this._seleted_sector_draw = draw;
            this.addChild(draw, this._sector_zOder, this._sector_tag + 1);
        },
        /* 清除扇形*/
        clearSector: function () {
            this.removeChildByTag(this._sector_tag + 1);
        },
        /* 添加触摸事件*/
        addTouch: function () {
            if ('mouse' in cc.sys.capabilities)
                cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    onMouseMove: function (event) {
                        if (event.getButton() == cc.EventMouse.BUTTON_LEFT)
                            event.getCurrentTarget().processMoveEvent(event);
                    },
                    onMouseUp: function (event) {
                        if (event.getButton() == cc.EventMouse.BUTTON_LEFT)
                            event.getCurrentTarget().processUpEvent(event);
                    }
                }, this);

            if (cc.sys.capabilities.
                hasOwnProperty('touches')) {
                cc.eventManager.addListener({
                    prevTouchId: -1,
                    event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                    onTouchesMoved: function (touches, event) {
                        var touch = touches[0];
                        if (this.prevTouchId != touch.getId())
                            this.prevTouchId = touch.getId();
                        else event.getCurrentTarget().processMoveEvent(touches[0]);
                    },
                    onTouchesEnded: function (touches, event) {
                        var touch = touches[0];
                        if (this.prevTouchId != touch.getId())
                            this.prevTouchId = touch.getId();
                        else event.getCurrentTarget().processUpEvent(touches[0]);
                    }
                }, this);
            }
        },
        /* 处理触摸移动事件*/
        processMoveEvent: function (event) {
            if (this._touch_enable) {
                var curPos = event.getLocation();

                this.touchSector(curPos);//处理触摸扇形事件;
                this.touchOrbit(curPos);//处理触摸轨道事件；
                this.touchAtom();//高亮显示选中电子；

            }
        },
        /* 手指松开事件处理*/
        processUpEvent: function (event) {
            if (this._touch_enable) {
                this._touch_flag = true;
                this.disSelOrbit();
                this.clearSector();
                //cc.log("数组数量" + GC.EL.ATOM.length + this._seleted_sector);
                //当位移位置不同时移动电子
                if (GC.EL.ATOM[this._seleted_sector].getPosValue() != this._seleted_orbit) {
                    if (this._seleted_sector < GC.ELE_COUNT - 1 && this._seleted_sector > 0) {
                        GC.EL.ATOM[this._seleted_sector].moveToPos(this._seleted_orbit);
                        GC.EL.ATOM[this._seleted_sector + 1].moveToPos(this._seleted_orbit);
                        GC.EL.ATOM[this._seleted_sector - 1].moveToPos(this._seleted_orbit);
                    } else if (this._seleted_sector == 0) {
                        GC.EL.ATOM[this._seleted_sector].moveToPos(this._seleted_orbit);
                        GC.EL.ATOM[GC.ELE_COUNT - 1].moveToPos(this._seleted_orbit);
                        GC.EL.ATOM[1].moveToPos(this._seleted_orbit);
                    }
                    else if (this._seleted_sector == GC.ELE_COUNT - 1) {
                        GC.EL.ATOM[this._seleted_sector].moveToPos(this._seleted_orbit);
                        GC.EL.ATOM[0].moveToPos(this._seleted_orbit);
                        GC.EL.ATOM[this._seleted_sector - 1].moveToPos(this._seleted_orbit);
                    }
                }
            }
            this.setScore();
        },
        /* 失能所有触摸监听事件*/
        disableAllLisener: function () {
            this._touch_enable = false;
        },
        /* 使能所有触摸监听事件*/
        enableAllLisener: function () {

            this._touch_enable = true;
        },
        /* 处理移动轨道事件*/
        touchOrbit: function (curPos) {
            var d1 = curPos.y - GC.H / 2;
            var d2 = curPos.x - GC.W / 2;
            var del = Math.sqrt(Math.pow(d1, 2) + Math.pow(d2, 2));
            var o_index = Math.floor((del - GC.ORBIT_DEF_R) / GC.ORBIT_R) + 1;
            if (o_index < 0) {
                o_index = 0;
            }
            if (o_index < GC.ORBIT_COUNT) {
                for (var i = 0; i < GC.ORBIT_COUNT; i++) {
                    if (this.getChildByTag(this._atom_tag + i).getSelSta()) {
                        this.getChildByTag(this._atom_tag + i).OrbitDisSeleted();
                    }
                }
                this._seleted_orbit = o_index;
                this.getChildByTag(this._atom_tag + o_index).OrbitSeleted();
            }
            //cc.log("o_index:" + o_index);
        },
        /* 将未选中的轨道低亮显示*/
        disSelOrbit: function () {
            for (var i = 0; i < GC.ORBIT_COUNT; i++) {
                if (this.getChildByTag(this._atom_tag + i).getSelSta()) {
                    this.getChildByTag(this._atom_tag + i).OrbitDisSeleted();
                }
            }
        },
        /* 触摸扇形界面处理*/
        touchSector: function (curPos) {
            //cc.log("x,y:"+curPos.x+" "+curPos.y);
            var d1 = curPos.y - GC.H / 2;
            var d2 = curPos.x - GC.W / 2;
            var angle = null;
            var index = null;
            if(GC.ELE_COUNT == 8){//特殊情况
                //分象限情况处理；
                //第一象限
                if (d1 > 0 && d2 > 0) {
                    angle = ((Math.atan(d2 / d1)) / Math.PI) * 180+(180 / GC.ELE_COUNT);
                    index = Math.floor((angle) / (360 / GC.ELE_COUNT));
                }
                //第二象限
                else if (d1 >= 0 && d2 <= 0) {
                    angle = ((Math.atan(d2 / d1)) / Math.PI) * 180+(180 / GC.ELE_COUNT);
                    index = Math.floor((angle) / (360 / GC.ELE_COUNT));
                }
                //第三象限
                else if (d1 < 0 && d2 < 0) {
                    angle = ((Math.atan(d2 / d1)) / Math.PI) * 180+(180 / GC.ELE_COUNT);
                    index = Math.floor((angle + 180) / (360 / GC.ELE_COUNT));
                }
                //第四象限
                else if (d1 <= 0 && d2 >= 0) {
                    angle = ((Math.atan(d2 / d1)) / Math.PI) * 180+(180 / GC.ELE_COUNT);
                    index = Math.floor((180 + angle) / (360 / GC.ELE_COUNT));
                }
            }else{
                //分象限情况处理；
                //第一象限
                if (d1 > 0 && d2 > 0) {
                    angle = ((Math.atan(d2 / d1)) / Math.PI) * 180;
                    index = Math.floor((angle) / (360 / GC.ELE_COUNT));
                }
                //第二象限
                else if (d1 >= 0 && d2 <= 0) {
                    angle = ((Math.atan(d2 / d1)) / Math.PI) * 180;
                    index = Math.floor((angle) / (360 / GC.ELE_COUNT));
                }
                //第三象限
                else if (d1 < 0 && d2 < 0) {
                    angle = ((Math.atan(d2 / d1)) / Math.PI) * 180;
                    index = Math.floor((angle + 180) / (360 / GC.ELE_COUNT));
                }
                //第四象限
                else if (d1 <= 0 && d2 >= 0) {
                    angle = ((Math.atan(d2 / d1)) / Math.PI) * 180;
                    index = Math.floor((180 + angle) / (360 / GC.ELE_COUNT));
                }
            }

            //cc.log("象限 位置：" + index);
            //调整偏移量；
            var offset = 0;
            if (GC.ELE_COUNT == 6) {
                offset = 2;
            } else if (GC.ELE_COUNT == 8) {
                offset = 2;
            } else if (GC.ELE_COUNT == 10) {
                offset = 3;
            } else if (GC.ELE_COUNT == 12) {
                offset = 3;
            } else if (GC.ELE_COUNT == 14) {
                offset = 4;
            }
            index = GC.ELE_COUNT - (index + GC.ELE_COUNT / 2) - offset;//调整位置；
            if (index < 0) {
                index = GC.ELE_COUNT + index;
            }

            this.clearSector();
            this.drawSectorSel(index);
            this._seleted_sector = index;
            this._touch_flag = true;

            // cc.log("angle:" + angle);
            //cc.log("index:" + index);
        },
        /* 触摸后电子运动处理*/
        touchAtom: function () {
            for (var i = 0; i < GC.ORBIT_COUNT; i++) {
                if (GC.EL.ATOM[i].getSelSta()) {
                    GC.EL.ATOM[i].atomDisSeleted();
                }
            }
            GC.EL.ATOM[this._seleted_sector].atomSeleted();

        },

        gameOver: function () {
            GamePanelLayer.addMainLayer();
            this.setToSmall();
        },
        /* 销毁此图层*/
        destroy: function () {
            this.unschedule(this.shoot);
            this._active = 0;
            this.visible = false;
            this.active = false;
            this.stopAllActions();
        }
    })
    ;