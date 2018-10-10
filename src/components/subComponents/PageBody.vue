<template>
<v-content>
  <chart-drawer></chart-drawer>
  <suggestion-darwer v-if="enableSuggestionsDrawer" v-bind:suggestionsData="suggestionsData"></suggestion-darwer>
    <v-layout row wrap justify-space-around style="padding-top:10px">
      <v-flex md11 lg11 xl11>
        <!-- <player-View v-bind:videoData="videoData" v-bind:videoStopped="videoStopped"/>
        <thumb-View v-bind:items = "items" v-show="videoStopped"/> -->
        <router-view/>
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
import router from '../../router'
//import InfiniteLoading from 'vue-infinite-loading'; 
//import pView from "./bodyComponents/playerView";
//import mView from "./bodyComponents/thumbView";
export default {
  name: "PageBody",
  components:{
    //'y-player':yPlayer,
    'chart-drawer' : chartDrawer,
    'suggestion-darwer': suggestionsDrawer,
    //'v-comments': videoComments,
    // 'player-View' : pView,
    // 'thumb-View' : mView
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
      router.push({ name: 'defaultView', params: { items: this.items }});
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
        router.push({ name: 'playerView', params: { videoStopped: this.videoStopped, videoData: this.videoData }, query:{id:key.id}});
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
    EventBus.$on("videoPlayCall", key => {
      this.playVid(key);
    })

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
