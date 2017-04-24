module.exports = {
	vendorJS:[
		'vendor/lib-flexible/build/flexible.js',
		'vendor/swiper/dist/js/swiper.min.js',
		'vendor/zepto/zepto.min.js'
	],
	vendorCSS:[
		'vendor/swiper/dist/css/swiper.min.css'
	],
	serverConfig:{
        dev:{//测试地址
            host: '115.29.239.213', //服务器IP
            user: 'root',   //服务器名称
            pass: 'pArSeC@0326', //服务密码
            // port:22,  //服务器端口默认为:22
            remotePath: '/mnt/www/uber_suzhou/'    //上传文件的路径
		},
        dist: { //正式地址
            host: '139.129.224.119', //服务器IP
            user: 'root',   //服务器名称
            pass: 'ydsw@2017', //服务密码
            // port:22,  //服务器端口默认为:22
            remotePath: '/root/apache-tomcat-8.0.41/webapps/ROOT/mobile/'    //上传文件的路径 mobile 文件夹需要自己在服务器上创建
        }
    }
}