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
        <img style="width:80%" src="../../assets/logo3.png" id="appLogo" @click="goHome"/>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row style="max-width: 750px">
        
        <form @submit="sendText">
        <v-text-field
          placeholder="Search..."
          single-line
          append-icon="search"
          :append-icon-cb= "sendText"
          color="white"
          hide-details
          v-model="searchText"
        ></v-text-field></form>
      </v-layout>
      <v-toolbar-side-icon v-on:click="toggleDrawer(2)" ></v-toolbar-side-icon>
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
      drawer : false,
      drawer2: true,
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