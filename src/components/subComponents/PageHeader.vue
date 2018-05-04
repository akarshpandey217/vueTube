<template>
<div>
    <v-toolbar
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon v-on:click="toggleDrawer(1)" ></v-toolbar-side-icon>
      <v-toolbar-title class="mr-5 align-center">
        <img style="width:80%" v-if="dark" src="../../assets/logo3.png" id="appLogo" @click="goHome"/>
        <img style="width:80%" v-else src="../../assets/logo4.png" id="appLogo" @click="goHome"/>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row style="max-width: 750px">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb= "sendText"
          color="white"
          hide-details
          @keyup.enter="sendText"
          v-model="searchText"
        ></v-text-field>
      </v-layout>
      <v-btn icon v-if="enableSuggestionsDrawer" @click="toggleDrawer(2)"><v-icon>fas fa-bullseye</v-icon></v-btn>
      
    </v-toolbar>
</div>
</template>

<script>
import { EventBus } from '../scriptFiles/eventBus'
export default {
  name: 'PageHeader',
  data(){
    return {
      searchText:'',
      enableSuggestionsDrawer:false,
      dark:false
    }
  },
  methods:{
    sendText(){
      EventBus.$emit('recieveSearchText',this.searchText);
    },
    goHome(){
      this.searchText = '';
      EventBus.$emit('recieveSearchText',this.searchText);
    },
    toggleDrawer(value){
      EventBus.$emit('toggleDrawer', value);
    }
  },
  mounted(){
    EventBus.$on("playVideo", key => {
      this.enableSuggestionsDrawer = true;
    });
    EventBus.$on("stopVideo", key => {
      this.enableSuggestionsDrawer = false;
    });
    EventBus.$on("changeTheme" ,()=> {
      this.dark =!this.dark;
    });
  }
 
  }
  
</script>


<style scoped>
#appLogo{
max-height: 40px;
display: block;
cursor: pointer;
}
.mx-3{
  flex: 0.5
}
</style>