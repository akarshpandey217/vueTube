<template>
    <v-navigation-drawer
      fixed
      clipped
      v-model="drawer"
      app
    ><div></div>
    </v-navigation-drawer>
    
</template>

<script>
import all from '../scriptFiles/serviceLayer'
import PageHeader from './PageHeader'
import { EventBus } from '../scriptFiles/eventBus'
export default {
  name: 'PageBody',
  data: () => ({
        drawer: true,
        items: [
          { icon: 'trending_up', text: 'Most Popular' },
          { icon: 'subscriptions', text: 'Subscriptions' },
          { icon: 'history', text: 'History' },
          { icon: 'featured_play_list', text: 'Playlists' },
          { icon: 'watch_later', text: 'Watch Later' }
        ]})

}

// 1. Load the JavaScript client library.


</script>
