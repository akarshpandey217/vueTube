<template>
<v-container id="app" stretch style="width:95%">
  <chart-drawer></chart-drawer>
  <suggestion-darwer></suggestion-darwer>
  <v-content>
    <v-layout wrap>
      <v-flex >
        <v-card color="grey darken-4">
        <y-player v-bind:videoTitle="videoTitle"></y-player>
        </v-card>
        <v-card v-if="videoStopped" color="grey darken-4">
          <v-layout  wrap row justify-center="true" >
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
          </v-layout>
        </v-card>
        <v-comments v-show="!videoStopped"></v-comments>
      </v-flex>
    </v-layout>
  </v-content>
</v-container>
</template>

<script>
import all from "../scriptFiles/serviceLayer";
import PageHeader from "./PageHeader";
import { EventBus } from "../scriptFiles/eventBus";
import yPlayer from "./bodyComponents/yPlayer";
import chartDrawer from './bodyComponents/chartsDrawer';
import suggestionsDrawer from './bodyComponents/suggestionsDrawer';
import videoComments from './bodyComponents/videoComments';
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
      videoTitle : ''
    };
  },
  methods: {
    showThumbs(results) {
      
      results.items.forEach(element => {
        typeof(element.id) != "string"? element.id = element.id.videoId:element.id = element.id;
      });
      this.items = results.items;
    },
    playVid : function(key) {
      this.videoTitle = key.snippet.title;
      this.startPlay = true;
      EventBus.$emit('playVideo',key.id);
      EventBus.$emit('fetchComments',key.id);
      this.videoStopped = false;
      
    }
  },
  mounted() {
    function viewCountFormatter(elem){
      var viewCount = parseInt(elem.statistics.viewCount);
      console.log(viewCount);
      elem.statistics.viewCount  = viewCount > 999999?
      (viewCount/1000000).toFixed(1).toString() +'M': viewCount > 999? 
      (viewCount/1000).toFixed(1).toString() +'K':viewCount;
      return elem;
    }
    all.search("").then((result)=>{
      var videoIdList = '';
      _.each(result.items,(value)=>{ videoIdList += ','+value.id.videoId});
      all.fetchStats(videoIdList)
      .then((stats)=>{
        stats.items = _.map(stats.items,viewCountFormatter);
        console.log(stats.items);
        return Promise.resolve(_.merge(result,stats))})
      .then(this.showThumbs)
    });
    EventBus.$on("recieveSearchText", searchText => {
      all.search(searchText).then((result)=>{
      var videoIdList = '';
      _.each(result.items,(value)=>{ videoIdList += ','+value.id.videoId});
      all.fetchStats(videoIdList).then((stats)=>{
        stats.items = _.map(stats.items,viewCountFormatter);
        console.log(stats.items);
        return Promise.resolve(_.merge(result,stats))})
      .then(this.showThumbs)
    });
      EventBus.$emit('stopVideo');
      this.videoStopped = true;
    });
    EventBus.$on("searchCharts", key => {
      all.searchCharts(key).then((result)=>{
      var videoIdList = '';
      _.each(result.items,(value)=>{ videoIdList += ','+value.id});
      return all.fetchStats(videoIdList).then((stats)=>{
        stats.items = _.map(stats.items,viewCountFormatter);
        console.log(stats.items);
        return Promise.resolve(_.merge(result,stats))})
      .then(this.showThumbs)
    });
      EventBus.$emit('stopVideo');
      this.videoStopped = true;
    });
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
.textFlex{
  border-radius: 7px;
}
.videoFlex{
  padding: 7px;
}
.card{
  height: 100%
}
.videoDetails{
  overflow: hidden;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  cursor: pointer;
}
#text2{
  font-weight:200;
  font-stretch:narrower;
  font-size: smaller;
  font-family: Arial, Helvetica, sans-serif
}

</style>
