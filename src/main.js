// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
require("wangeditor/dist/css/wangEditor.less");
Vue.use(ElementUI);
//引入视频
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import VueVideoPlayer from 'vue-video-player'
Vue.use(VueVideoPlayer)
window.eventBus=new Vue();
//引入拖拽
import vueDrag from 'vue-dragging'
Vue.use(vueDrag)
Vue.config.productionTip = false

//跨域
// Vue.http.headers.common['Access-Control-Allow-Origin'] = 'http://www.kaizao.dev.sudaotech.com/api'
// Vue.http.headers.common['Access-Control-Request-Method'] = '*'
/* eslint-disable no-new */


//初始化化Vue实例
var global = typeof window === 'object' ? window : this
global.$moduleMain = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
