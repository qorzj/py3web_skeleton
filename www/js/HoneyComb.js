var initData = {
    'code': 0,
    'token': 'token',
    'isExpired': false,
    'lead_nickName': '李四',
    'lead_headImg': ''
};
var acceptData = {
    'code': 0,
    'status': '2110',
    'phone': '185xxxxxxxx',
    'isNew': true,
    'coupons': [
        {
            couponType:100,
            discount:75,
            couponTypeName:"测试券",
            expriedDate:'2017-12-12'
        }
    ],
};
var recommendData = {
    'code': 0,
    'recommend_count': 0,
    'rebate_coupon_amount': 10,
    'rebate_cash_amount': 20,
};
var HoneyComb = {
    //初始化
    init: function(data, func) {
        if (!data) {
            console.log('参数不能为空');
        } else {
            if (data.isNeedLogin) {
                console.log('显示登录页');
                func(initData);
            } else {
                func(initData);
            }
        }
    },
    //主要判断是否是新老用户
    acceptShare: function(data, func) {
        return func(acceptData);
    },
    //得到推荐信息
    getRecommendData: function(data, func) {
        return func(recommendData);
    },
    //点击分享
    clickShare:function(data,isChange){

    },
    //设置分享
    setShare:function(data,isChange){

    },
    getSourceFromUA:function () {
        return {
            source:'alipays'
        };
    }
};
