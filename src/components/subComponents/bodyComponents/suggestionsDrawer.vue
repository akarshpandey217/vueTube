<template>
  <v-navigation-drawer
        v-model="drawer2"
        app
        clipped
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

