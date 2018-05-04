<template>
<div>
  <transition name="fade">
  <div v-show="showVid" class="videowrapper">
    <div id="youPlayer"></div>
  </div>
  </transition>
  <transition name="fade">
  <div v-show="showVid" class="card vidDetails pb-3">
    <v-layout row wrap>
      <v-flex>
          <div class="videoTitle ml-3 row">
            <h1 >{{videoData.videoTitle}}</h1>
            <v-layout row wrap xs12 lg12 md12 sm12>
              <v-flex><h3 style="max-block-size:0px">{{videoData.numberOfViews}} views</h3>
              <div class="pr-3" style="text-align:right;font-family: 'Nunito', sans-serif;">
                <v-icon>thumb_up</v-icon>
                  &nbsp;{{videoData.numberOfLikes}} 
                  &nbsp;&nbsp;&nbsp;
                  <v-icon >thumb_down</v-icon>
                  &nbsp;{{videoData.numberOfDislikes}}
              </div>
              </v-flex>
            </v-layout>
              <div class="card mt-2" style="display:inline-block;border-radius:25px">
              <v-avatar size="40" class="pb-2" style="padding-top:10px">
                <img v-bind:src="videoData.channelUrl"/>
              </v-avatar>
              <h3 style="display:inline-block;vertical-align:middle;padding-right:10px">{{videoData.channelTitle}}</h3>
          </div>
            </div>
            <v-expansion-panel popout expand-icon="none" class="" v-if="showVid">
      <v-expansion-panel-content style="font-family: 'Nunito', sans-serif;">
        <div slot="header" @click=" descriptionText = (descriptionText=='Show Description')?'Hide Description':'Show Description'" style="text-align:center">{{descriptionText}}</div>
        <v-card>
          <v-card-text style="white-space: pre-line" v-html="convertLinks(videoData.videoDescription)"></v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
      </v-flex>
    </v-layout>
    
  </div>
  </transition>
</div>
</template>

<script>
import { EventBus } from '../../scriptFiles/eventBus'
import linkMaker from 'anchorme'
export default {
  name: 'yPlayer',
  props:['videoData'],
  data(){
    return{
      videoId:'',
      showVid:false,
      descriptionText:null
    }
  },
  methods:{
    playVideo(){
      return window.onYouTubeIframeAPIReady().then((resolve)=>{
                return Promise.resolve(resolve);
              })
    },
    convertLinks(desciptionText){
      return linkMaker(desciptionText);
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
        this.descriptionText = "Show Description";
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
.icon{
  vertical-align:middle;
}
.videoTitle{
  font-family: 'Nunito', sans-serif;
}
.header__icon{
  display: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

