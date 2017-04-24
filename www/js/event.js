
var analytics = AV.analytics({
		    appId: "GtTx7nqy1kSO4FbdlKcSVKV9-gzGzoHsz",
		    appKey: "UVw1nE6dOsfR8xTLNHwXGthK",
		    version: '1.8.6',
		    channel: 'app'
		});
var Event={
	sendEvent:function(analytics_event_id,duration){
		analytics.send({
		    // 事件名称
		    event: analytics_event_id,
		    // 事件属性，任意数据
		    attr: {
//		        testa: 123,
//		        testb: 'abc'
		    },
		    // 该事件持续时间（毫秒）
		    duration: duration||6000
		}, function(result) {
		    if (result) {
		        console.log('统计数据发送成功！');
		    }
		});
	}
}
