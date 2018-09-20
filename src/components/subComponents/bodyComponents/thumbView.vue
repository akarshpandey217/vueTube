<template>
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
</template>

<script>
import { EventBus } from '../../scriptFiles/eventBus';
export default {
    props:['items'],
    methods:{
      playVid(result){
        EventBus.$emit('videoPlayCall',result);
      }
    }
}
</script>
<style>
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


