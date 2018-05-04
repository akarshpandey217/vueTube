<template>
<div >
  
    <v-flex xs7 sm7 md7 lg7  class="myDiv" v-show="!pageLoaded">
    <img src="./assets/logo4.png" style="padding-bottom:50px">
  <v-progress-linear color="black" :buffer-value="100" :active="true" :indeterminate="true">
  </v-progress-linear>
  </v-flex>
  
<transition name="fade">
  <v-app v-show="pageLoaded"
    v-bind:dark="darkTheme"
      id="inspire">
      <router-view/>
  </v-app>
  </transition>
</div>
  
</template>

<script>
import { EventBus } from "./components/scriptFiles/eventBus";
export default {
  name: 'App',
  data(){
    return {
      darkTheme:false,
      pageLoaded:false
    }
  },
  mounted(){
    EventBus.$on("changeTheme" ,()=> {
      console.log('theme changed');
      this.darkTheme =!this.darkTheme;
    });
    EventBus.$on("pageLoaded" ,()=> {
      this.pageLoaded = true;
    });
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  font-family: 'Nunito', sans-serif;
}
.myDiv{
  text-align: center;
  margin: auto;
    position:fixed;
    top: 40%;
    left:22%;
    width:100%;
    height:50%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
