<template>
 <v-layout row class="mt-3" >
              <v-flex xs12 sm12 md12 lg12 xl12>
                  <v-card v-for="item in comments" :key="item.id" class="comments mt-2" >
                    <img  style="padding:10px;float:left;border-radius:50%" class="avatar"  v-bind:src="item.snippet.topLevelComment.snippet.authorProfileImageUrl">
                    <div style="display:table-cell"  @click="toggleComment(item)">
                        <h3>{{item.snippet.topLevelComment.snippet.authorDisplayName}}</h3>
                        <p v-bind:class="{ cardComment:item.isActive }" 
                            v-html="item.snippet.topLevelComment.snippet.textDisplay"></p>
                    </div>
                    <div class="pb-2 ml-5 mt-0">
                        <v-icon class="like" color="red">thumb_up</v-icon>
                        &nbsp;{{item.snippet.topLevelComment.snippet.likeCount?item.snippet.topLevelComment.snippet.likeCount:0}} 
                        &nbsp;&nbsp;&nbsp;
                        <v-icon class="like" color="red">thumb_down</v-icon>
                        &nbsp;{{item.snippet.topLevelComment.snippet.dislikeCount?item.snippet.topLevelComment.snippet.dislikeCount:0}}
                    </div>
                    <div v-if="item.replies && item.showReply">
                        <div style="padding-left:50px" v-if="item.replies" v-for="reply in item.commentReplies" :key="reply.id">
                            <v-divider :key="reply.id"></v-divider>
                            <img style="padding:10px;float:left;border-radius:50%" v-bind:src="reply.snippet.authorProfileImageUrl"/>
                            <div style="display:table-cell">
                                <h3>{{reply.snippet.authorDisplayName}}</h3>
                                <p v-html="reply.snippet.textOriginal"></p>
                            </div>
                            <div class="ma-3">
                        <v-icon class="like" color="red">thumb_up</v-icon>
                        &nbsp;{{reply.snippet.likeCount?reply.snippet.likeCount:0}} 
                        &nbsp;&nbsp;&nbsp;
                        <v-icon class="like" color="red">thumb_down</v-icon>
                        &nbsp;{{reply.snippet.dislikeCount?reply.snippet.dislikeCount:0}}
                    </div>
                        </div>
                    </div>
                    <strong  @click="fetchReplies(item)" v-if="item.replies && item.snippet.totalReplyCount-item.commentReplies.length>0" class = "ml-5" style="color:red">{{`Show ${item.snippet.totalReplyCount-item.commentReplies.length} replies`}}</strong>
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
          repliesText:'Show replies',
          commentReplies:[]
      }
  },
  methods:{
      showComments(result){
          
          _.map(result.items,(value)=>{
                value.isActive = true;
              if(value.replies)
              {
                  value.commentReplies = [];
                  this.commentReplies = value.replies.comments;
                  value.containsReply = true;
              }
              value.showReply = false;
          });
          this.comments = result.items;
      },
      toggleComment(item){
          item.isActive = !item.isActive;
      },
      fetchReplies(item){
        gapi.fetchReplies(item.id,item.nextPageToken).then((result)=>{
            item.showReply = true;
            result.items.forEach(value=>{
                item.commentReplies.push(value);
            });
        item.nextPageToken = result.nextPageToken;
        });
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
.ma-3 > .like{
    font-size: 18px
}
.ma-3{
    font-weight: bold
}
</style>

