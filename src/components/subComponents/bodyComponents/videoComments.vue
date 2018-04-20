<template>
 <v-layout row >
              <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-card v-for="item in comments" :key="item.id" class="comments" >
                    <img  style="padding:10px;float:left;border-radius:50%" class="avatar"  v-bind:src="item.snippet.topLevelComment.snippet.authorProfileImageUrl">
                    <div style="display:table-cell"  @click="toggleComment(item)">
                        <h3>{{item.snippet.topLevelComment.snippet.authorDisplayName}}</h3>
                        <p v-bind:class="{ cardComment:item.isActive }" 
                            v-html="item.snippet.topLevelComment.snippet.textDisplay"></p>
                    </div>
                    <div v-if="item.replies && item.showReply">
                        <div style="padding-left:50px" v-if="item.replies" v-for="reply in item.replies.comments" :key="reply.id">
                            <v-divider :key="reply.id"></v-divider>
                            <img style="padding:10px;float:left;border-radius:50%" v-bind:src="reply.snippet.authorProfileImageUrl"/>
                            <h3>{{reply.snippet.authorDisplayName}}</h3>
                            <p v-html="reply.snippet.textOriginal"></p>
                        </div>
                    </div>
                    <strong  @click="toggleReplies(item)" v-if="item.replies" style="color:FireBrick;padding-left:30px">{{item.showReply?"Hide replies":"Show replies"}}</strong>
                    <v-divider :key="item.id"></v-divider>
                  </v-card>
              </v-flex>
          </v-layout>
</template>
<script>
import { EventBus } from '../../scriptFiles/eventBus'
import gapi from './../../scriptFiles/serviceLayer'
export default {
  name:'comments',
  data(){
      return {
          comments:[],
          repliesText:'Show replies'
      }
  },
  methods:{
      showComments(result){
          
          _.map(result.items,(value)=>{
                value.isActive = true;
              if(value.replies)
              {
                  value.containsReply = true;
              }
              value.showReply = false;
          });
          this.comments = result.items;
          console.log(result.items);
          
      },
      toggleComment(item){
          item.isActive = !item.isActive;
      },
      toggleReplies(item){
          item.showReply = !item.showReply;
          this.repliesText = this.repliesText=="Show replies"?"Hide replies":"Show replies";
      }
  },
  mounted(){
      EventBus.$on("fetchComments", (videoId,channelId) => {
          this.comments = [];
      gapi.fetchComments(videoId,channelId).then(this.showComments);
    });
  }

}
</script>
<style scoped>
.cardComment{
    overflow:hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow:ellipsis;
}
.avatar{
    border-radius:50%;
}
.comments{
    font-family: 'Nunito', sans-serif;
}
</style>

