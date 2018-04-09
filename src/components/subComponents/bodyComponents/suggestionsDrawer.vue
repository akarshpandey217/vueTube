<template>
  <v-navigation-drawer
        v-model="drawer2"
        app
        clipped
        hide-overlay
        v-bind:permanent="drawer2"
        right
      >
      </v-navigation-drawer>
</template>

<script>
import { EventBus } from "../../scriptFiles/eventBus";
export default {
  name:'suggestionsDrawer',
    data() {
        return {
        drawer2:false
        }
    },
    mounted() {
        EventBus.$on("toggleDrawer", (value) => {
            if(value === 2) {
                this.drawer2 = !this.drawer2;
            }  
        });
    }
}
</script>

