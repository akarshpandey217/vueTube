<template>
<div>
<div v-show="showVid" class="videowrapper">
<div id="youPlayer"></div>
</div>
<h1 v-if="showVid">{{videoTitle}}</h1>
</div>
</template>

<script>
import { EventBus } from '../../scriptFiles/eventBus'
export default {
  name: 'yPlayer',
  props:['videoTitle'],
  data(){
    return{
      videoId:'',
      showVid:false
    }
  },
  methods:{
    playVideo(){
      return window.onYouTubeIframeAPIReady().then((resolve)=>{
                return Promise.resolve(resolve);
              })
  }
  },
  mounted() {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      var player;
      
      window.onYouTubeIframeAPIReady = function(){
        return new Promise((resolve,reject)=>{
          if(!player){
            player = new YT.Player('youPlayer',)
          }
           resolve(player);
        })
          
      }
    EventBus.$on("playVideo", videoId => {
      this.videoId = videoId;
      this.playVideo().then((resolve)=>{
        resolve.loadVideoById(this.videoId, 0, "large");
        this.showVid=true;});
    });
    EventBus.$on("stopVideo",() => {
      this.playVideo().then((resolve)=>{
          resolve.stopVideo();
        })
        this.showVid=false;;
    });
  }
  
}
</script>
<style>
.videowrapper {
  align-content: stretch;
    float: none;
    clear: both;
    width: 100%;
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 0px;
    height: 0;
}
.videowrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

