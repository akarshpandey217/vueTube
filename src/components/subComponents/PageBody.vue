<template>
<v-container fluid id="body">
  <v-layout row nowrap class="layOut" align-content-start="true" v-for="result in items" :key="result.id.videoId">
    <v-flex fluid>
      <v-card class="textFlex" md3>
        <img fluid class="thumbImg" v-bind:src= "result.snippet.thumbnails.medium.url" v-bind:id="result.id.videoId" @click="playVid"/>
      </v-card>
      </v-flex>
    <v-flex>
      <v-card>
       <v-card-text>{{result.snippet.title}}</v-card-text><br/>
       <v-card-text >{{result.snippet.channelTitle}}</v-card-text><br/>
       <v-card-text >{{result.snippet.description}}</v-card-text>
       </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import all from "../scriptFiles/serviceLayer";
import PageHeader from "./PageHeader";
import { EventBus } from "../scriptFiles/eventBus";
import yPlayer from "./bodyComponents/yPlayer";
export default {
  name: "PageBody",

  data() {
    return {
      items: []
    };
  },
  methods: {
    showThumbs(results) {
      this.items = results.items;
      console.log(this.items)
    },
    playVid(videoId) {
      EventBus.$emit("playVideo", this.videoId);
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
  height: 50%;
  border-radius: 2px!important;
}
.textFlex{
  border-radius: 7px;
}
.layOut{
  padding-bottom: 10px;
}
</style>
