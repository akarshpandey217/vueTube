import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import BootstrapVue from 'bootstrap-vue'
import PView from '../components/subComponents/bodyComponents/playerView'
import MView from '../components/subComponents/bodyComponents/thumbView'

Vue.use(Router);
Vue.use(BootstrapVue);

export default new Router({
  routes: [

    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      children:[{
        path:'defaultView',
        name:'defaultView',
        component:MView,
        props: true
      },{
        path:'playerView/:id',
        name:'playerView',
        component:PView,
        props: true
      }]
    }
  ],
  mode:"history"
})
