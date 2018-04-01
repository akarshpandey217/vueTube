<template>
    <v-toolbar
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon ></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <img fluid src="../../assets/logo3.png" id="appLogo" @click="goHome"/>
      </v-toolbar-title>
      <v-layout row align-center style="max-width: 650px">
        <v-spacer></v-spacer>
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
    </v-toolbar>
</template>

<script>
import { EventBus } from '../scriptFiles/eventBus'
export default {
  name: 'PageHeader',
  data(){
    return {
      searchText:''
    }
  },
  methods:{
    sendText(){
      EventBus.$emit('recieveSearchText',this.searchText);
    },
    goHome(){
      this.searchText = '';
      EventBus.$emit('recieveSearchText',this.searchText);
    }
  }
 
  }
  
</script>


<style scoped>
#appLogo{
height: 40px;
cursor: pointer;
}
.mx-3{
  flex: 0.5
}
</style>