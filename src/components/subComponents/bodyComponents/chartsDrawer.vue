<template>
  <v-navigation-drawer
        v-model="drawerOpen"
        app
        clipped
        v-bind:permanent="drawer"
        width=250
      >
      <v-list dense>
        <v-list-tile v-for="item in chartList" v-bind:key="item.text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-on:click="searchCharts(item.text)">
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader class="mt-3 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
        <v-list>
          
        </v-list>
        <v-list-tile class="mt-3" >
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
        </v-list-tile>
        <v-list-tile >
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-navigation-drawer>
</template>
<script>
import { EventBus } from "../../scriptFiles/eventBus";
export default {
    name:'chartDrawer',
    data() {
        return {
        drawer:false,
        drawerOpen:false,
        chartList: [
            { icon: 'trending_up', text: 'Most Popular' },
            { icon: 'subscriptions', text: 'Music' },
            { icon: 'history', text: 'Sports' },
            { icon: 'featured_play_list', text: 'Technology' },
            { icon: 'watch_later', text: 'Movies' }
        ]
        };
    },
    methods: {
        searchCharts : function(key) {
            EventBus.$emit('searchCharts',key);
            console.log(key);
        }
    },
    mounted() {
        EventBus.$on("toggleDrawer", (value) => {
          if(value === 1){
            if(window.innerWidth>720)
            {
              this.drawer = !this.drawer;
              EventBus.$emit('resizeBody', drawer);
            }
            else{
              this.drawer = false;
            }
            this.drawerOpen = !this.drawerOpen;
          }    
        });
    }
}
</script>

