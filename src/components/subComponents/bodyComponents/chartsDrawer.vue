<template>
  <v-navigation-drawer
        v-model="drawerOpen"
        app
        clipped
        width=250
        static  
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
      <br/>
      <br/>
      <div style="padding-left:20px;">
          <v-switch @click="changeTheme" v-bind:append-icon="darkIcon" ripple v-model="themeToggleSwitch" label="Toggle Theme"></v-switch>
      </div>
      </v-navigation-drawer>
</template>
<script>
import { EventBus } from "../../scriptFiles/eventBus";
export default {
    name:'chartDrawer',
    data() {
        return {
        drawerOpen:false,
        chartList: [
            { icon: 'trending_up', text: 'Most Popular' },
            { icon: 'library_music', text: 'Music' },
            { icon: 'fitness_center', text: 'Sports' },
            { icon: 'fas fa-flask', text: 'Technology' }
        ],
        themeToggleSwitch:false,
        icon:'far fa-moon',
        darkIcon:'fas fa-moon',
        lightIcon:'fas fa-sun'
        };
    },
    methods: {
        searchCharts : function(key) {
            EventBus.$emit('searchCharts',key);
        },
        changeTheme(){
          EventBus.$emit('changeTheme');
          this.icon = this.icon ==this.darkIcon?this.lightIcon:this.darkIcon;
        }
    },
    mounted() {
        EventBus.$on("toggleDrawer", (value) => {
          if(value === 1){
            this.drawerOpen = !this.drawerOpen;
          }    
        });
    }
}
</script>

