var HEIGHT = 500, WIDTH = 500;

(function () {
    // var iniangle=90.1;
    // var anglecount=0;
    loadImg([
        {key: 'meat', src: 'images/meat.png'},
        {key: 'vegetables', src: 'images/vegetables.png'}
    ], function (imgs) {
        var elem_canvas = document.getElementById("tray");
        var ctx = elem_canvas.getContext("2d");
        // draw(90);

        //求画板的中心坐标
        function getCenter() {
            var offset = $(elem_canvas).offset();
            return {
                clientX: offset.left + $(elem_canvas).width() / 2,
                clientY: offset.top + $(elem_canvas).height() / 2
            };
        }

        var Cneter = getCenter();

        $(".movebox").on("mousedown touchstart", function (e) {
            e = eventWarp(e);
            e.stopPropagation();
            e.preventDefault();
            Cneter = getCenter();
            var angle = getAngle(e);

            console.log("start>>>","breforAngle", breforAngle, "angle", angle);
            // if(angle<breforAngle-3 || angle>breforAngle+3) return;

            // $(elem_canvas).on("mousedown touchstart", function (e) {
            $(".movebox").on("mousemove touchmove", handleMove);
            $(".movebox").one("mouseup touchend", function () {
                $(".movebox").off("mousemove touchmove", handleMove);
               if(breforAngle>270) draw(359.9)
            });
        });

        //角度时针
        function getAngle(e) {
            var offsetX = (e.clientX - Cneter.clientX)
            var offsetY = (e.clientY - Cneter.clientY);
            //斜率
            var k = offsetY / offsetX;
            //角度
            var angle = Math.atan(Math.abs(k)) * 180 / Math.PI;
            //修正象限
            (offsetX >= 0 && offsetY >= 0) && (angle = angle); //0-90°
            (offsetX < 0 && offsetY >= 0) && (angle = 180 - angle); //90-180°
            (offsetX < 0 && offsetY < 0) && (angle = 180 + angle); //180-270°
            (offsetX >= 0 && offsetY < 0) && (angle = 360 - angle); //270-0°

            //x轴的正方向由水平向右 改为 垂直向下
            angle = (angle + 270) % 360;

            return angle;
        }

        function handleMove(e) {
            e = eventWarp(e);
            draw(getAngle(e));
            $(".movebox .slider").fadeOut(200);
        }

        function onDrawComplete(){
            $("#page3 .p3").show();
          $("#page3").removeClass("stop-swiping");
        }

        //重绘
        var breforAngle = 0;

        function draw(angle) {
            console.log("draw>>>","breforAngle", breforAngle, "angle", angle);
            if (breforAngle >= angle) return;

            breforAngle = angle;

            angle = (angle + 90) % 360; //x轴的正方向由垂直向下 改为  水平向右
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            //蔬菜背景
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(imgs.vegetables, 0, 0, imgs.vegetables.width, imgs.vegetables.height, 0, 0, WIDTH, HEIGHT);

            //扇形遮罩
            ctx.globalCompositeOperation = "destination-out";
            ctx.sector(WIDTH / 2, HEIGHT / 2, WIDTH / 2, angle * Math.PI / 180, 90 * Math.PI / 180);
            ctx.fill();

            //扇形轴
            ctx.sector(WIDTH / 2, HEIGHT / 2, WIDTH / 2, (angle - 0) * Math.PI / 180, angle * Math.PI / 180);
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "#FFF"
            ctx.fill();

            //最外层圆
            // ctx.lineWidth=WIDTH/100;
            // ctx.strokeStyle="#FFF";
            // ctx.arc(WIDTH / 2, HEIGHT / 2, 50, 0, 360 * Math.PI / 180);
            // ctx.stroke();

            // //中间透明圆
            // ctx.globalCompositeOperation = "destination-out";
            // ctx.arc(WIDTH / 2, HEIGHT / 2, 30, 0, 360 * Math.PI / 180);
            // ctx.fill();

            // //最历层圆
            // ctx.globalCompositeOperation = "source-over";
            // ctx.arc(WIDTH / 2, HEIGHT / 2, 20, 0, 360 * Math.PI / 180);
            // ctx.fill();

            if(breforAngle>359) onDrawComplete();
        }
    })
})()

function loadImg(imgs, callback) {
    console.log(imgs);
    var count = 0;
    var result = {};
    imgs.map(function (img) {
        var image = new Image();
        image.onload = function () {
            count++;
            result[img.key] = this;
            if (count === imgs.length) {
                callback && callback(result);
            }
        }
        image.src = img.src;
    });
}


//扇形
CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sDeg, eDeg) {
    // 初始保存
    this.save();
    // 位移到目标点
    this.translate(x, y);
    this.beginPath();
    // 画出圆弧
    this.arc(0, 0, radius, sDeg, eDeg);
    // 再次保存以备旋转
    this.save();
    // 旋转至起始角度
    this.rotate(eDeg);
    // 移动到终点，准备连接终点与圆心
    this.moveTo(radius, 0);
    // 连接到圆心
    this.lineTo(0, 0);
    // 还原
    this.restore();
    // 旋转至起点角度
    this.rotate(sDeg);
    // 从圆心连接到起点
    this.lineTo(radius, 0);
    this.closePath();
    // 还原到最初保存的状态
    this.restore();
    return this;
}