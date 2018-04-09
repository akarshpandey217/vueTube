<template>
<div v-show="showVid" class="videowrapper">
<div id="youPlayer"></div>
</div>
</template>

<script>
import { EventBus } from '../../scriptFiles/eventBus'
export default {
  name: 'yPlayer',
  data(){
    return{
      videoId:'',
      showVid:false
    }
  },
  methods:{
    playVideo(){
      return window.onYouTubeIframeAPIReady().then((resolve)=>{
          console.log(resolve);
            if(resolve){
              resolve.loadVideoById(this.videoId, 0, "large");
            return Promise.resolve(true);
            }
            else{
              return Promise.resolve(false);
            }
      
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
      this.playVideo().then((resolve)=>{this.showVid=true;console.log(resolve)});
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

