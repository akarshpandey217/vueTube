import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import BootstrapVue from 'bootstrap-vue'


Vue.use(Router);
Vue.use(BootstrapVue);

export default new Router({
  routes: [

    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    }
  ],
  mode:"history"
})
