<template>
<v-container id="app" stretch style="width:85%">
  <chart-drawer></chart-drawer>
  <suggestion-darwer></suggestion-darwer>
  <v-content>
    <v-layout wrap>
      <v-flex >
        <v-card color="grey darken-4">
        <y-player></y-player>  
        </v-card>
        <v-card color="grey darken-4">
          <v-layout  wrap row justify-center="true" >
            <v-flex class="videoFlex" justify-space-between="true" xs12 sm4 md3 lg3 xl2 v-for="result in items" :key="result.id">
              <v-card style="height:100%">
                <img v-on:click="playVid(result.id)" v-bind:src= "result.snippet.thumbnails.medium.url" style="width:100%;cursor:pointer"/>
                <v-card-text>
                  <div v-on:click="playVid(result.id)" class="videoDetails">
                  <div style="overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical">{{result.snippet.title}}</div>
                  <div id="text2">{{result.snippet.channelTitle}} <br></div>
                  </div>
                </v-card-text> 
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
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
export default {
  name: "PageBody",
  components:{
    'y-player':yPlayer,
    'chart-drawer' : chartDrawer,
    'suggestion-darwer': suggestionsDrawer
  },

  data() {
    return {
      items: [],
      startPlay: false,
    };
  },
  methods: {
    showThumbs(results) {
      
      results.items.forEach(element => {
        typeof(element.id) != "string"? element.id = element.id.videoId:element.id = element.id;
      });
      this.items = results.items;
      console.log(this.items)
    },
    playVid : function(key) {
      EventBus.$emit('playVideo',key);
    }
  },
  mounted() {
    all.search("").then(this.showThumbs);
    EventBus.$on("recieveSearchText", searchText => {
      all.search(searchText).then(this.showThumbs);
    });
    EventBus.$on("searchCharts", key => {
      all.searchCharts(key).then(this.showThumbs); 
      this.startPlay = true;
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
