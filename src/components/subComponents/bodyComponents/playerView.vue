<template>
    <div>
        <v-card>
            <y-player v-bind:videoData="videoData"></y-player>
        </v-card>
        <transition name="fade" mode="out-in">
            <v-comments v-show="!videoStopped"></v-comments>
        </transition>
    </div>
</template>

<script>
import yPlayer from "./yPlayer";
import vComments from "./videoComments";
export default {
    props:['videoData','videoStopped'],
    components:{
        'y-player':yPlayer,
        'v-comments' : vComments
    }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
