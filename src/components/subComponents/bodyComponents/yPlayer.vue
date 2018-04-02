<template>
<div class="youPlayer" >
<iframe id="ytplayer" type="text/html" width="100%" height="580px" v-bind:src='url'
  frameborder="0"></iframe>
</div>
</template>

<script>
import { EventBus } from '../../scriptFiles/eventBus'
export default {
  name: 'yPlayer',
  data(){
    return{
      url:''
    }
  },
  mounted() {
    EventBus.$on("playVideo", videoId => {
      this.url = `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com`;
      console.log(this.url);
    });
  }
  
}
</script>
