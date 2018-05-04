<template>
<v-content>
  <chart-drawer></chart-drawer>
  <suggestion-darwer v-if="enableSuggestionsDrawer" v-bind:suggestionsData="suggestionsData"></suggestion-darwer>
    <v-layout row wrap justify-space-around style="padding-top:10px">
      <v-flex md11 lg11 xl11>
        <v-card>
        <y-player v-bind:videoData="videoData"></y-player>
        </v-card>
        <v-card v-show="videoStopped" >
          <v-layout  wrap row justify-center="true" >
            
          <transition-group name="fade" mode="out-in" class="cardContainer">
            <v-flex class="videoFlex" justify-space-between="true" xs12 sm4 md3 lg2 xl2 v-for="result in items" :key="result.id">
              
              <v-card style="height:100%">
                <img v-on:click="playVid(result)" v-bind:src= "result.snippet.thumbnails.medium.url" style="width:100%;cursor:pointer"/>
                <v-card-text>
                  <div v-on:click="playVid(result)" class="videoDetails">
                  <div style="overflow: hidden;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical">{{result.snippet.title}}</div>
                  <div id="text2">{{result.snippet.channelTitle}} <br></div>
                  <div id="text2">{{result.statistics.viewCount}} views <br></div>
                  </div>
                </v-card-text> 
              </v-card>
            </v-flex>
           
            </transition-group>
          </v-layout>
        </v-card>
        <transition name="fade" mode="out-in">
        <v-comments v-show="!videoStopped"></v-comments>
        </transition>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import all from "../scriptFiles/serviceLayer";
import PageHeader from "./PageHeader";
import { EventBus } from "../scriptFiles/eventBus";
import yPlayer from "./bodyComponents/yPlayer";
import chartDrawer from './bodyComponents/chartsDrawer';
import suggestionsDrawer from './bodyComponents/suggestionsDrawer';
import videoComments from './bodyComponents/videoComments';
import InfiniteLoading from 'vue-infinite-loading'; 
export default {
  name: "PageBody",
  components:{
    'y-player':yPlayer,
    'chart-drawer' : chartDrawer,
    'suggestion-darwer': suggestionsDrawer,
    'v-comments': videoComments
  },

  data() {
    return {
      items: [],
      videoStopped: true,
      videoData : {
        videoTitle:'',
        numberOfViews:'',
        numberOfLikes:'',
        numberOfDislikes:'',
        numberOfComments:'',
        channelUrl:'',
        channelTitle:'',
        videoDescription:''
      },
      suggestionsData:null,
      enableSuggestionsDrawer:false
    };
  },
  methods: {
    showThumbs(results) {
      results.items.forEach(element => {
      typeof(element.id) != "string"? element.id = element.id.videoId:element.id = element.id;
      });
      
      this.videoStopped = true;
      this.items = results.items;
      window.document.documentElement.scrollTop = 0;
      EventBus.$emit('pageLoaded');
    },
    playVid(key) {
      all.fetchChannelDetails(key.snippet.channelId).then((result)=>{
        this.videoData.channelTitle = key.snippet.channelTitle;
        this.videoData.channelUrl = result.items[0].snippet.thumbnails.default.url;
        this.videoData.videoTitle = key.snippet.title;
        this.videoData.numberOfViews = key.statistics.viewCount;
        this.videoData.numberOfLikes = key.statistics.likeCount;
        this.videoData.numberOfDislikes = key.statistics.dislikeCount;
        this.videoData.numberOfComments = key.statistics.commentCount;
        this.videoData.videoDescription = key.snippet.description;
        this.startPlay = true;
        EventBus.$emit('playVideo',key.id);
        EventBus.$emit('fetchComments',key.id);
        this.videoStopped = false;
        window.document.documentElement.scrollTop = 0;
        EventBus.$emit('fetchSuggestions',key.id);
      })
    },
    addToSuggestions : function(response){
      this.suggestionsData = response.items;
      this.enableSuggestionsDrawer = true;
    }
  },
  mounted() {
    all.search("").then(processStatsAndShowThumbs).then(this.showThumbs);
    EventBus.$on("recieveSearchText", searchText => {
      all.search(searchText).then(processStatsAndShowThumbs).then(this.showThumbs);
      EventBus.$emit('stopVideo');
      this.videoStopped = true;
    });
    EventBus.$on("searchCharts", key => {
      all.searchCharts(key).then(processStatsAndShowThumbs).then(this.showThumbs);
      EventBus.$emit('stopVideo');
    });
    EventBus.$on("playSuggestedVideo", key => {
      this.playVid(key);
    });
    EventBus.$on("fetchSuggestions", key => {
     all.search("",key,12).then(processStatsAndShowThumbs).then(this.addToSuggestions);
    });

    /*helper functions*/ 
    function processStatsAndShowThumbs(result){
      var videoIdList = '';
      _.each(result.items,(value)=>{ 
        value.id = !value.id.videoId?value.id:value.id.videoId;
        videoIdList += ','+value.id});
      return all.fetchStats(videoIdList).then((stats)=>{
        stats.items = _.map(stats.items,viewCountFormatter);
        return Promise.resolve(_.merge(result,stats))})
    }
    function viewCountFormatter(elem){
      elem.statistics.viewCount  = statsFormatter(elem.statistics.viewCount);
      elem.statistics.likeCount = statsFormatter(elem.statistics.likeCount);
      elem.statistics.dislikeCount = statsFormatter(elem.statistics.dislikeCount);
      elem.statistics.commentCount = statsFormatter(elem.statistics.commentCount);
      return elem;
    }
    function statsFormatter(numberToFormat){
      return numberToFormat > 999999?
      (numberToFormat/1000000).toFixed(1).toString() +'M': numberToFormat > 999? 
      (numberToFormat/1000).toFixed(1).toString() +'K':numberToFormat;
    }
  }
};
</script>
<style scoped>
#body {
  margin-top: 55px;
}
.container {
  max-width: inherit;
}
.thumbImg {
  margin-top: 8px;
  margin-left: 10px;
}
.textFlex {
  border-radius: 7px;
}
.videoFlex {
  padding: 7px;
}
.card {
  height: 100%;
}
.videoDetails {
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  cursor: pointer;
}
#text2 {
  font-weight: 200;
  font-stretch: narrower;
  font-size: smaller;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.cardContainer{
  display: flex;
  flex-wrap: wrap;
}
</style>
