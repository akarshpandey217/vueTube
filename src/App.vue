<template>
  <v-app 
  v-bind:dark="darkTheme"
    id="inspire">
    <router-view/>
  </v-app>
</template>

<script>
import { EventBus } from "./components/scriptFiles/eventBus";
export default {
  name: 'App',
  data(){
    return {
      darkTheme:false
    }
  },
  mounted(){
    EventBus.$on("changeTheme" ,()=> {
      console.log('theme changed');
      this.darkTheme =!this.darkTheme;
    });
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  font-family: 'Nunito', sans-serif;
}
</style>
