<template>
  <v-container>
      <v-content>
          <v-layout v-for="item in comments" :key="item.id">
              <v-flex style="padding-top:7px">
                  <v-card >
                      <v-card-media v-bind:src="item.snippet.topLevelComment.snippet.authorProfileImageUrl"></v-card-media>
                      <v-card-title><h3>{{item.snippet.topLevelComment.snippet.authorDisplayName}}</h3></v-card-title>
                      <v-card-text>{{item.snippet.topLevelComment.snippet.textOriginal}}</v-card-text>
                  </v-card>
              </v-flex>
          </v-layout>
      </v-content>
  </v-container>
</template>
<script>
import { EventBus } from '../../scriptFiles/eventBus'
import gapi from './../../scriptFiles/serviceLayer'
export default {
  name:'comments',
  data(){
      return {
          comments:[]
      }
  },
  methods:{
      showComments(result){
          console.log(result.items)
          this.comments = result.items;
      }
  },
  mounted(){
      EventBus.$on("fetchComments", videoId => {
      gapi.fetchComments(videoId).then(this.showComments);
    });
  }

}
</script>
