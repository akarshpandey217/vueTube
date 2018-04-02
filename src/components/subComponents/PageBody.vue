<template>
<v-container id="body" style="width:90%">
  <v-content>
    <v-layout wrap>
      <v-flex >
        <v-card class="primaryCard" > 
          <y-player width="100%" v-if="startPlay"></y-player>
          <v-layout  wrap row justify-center="true" >
            <v-flex class="videoFlex" justify-space-between="true" xs10 sm4 md3 lg2 xl2 v-for="result in items" :key="result.id.videoId">
              <v-card style="height:100%">
                <img v-on:click="playVid(result.id.videoId)" v-bind:src= "result.snippet.thumbnails.medium.url" style="width:100%;cursor:pointer"/>
                <v-card-text>
                  <div v-on:click="playVid(result.id.videoId)" class="videoDetails">
                  <h3>{{result.snippet.title}}</h3>
                  <div>{{result.snippet.channelTitle}} <br></div>
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
export default {
  name: "PageBody",
  components:{
    'y-player':yPlayer
  },

  data() {
    return {
      items: [],
      startPlay: false
    };
  },
  methods: {
    showThumbs(results) {
      this.items = results.items;
      console.log(this.items)
    },
    playVid : function(key) {
      EventBus.$emit('playVideo',key);
      this.startPlay = true;
    }
  },
  mounted() {
    all.search("").then(this.showThumbs);
    EventBus.$on("recieveSearchText", searchText => {
      all.search(searchText).then(this.showThumbs);
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
  padding: 5px;
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
</style>
