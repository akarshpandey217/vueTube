<template>
  <v-navigation-drawer
        v-model="drawer2"
        app
        clipped
        right
        temporary
        width = 350 
        floating
      >
      
          <v-layout  wrap row justify-center="true" >
              <transition-group name="fade" class="container">
            <v-flex md6 lg6 xl6 style="padding:3px" justify-space-between="true" v-for="result in suggestionsData" :key="result.id">
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
      </v-navigation-drawer>
</template>

<script>
import { EventBus } from "../../scriptFiles/eventBus";
export default {
  name:'suggestionsDrawer',
  props:['suggestionsData'],
    data() {
        return {
        drawer2:false
        }
    },
    methods:{
        playVid: function(key){
            EventBus.$emit('playSuggestedVideo',key);
        }
    },
    mounted() {
        EventBus.$on("toggleDrawer", (value) => {
            if(value === 2) {
                this.drawer2 = !this.drawer2;
            }  
        });
        EventBus.$on("fetchSuggestions", (value) => {
        });
    }
}
</script>
<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

