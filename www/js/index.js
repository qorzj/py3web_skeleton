function form_check(email) {
//判断邮箱格式是否正确
    var szReg= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    var szre=new RegExp(szReg);
    if(szre.test(email)) {
        return true;
    }else{
        return false;
    }

}


function checkMobile(s) { 
var regu = /^[1][0-9][0-9]{9}$/; 
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
} else { 
return false; 
} 
}
function eventWarp(e) {
    e = e.nativeEvent || e;
    let e_copy = {};
    for (var key in e) {
        e_copy[key] = e[key];
    }
    if (!e.clientX) {
        if (e.touches.length != 0) {
            e.clientX = e.touches[0].clientX;
            e.clientY = e.touches[0].clientY;
        } else {
            e.clientX = e.changedTouches[0].clientX;
            e.clientY = e.changedTouches[0].clientY;
        }
    }
    return e;
}
indexx=0;
swiperIndex=0;
var swiper = new Swiper('.swiper-container', {
    noSwiping : true,
    noSwipingClass : 'stop-swiping',
    allowSwipeToPrev : false,
    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素
        swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function(swiper){
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    },
    onSlideChangeStart: function(swiper){
        swiperIndex=swiper.activeIndex;

        if(swiperIndex==1){

            $('#array').hide();
        }

    },
    direction: 'vertical',
    speed:800,
});
//幻灯页
var swiper1 = new Swiper('.bannercontainer', {


    autoplay: 2500,
    autoplayDisableOnInteraction: false,
    loop : true,
});

var startPoint;
$("#movecloth").on("mousedown touchstart", function (e) {
    e = eventWarp(e);
    startPoint = e;
    $(document).on("mousemove touchmove", getcloth);
    $(document).one("mouseup touchend", function () {
        $("#page4 .top").hide();
        $("#movecloth img:eq(0)").addClass("send");
        setTimeout(function () {
           $(".clothbox").hide();
           $(".clothboxq").show();
        },200)
        setTimeout(function () {
          $("#movecloth .grkg").show();
        },1200)

        $(document).off("mousemove touchmove", getcloth);
    });
});
function getcloth(e) {
    e = eventWarp(e);
    var offset = e.clientY - startPoint.clientY;
    if (offset > 0) {
        return;
    }
    $("#movecloth img:eq(0)").css({
        transform: 'translateY(' + offset + 'px) scale('+(1+offset/500)+')',
        '-webkit-transform': 'translateY(' + offset + 'px) scale('+(1+offset/500)+')',
        '-moz-transform': 'translateY(' + offset + 'px) scale('+(1+offset/500)+')',
    });
}

$('.switch').on("click",function () {
    gopage("page2","page1",0,0);
});
$('.sucaibox').on("click",function () {
    $(".posbtn").hide();
    $('.sucaiinner').show();
    $(".page3bottom").show();
    setTimeout(function () {
        $("#page3 .grkg").show();
    },1700);

});
$("#page6 .btn1,#page6 .btn2,#page6 .btn3,#page6 .btn4").on("mousedown touchstart",function(){
    var _this=this;
    // $(this).addClass("btnon");
    $(this).on("mouseup touchend",function () {
        $("#frompage").show();
    })


});
$(".shareclose").on("click",function () {
    $("#sharepage").hide();
});
$(".sharebtn").on("click",function () {
    $("#sharemask").show();
});
$("#sharemask").on("click",function () {
    $(this).hide();
});
function gopage(page,currentpage,time,speed) {
    var delay=time||0;
    var $page=$("#"+page);
    var $currentpage=$("#"+currentpage);
    var speed=speed||1000;
    setTimeout(
        function () {
            $currentpage.fadeOut(speed);
            $page.fadeIn(speed);
        },delay
    )

}

//表单提交数据
$("#infoSubmit").click(function () {
    //本地验证表单有效性
    if($("#fromname").val().length==0){
        alert("请输入姓名");
        return;
    }
    if($("#fromphone").val().length==0){
        alert("请输入电话号码");
        return;
    }
    if(!checkMobile($("#fromphone").val())){
        alert("请输入正确格式的电话号码");
        return;
    }
    if(!form_check($("#email").val())){
        alert("请输入正确格式的电子邮箱");
        return;
    }
    var data = {};
    $('#infoForm').serializeArray().forEach(function (obj) {
        if (obj.value === "true") obj.value = true;
        if (obj.value === "false") obj.value = false;

        data[obj.name] = obj.value;
    });


    $(".loading").show();
    //todo:正式环境将地址切换
    var url = "https://tesla.parsec.com.cn/v1/api/messages/save"; //正式链接
    // var url = "https://tesla.parsec.com.cn/dev/api/messages/save"; //开发链接
    $.ajax(url, {
        data: JSON.stringify(data),
        type: "post",
        contentType: "application/json",
        success: function (res) {
            $(".loading").hide();
            if (res.code) return alert(res.message || "提交失败");
            $("#sharepage").show();
            $("#infoForm")[0].reset();
        }
    })
})
window.onload = function(){
    Event.sendEvent("tesla")   //事件id 你们自己协商
};
var animationarry=["webkitAnimationEnd", "mozAnimationEnd", "MSAnimationEnd", "oanimationend" ,"animationend"];
animationarry.forEach(function (item,index) {
    //gopage3
    $("#page2 .kg")[0].addEventListener(item, function(){ //动画重复运动时的事件
        gopage("page3","page2",1000);
    }, false);
    //gopage4
    $("#page3 .warp")[0].addEventListener(item, function(){ //动画重复运动时的事件
        gopage("page4","page3",1000);
    }, false);
    //gopage5
    $("#page4 .warp")[0].addEventListener(item, function(){ //动画重复运动时的事件
        gopage("page5","page4",1000);
        setTimeout(function () {
            $("#page5 .grkg").show()
        },4000)
    }, false);
    //gopage6
    $("#page5 #aniend")[0].addEventListener(item, function(){ //动画重复运动时的事件
        gopage("page6","pagelist",1000);
    }, false);
});




