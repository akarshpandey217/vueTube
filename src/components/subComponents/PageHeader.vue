<template>
    <v-toolbar
      color="red"
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <img src="../../assets/logo3.png" id="appLogo"/>
      <v-toolbar-title class="mr-5 align-center">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
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
import all from '../scriptFiles/serviceLayer'
export default {
  name: 'PageHeader',
  data(){
    return {
      searchText:''
    }
  },
  methods: {
    sendText() {
      // Send the event on a channel (i-got-clicked) with a payload (the click count.)
      all.search(this.searchText);
    }
  }
  }
  
</script>


<style scoped>
#appLogo{
height: 40px;
}
</style>