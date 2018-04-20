// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import _ from 'lodash'
import array from 'lodash/array'
import object from 'lodash/fp/object'
import Vuebar from 'vuebar'



Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(_);
Vue.use(array);
Vue.use(object);
Vue.use(Vuebar);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// var tag = document.createElement('script');

//       tag.src = "https://www.youtube.com/iframe_api";
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// window.onYouTubeIframeAPIReady = function(){
//   console.log('play ready');
  
//   window.player = new YT.Player('sexyplayer', {
//     height: '390',
//     width: '640',
//     videoId: 'M7lc1UVf-VE',
//     events: {
//       'onReady': function onPlayerReady(event) {
//         event.target.playVideo();
//       }
//     }
//   });
// }
